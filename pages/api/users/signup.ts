import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';

import User from 'database/models/user';

import { confirmEmailAddress } from 'email-templates/account-confirmation';
import { Auth } from 'aws-amplify';

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      await userSignup(req, res);
      break;
    default:
      res.status(405).json({
        message: `Method ${req.method} not allowed`
      });
  }
}

const userSignup = async (req, res) => {
  const confirmToken = uuidv4();
  let { first_name, last_name, email, password } = req.body;

  try {
    if (!isLength(first_name, { min: 3 })) {
      return res.status(422).json({
        message: 'The first name should be a minimum of three characters long'
      });
    } else if (!isLength(last_name, { min: 3 })) {
      return res.status(422).json({
        message: 'The last name should be a minimum of three characters long'
      });
    } else if (!isEmail(email)) {
      return res.status(422).json({ message: 'Email should be a valid email address' });
    } else if (!isLength(password, { min: 6 })) {
      return res.status(422).json({
        message: 'Password should be minimum of six characters long'
      });
    }

    // Check if user with that email if already exists
    const user = await User.findOne({
      where: { email: email }
    });

    if (user) {
      return res.status(422).json({ message: `User already exist with email ${email}` });
    }

    try {
      const { user: cognitoUser } = await Auth.signUp({
        username: email,
        password: password,
        attributes: {
          email: email,
          name: first_name,
          family_name: last_name
        }
      });
    } catch (e) {
      res.status(400).json({
        error_code: 'cognito_create_user',
        message: e.message
      });
    }

    // Encrypt password with bcrypt
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      first_name,
      last_name,
      email,
      password: passwordHash,
      reset_password_token: confirmToken,
      reset_password_send_at: Date.now()
    });

    confirmEmailAddress(newUser);

    const lms_react_users_token = jwt.sign(
      {
        //@ts-ignore
        userId: newUser.id,
        //@ts-ignore
        first_name: newUser.first_name,
        //@ts-ignore
        last_name: newUser.last_name,
        //@ts-ignore
        email: newUser.email,
        //@ts-ignore
        role: newUser.role,
        //@ts-ignore
        profile_photo: newUser.profile_photo
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d'
      }
    );

    res.status(200).json({
      message: 'Registration Successful!',
      lms_react_users_token
    });
  } catch (e) {
    res.status(400).json({
      error_code: 'create_user',
      message: e.message
    });
  }
};
