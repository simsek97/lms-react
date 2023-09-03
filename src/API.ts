/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateSubscriptionTierInput = {
  id?: string | null,
  tier: string,
  title: string,
  price: number,
  description?: Array< string | null > | null,
  montlyPriceId?: string | null,
  yearlyPriceId?: string | null,
};

export type ModelSubscriptionTierConditionInput = {
  tier?: ModelStringInput | null,
  title?: ModelStringInput | null,
  price?: ModelIntInput | null,
  description?: ModelStringInput | null,
  montlyPriceId?: ModelStringInput | null,
  yearlyPriceId?: ModelStringInput | null,
  and?: Array< ModelSubscriptionTierConditionInput | null > | null,
  or?: Array< ModelSubscriptionTierConditionInput | null > | null,
  not?: ModelSubscriptionTierConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type SubscriptionTier = {
  __typename: "SubscriptionTier",
  id: string,
  tier: string,
  title: string,
  price: number,
  description?: Array< string | null > | null,
  montlyPriceId?: string | null,
  yearlyPriceId?: string | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateSubscriptionTierInput = {
  id: string,
  tier?: string | null,
  title?: string | null,
  price?: number | null,
  description?: Array< string | null > | null,
  montlyPriceId?: string | null,
  yearlyPriceId?: string | null,
};

export type DeleteSubscriptionTierInput = {
  id: string,
};

export type CreateUserInput = {
  id?: string | null,
  sub?: string | null,
  firstname: string,
  lastname: string,
  email: string,
  role?: string | null,
  owner: string,
  avatarUrl?: string | null,
  avatarKey?: string | null,
  address?: string | null,
  city?: string | null,
  state?: string | null,
  zipCode?: string | null,
  country?: string | null,
  occupation?: string | null,
  institution?: string | null,
  stripeCustomerId?: string | null,
  subscription?: UserSubscriptionInput | null,
};

export type UserSubscriptionInput = {
  tier: string,
  title: string,
  price: number,
  canceled?: string | null,
  subscribedAt?: string | null,
  expiresAt?: string | null,
  montlyPriceId?: string | null,
  yearlyPriceId?: string | null,
};

export type ModelUserConditionInput = {
  sub?: ModelStringInput | null,
  firstname?: ModelStringInput | null,
  lastname?: ModelStringInput | null,
  email?: ModelStringInput | null,
  role?: ModelStringInput | null,
  owner?: ModelStringInput | null,
  avatarUrl?: ModelStringInput | null,
  avatarKey?: ModelStringInput | null,
  address?: ModelStringInput | null,
  city?: ModelStringInput | null,
  state?: ModelStringInput | null,
  zipCode?: ModelStringInput | null,
  country?: ModelStringInput | null,
  occupation?: ModelStringInput | null,
  institution?: ModelStringInput | null,
  stripeCustomerId?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type User = {
  __typename: "User",
  id: string,
  sub?: string | null,
  firstname: string,
  lastname: string,
  email: string,
  role?: string | null,
  owner: string,
  avatarUrl?: string | null,
  avatarKey?: string | null,
  address?: string | null,
  city?: string | null,
  state?: string | null,
  zipCode?: string | null,
  country?: string | null,
  occupation?: string | null,
  institution?: string | null,
  stripeCustomerId?: string | null,
  subscription?: UserSubscription | null,
  createdAt: string,
  updatedAt: string,
};

export type UserSubscription = {
  __typename: "UserSubscription",
  tier: string,
  title: string,
  price: number,
  canceled?: string | null,
  subscribedAt?: string | null,
  expiresAt?: string | null,
  montlyPriceId?: string | null,
  yearlyPriceId?: string | null,
};

export type UpdateUserInput = {
  id: string,
  sub?: string | null,
  firstname?: string | null,
  lastname?: string | null,
  email?: string | null,
  role?: string | null,
  owner?: string | null,
  avatarUrl?: string | null,
  avatarKey?: string | null,
  address?: string | null,
  city?: string | null,
  state?: string | null,
  zipCode?: string | null,
  country?: string | null,
  occupation?: string | null,
  institution?: string | null,
  stripeCustomerId?: string | null,
  subscription?: UserSubscriptionInput | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreateCourseInput = {
  id?: string | null,
  title?: string | null,
  slug?: string | null,
  shortDesc?: string | null,
  overview?: string | null,
  latestPrice?: number | null,
  beforePrice?: number | null,
  lessons?: string | null,
  duration?: string | null,
  image?: S3ObjectInput | null,
  requirements?: string | null,
  whatYouWillLearn?: string | null,
  whoIsThisCourseFor?: string | null,
  catId?: string | null,
  levelId?: string | null,
  inHomePage?: string | null,
  inHomePageSetAt?: string | null,
  isClass?: string | null,
};

export type S3ObjectInput = {
  key: string,
  url: string,
};

export type ModelCourseConditionInput = {
  title?: ModelStringInput | null,
  slug?: ModelStringInput | null,
  shortDesc?: ModelStringInput | null,
  overview?: ModelStringInput | null,
  latestPrice?: ModelIntInput | null,
  beforePrice?: ModelIntInput | null,
  lessons?: ModelStringInput | null,
  duration?: ModelStringInput | null,
  requirements?: ModelStringInput | null,
  whatYouWillLearn?: ModelStringInput | null,
  whoIsThisCourseFor?: ModelStringInput | null,
  catId?: ModelStringInput | null,
  levelId?: ModelStringInput | null,
  inHomePage?: ModelStringInput | null,
  inHomePageSetAt?: ModelStringInput | null,
  isClass?: ModelStringInput | null,
  and?: Array< ModelCourseConditionInput | null > | null,
  or?: Array< ModelCourseConditionInput | null > | null,
  not?: ModelCourseConditionInput | null,
};

export type Course = {
  __typename: "Course",
  id: string,
  title?: string | null,
  slug?: string | null,
  shortDesc?: string | null,
  overview?: string | null,
  latestPrice?: number | null,
  beforePrice?: number | null,
  lessons?: string | null,
  duration?: string | null,
  image?: S3Object | null,
  requirements?: string | null,
  whatYouWillLearn?: string | null,
  whoIsThisCourseFor?: string | null,
  catId?: string | null,
  levelId?: string | null,
  inHomePage?: string | null,
  inHomePageSetAt?: string | null,
  isClass?: string | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type S3Object = {
  __typename: "S3Object",
  key: string,
  url: string,
};

export type UpdateCourseInput = {
  id: string,
  title?: string | null,
  slug?: string | null,
  shortDesc?: string | null,
  overview?: string | null,
  latestPrice?: number | null,
  beforePrice?: number | null,
  lessons?: string | null,
  duration?: string | null,
  image?: S3ObjectInput | null,
  requirements?: string | null,
  whatYouWillLearn?: string | null,
  whoIsThisCourseFor?: string | null,
  catId?: string | null,
  levelId?: string | null,
  inHomePage?: string | null,
  inHomePageSetAt?: string | null,
  isClass?: string | null,
};

export type DeleteCourseInput = {
  id: string,
};

export type CreateWelcomeMessageInput = {
  id?: string | null,
  title?: string | null,
  content: string,
  footer?: string | null,
};

export type ModelWelcomeMessageConditionInput = {
  title?: ModelStringInput | null,
  content?: ModelStringInput | null,
  footer?: ModelStringInput | null,
  and?: Array< ModelWelcomeMessageConditionInput | null > | null,
  or?: Array< ModelWelcomeMessageConditionInput | null > | null,
  not?: ModelWelcomeMessageConditionInput | null,
};

export type WelcomeMessage = {
  __typename: "WelcomeMessage",
  id: string,
  title?: string | null,
  content: string,
  footer?: string | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateWelcomeMessageInput = {
  id: string,
  title?: string | null,
  content?: string | null,
  footer?: string | null,
};

export type DeleteWelcomeMessageInput = {
  id: string,
};

export type CreateAdBannerInput = {
  id?: string | null,
  bannerKey: string,
};

export type ModelAdBannerConditionInput = {
  bannerKey?: ModelStringInput | null,
  and?: Array< ModelAdBannerConditionInput | null > | null,
  or?: Array< ModelAdBannerConditionInput | null > | null,
  not?: ModelAdBannerConditionInput | null,
};

export type AdBanner = {
  __typename: "AdBanner",
  id: string,
  bannerKey: string,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateAdBannerInput = {
  id: string,
  bannerKey?: string | null,
};

export type DeleteAdBannerInput = {
  id: string,
};

export type CreateFaqInput = {
  id?: string | null,
  category: string,
  question: string,
  answer: string,
};

export type ModelFaqConditionInput = {
  category?: ModelStringInput | null,
  question?: ModelStringInput | null,
  answer?: ModelStringInput | null,
  and?: Array< ModelFaqConditionInput | null > | null,
  or?: Array< ModelFaqConditionInput | null > | null,
  not?: ModelFaqConditionInput | null,
};

export type Faq = {
  __typename: "Faq",
  id: string,
  category: string,
  question: string,
  answer: string,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateFaqInput = {
  id: string,
  category?: string | null,
  question?: string | null,
  answer?: string | null,
};

export type DeleteFaqInput = {
  id: string,
};

export type ModelSubscriptionTierFilterInput = {
  id?: ModelIDInput | null,
  tier?: ModelStringInput | null,
  title?: ModelStringInput | null,
  price?: ModelIntInput | null,
  description?: ModelStringInput | null,
  montlyPriceId?: ModelStringInput | null,
  yearlyPriceId?: ModelStringInput | null,
  and?: Array< ModelSubscriptionTierFilterInput | null > | null,
  or?: Array< ModelSubscriptionTierFilterInput | null > | null,
  not?: ModelSubscriptionTierFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelSubscriptionTierConnection = {
  __typename: "ModelSubscriptionTierConnection",
  items:  Array<SubscriptionTier | null >,
  nextToken?: string | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  sub?: ModelStringInput | null,
  firstname?: ModelStringInput | null,
  lastname?: ModelStringInput | null,
  email?: ModelStringInput | null,
  role?: ModelStringInput | null,
  owner?: ModelStringInput | null,
  avatarUrl?: ModelStringInput | null,
  avatarKey?: ModelStringInput | null,
  address?: ModelStringInput | null,
  city?: ModelStringInput | null,
  state?: ModelStringInput | null,
  zipCode?: ModelStringInput | null,
  country?: ModelStringInput | null,
  occupation?: ModelStringInput | null,
  institution?: ModelStringInput | null,
  stripeCustomerId?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelCourseFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  slug?: ModelStringInput | null,
  shortDesc?: ModelStringInput | null,
  overview?: ModelStringInput | null,
  latestPrice?: ModelIntInput | null,
  beforePrice?: ModelIntInput | null,
  lessons?: ModelStringInput | null,
  duration?: ModelStringInput | null,
  requirements?: ModelStringInput | null,
  whatYouWillLearn?: ModelStringInput | null,
  whoIsThisCourseFor?: ModelStringInput | null,
  catId?: ModelStringInput | null,
  levelId?: ModelStringInput | null,
  inHomePage?: ModelStringInput | null,
  inHomePageSetAt?: ModelStringInput | null,
  isClass?: ModelStringInput | null,
  and?: Array< ModelCourseFilterInput | null > | null,
  or?: Array< ModelCourseFilterInput | null > | null,
  not?: ModelCourseFilterInput | null,
};

export type ModelCourseConnection = {
  __typename: "ModelCourseConnection",
  items:  Array<Course | null >,
  nextToken?: string | null,
};

export type ModelWelcomeMessageFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  content?: ModelStringInput | null,
  footer?: ModelStringInput | null,
  and?: Array< ModelWelcomeMessageFilterInput | null > | null,
  or?: Array< ModelWelcomeMessageFilterInput | null > | null,
  not?: ModelWelcomeMessageFilterInput | null,
};

export type ModelWelcomeMessageConnection = {
  __typename: "ModelWelcomeMessageConnection",
  items:  Array<WelcomeMessage | null >,
  nextToken?: string | null,
};

export type ModelAdBannerFilterInput = {
  id?: ModelIDInput | null,
  bannerKey?: ModelStringInput | null,
  and?: Array< ModelAdBannerFilterInput | null > | null,
  or?: Array< ModelAdBannerFilterInput | null > | null,
  not?: ModelAdBannerFilterInput | null,
};

export type ModelAdBannerConnection = {
  __typename: "ModelAdBannerConnection",
  items:  Array<AdBanner | null >,
  nextToken?: string | null,
};

export type ModelFaqFilterInput = {
  id?: ModelIDInput | null,
  category?: ModelStringInput | null,
  question?: ModelStringInput | null,
  answer?: ModelStringInput | null,
  and?: Array< ModelFaqFilterInput | null > | null,
  or?: Array< ModelFaqFilterInput | null > | null,
  not?: ModelFaqFilterInput | null,
};

export type ModelFaqConnection = {
  __typename: "ModelFaqConnection",
  items:  Array<Faq | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionSubscriptionTierFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  tier?: ModelSubscriptionStringInput | null,
  title?: ModelSubscriptionStringInput | null,
  price?: ModelSubscriptionIntInput | null,
  description?: ModelSubscriptionStringInput | null,
  montlyPriceId?: ModelSubscriptionStringInput | null,
  yearlyPriceId?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionSubscriptionTierFilterInput | null > | null,
  or?: Array< ModelSubscriptionSubscriptionTierFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  sub?: ModelSubscriptionStringInput | null,
  firstname?: ModelSubscriptionStringInput | null,
  lastname?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  role?: ModelSubscriptionStringInput | null,
  avatarUrl?: ModelSubscriptionStringInput | null,
  avatarKey?: ModelSubscriptionStringInput | null,
  address?: ModelSubscriptionStringInput | null,
  city?: ModelSubscriptionStringInput | null,
  state?: ModelSubscriptionStringInput | null,
  zipCode?: ModelSubscriptionStringInput | null,
  country?: ModelSubscriptionStringInput | null,
  occupation?: ModelSubscriptionStringInput | null,
  institution?: ModelSubscriptionStringInput | null,
  stripeCustomerId?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
};

export type ModelSubscriptionCourseFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  title?: ModelSubscriptionStringInput | null,
  slug?: ModelSubscriptionStringInput | null,
  shortDesc?: ModelSubscriptionStringInput | null,
  overview?: ModelSubscriptionStringInput | null,
  latestPrice?: ModelSubscriptionIntInput | null,
  beforePrice?: ModelSubscriptionIntInput | null,
  lessons?: ModelSubscriptionStringInput | null,
  duration?: ModelSubscriptionStringInput | null,
  requirements?: ModelSubscriptionStringInput | null,
  whatYouWillLearn?: ModelSubscriptionStringInput | null,
  whoIsThisCourseFor?: ModelSubscriptionStringInput | null,
  catId?: ModelSubscriptionStringInput | null,
  levelId?: ModelSubscriptionStringInput | null,
  inHomePage?: ModelSubscriptionStringInput | null,
  inHomePageSetAt?: ModelSubscriptionStringInput | null,
  isClass?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionCourseFilterInput | null > | null,
  or?: Array< ModelSubscriptionCourseFilterInput | null > | null,
};

export type ModelSubscriptionWelcomeMessageFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  title?: ModelSubscriptionStringInput | null,
  content?: ModelSubscriptionStringInput | null,
  footer?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionWelcomeMessageFilterInput | null > | null,
  or?: Array< ModelSubscriptionWelcomeMessageFilterInput | null > | null,
};

export type ModelSubscriptionAdBannerFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  bannerKey?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionAdBannerFilterInput | null > | null,
  or?: Array< ModelSubscriptionAdBannerFilterInput | null > | null,
};

export type ModelSubscriptionFaqFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  category?: ModelSubscriptionStringInput | null,
  question?: ModelSubscriptionStringInput | null,
  answer?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionFaqFilterInput | null > | null,
  or?: Array< ModelSubscriptionFaqFilterInput | null > | null,
};

export type CreateSubscriptionTierMutationVariables = {
  input: CreateSubscriptionTierInput,
  condition?: ModelSubscriptionTierConditionInput | null,
};

export type CreateSubscriptionTierMutation = {
  createSubscriptionTier?:  {
    __typename: "SubscriptionTier",
    id: string,
    tier: string,
    title: string,
    price: number,
    description?: Array< string | null > | null,
    montlyPriceId?: string | null,
    yearlyPriceId?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateSubscriptionTierMutationVariables = {
  input: UpdateSubscriptionTierInput,
  condition?: ModelSubscriptionTierConditionInput | null,
};

export type UpdateSubscriptionTierMutation = {
  updateSubscriptionTier?:  {
    __typename: "SubscriptionTier",
    id: string,
    tier: string,
    title: string,
    price: number,
    description?: Array< string | null > | null,
    montlyPriceId?: string | null,
    yearlyPriceId?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteSubscriptionTierMutationVariables = {
  input: DeleteSubscriptionTierInput,
  condition?: ModelSubscriptionTierConditionInput | null,
};

export type DeleteSubscriptionTierMutation = {
  deleteSubscriptionTier?:  {
    __typename: "SubscriptionTier",
    id: string,
    tier: string,
    title: string,
    price: number,
    description?: Array< string | null > | null,
    montlyPriceId?: string | null,
    yearlyPriceId?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    sub?: string | null,
    firstname: string,
    lastname: string,
    email: string,
    role?: string | null,
    owner: string,
    avatarUrl?: string | null,
    avatarKey?: string | null,
    address?: string | null,
    city?: string | null,
    state?: string | null,
    zipCode?: string | null,
    country?: string | null,
    occupation?: string | null,
    institution?: string | null,
    stripeCustomerId?: string | null,
    subscription?:  {
      __typename: "UserSubscription",
      tier: string,
      title: string,
      price: number,
      canceled?: string | null,
      subscribedAt?: string | null,
      expiresAt?: string | null,
      montlyPriceId?: string | null,
      yearlyPriceId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    sub?: string | null,
    firstname: string,
    lastname: string,
    email: string,
    role?: string | null,
    owner: string,
    avatarUrl?: string | null,
    avatarKey?: string | null,
    address?: string | null,
    city?: string | null,
    state?: string | null,
    zipCode?: string | null,
    country?: string | null,
    occupation?: string | null,
    institution?: string | null,
    stripeCustomerId?: string | null,
    subscription?:  {
      __typename: "UserSubscription",
      tier: string,
      title: string,
      price: number,
      canceled?: string | null,
      subscribedAt?: string | null,
      expiresAt?: string | null,
      montlyPriceId?: string | null,
      yearlyPriceId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    sub?: string | null,
    firstname: string,
    lastname: string,
    email: string,
    role?: string | null,
    owner: string,
    avatarUrl?: string | null,
    avatarKey?: string | null,
    address?: string | null,
    city?: string | null,
    state?: string | null,
    zipCode?: string | null,
    country?: string | null,
    occupation?: string | null,
    institution?: string | null,
    stripeCustomerId?: string | null,
    subscription?:  {
      __typename: "UserSubscription",
      tier: string,
      title: string,
      price: number,
      canceled?: string | null,
      subscribedAt?: string | null,
      expiresAt?: string | null,
      montlyPriceId?: string | null,
      yearlyPriceId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCourseMutationVariables = {
  input: CreateCourseInput,
  condition?: ModelCourseConditionInput | null,
};

export type CreateCourseMutation = {
  createCourse?:  {
    __typename: "Course",
    id: string,
    title?: string | null,
    slug?: string | null,
    shortDesc?: string | null,
    overview?: string | null,
    latestPrice?: number | null,
    beforePrice?: number | null,
    lessons?: string | null,
    duration?: string | null,
    image?:  {
      __typename: "S3Object",
      key: string,
      url: string,
    } | null,
    requirements?: string | null,
    whatYouWillLearn?: string | null,
    whoIsThisCourseFor?: string | null,
    catId?: string | null,
    levelId?: string | null,
    inHomePage?: string | null,
    inHomePageSetAt?: string | null,
    isClass?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateCourseMutationVariables = {
  input: UpdateCourseInput,
  condition?: ModelCourseConditionInput | null,
};

export type UpdateCourseMutation = {
  updateCourse?:  {
    __typename: "Course",
    id: string,
    title?: string | null,
    slug?: string | null,
    shortDesc?: string | null,
    overview?: string | null,
    latestPrice?: number | null,
    beforePrice?: number | null,
    lessons?: string | null,
    duration?: string | null,
    image?:  {
      __typename: "S3Object",
      key: string,
      url: string,
    } | null,
    requirements?: string | null,
    whatYouWillLearn?: string | null,
    whoIsThisCourseFor?: string | null,
    catId?: string | null,
    levelId?: string | null,
    inHomePage?: string | null,
    inHomePageSetAt?: string | null,
    isClass?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteCourseMutationVariables = {
  input: DeleteCourseInput,
  condition?: ModelCourseConditionInput | null,
};

export type DeleteCourseMutation = {
  deleteCourse?:  {
    __typename: "Course",
    id: string,
    title?: string | null,
    slug?: string | null,
    shortDesc?: string | null,
    overview?: string | null,
    latestPrice?: number | null,
    beforePrice?: number | null,
    lessons?: string | null,
    duration?: string | null,
    image?:  {
      __typename: "S3Object",
      key: string,
      url: string,
    } | null,
    requirements?: string | null,
    whatYouWillLearn?: string | null,
    whoIsThisCourseFor?: string | null,
    catId?: string | null,
    levelId?: string | null,
    inHomePage?: string | null,
    inHomePageSetAt?: string | null,
    isClass?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateWelcomeMessageMutationVariables = {
  input: CreateWelcomeMessageInput,
  condition?: ModelWelcomeMessageConditionInput | null,
};

export type CreateWelcomeMessageMutation = {
  createWelcomeMessage?:  {
    __typename: "WelcomeMessage",
    id: string,
    title?: string | null,
    content: string,
    footer?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateWelcomeMessageMutationVariables = {
  input: UpdateWelcomeMessageInput,
  condition?: ModelWelcomeMessageConditionInput | null,
};

export type UpdateWelcomeMessageMutation = {
  updateWelcomeMessage?:  {
    __typename: "WelcomeMessage",
    id: string,
    title?: string | null,
    content: string,
    footer?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteWelcomeMessageMutationVariables = {
  input: DeleteWelcomeMessageInput,
  condition?: ModelWelcomeMessageConditionInput | null,
};

export type DeleteWelcomeMessageMutation = {
  deleteWelcomeMessage?:  {
    __typename: "WelcomeMessage",
    id: string,
    title?: string | null,
    content: string,
    footer?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateAdBannerMutationVariables = {
  input: CreateAdBannerInput,
  condition?: ModelAdBannerConditionInput | null,
};

export type CreateAdBannerMutation = {
  createAdBanner?:  {
    __typename: "AdBanner",
    id: string,
    bannerKey: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateAdBannerMutationVariables = {
  input: UpdateAdBannerInput,
  condition?: ModelAdBannerConditionInput | null,
};

export type UpdateAdBannerMutation = {
  updateAdBanner?:  {
    __typename: "AdBanner",
    id: string,
    bannerKey: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteAdBannerMutationVariables = {
  input: DeleteAdBannerInput,
  condition?: ModelAdBannerConditionInput | null,
};

export type DeleteAdBannerMutation = {
  deleteAdBanner?:  {
    __typename: "AdBanner",
    id: string,
    bannerKey: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateFaqMutationVariables = {
  input: CreateFaqInput,
  condition?: ModelFaqConditionInput | null,
};

export type CreateFaqMutation = {
  createFaq?:  {
    __typename: "Faq",
    id: string,
    category: string,
    question: string,
    answer: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateFaqMutationVariables = {
  input: UpdateFaqInput,
  condition?: ModelFaqConditionInput | null,
};

export type UpdateFaqMutation = {
  updateFaq?:  {
    __typename: "Faq",
    id: string,
    category: string,
    question: string,
    answer: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteFaqMutationVariables = {
  input: DeleteFaqInput,
  condition?: ModelFaqConditionInput | null,
};

export type DeleteFaqMutation = {
  deleteFaq?:  {
    __typename: "Faq",
    id: string,
    category: string,
    question: string,
    answer: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type GetSubscriptionTierQueryVariables = {
  id: string,
};

export type GetSubscriptionTierQuery = {
  getSubscriptionTier?:  {
    __typename: "SubscriptionTier",
    id: string,
    tier: string,
    title: string,
    price: number,
    description?: Array< string | null > | null,
    montlyPriceId?: string | null,
    yearlyPriceId?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListSubscriptionTiersQueryVariables = {
  filter?: ModelSubscriptionTierFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSubscriptionTiersQuery = {
  listSubscriptionTiers?:  {
    __typename: "ModelSubscriptionTierConnection",
    items:  Array< {
      __typename: "SubscriptionTier",
      id: string,
      tier: string,
      title: string,
      price: number,
      description?: Array< string | null > | null,
      montlyPriceId?: string | null,
      yearlyPriceId?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    sub?: string | null,
    firstname: string,
    lastname: string,
    email: string,
    role?: string | null,
    owner: string,
    avatarUrl?: string | null,
    avatarKey?: string | null,
    address?: string | null,
    city?: string | null,
    state?: string | null,
    zipCode?: string | null,
    country?: string | null,
    occupation?: string | null,
    institution?: string | null,
    stripeCustomerId?: string | null,
    subscription?:  {
      __typename: "UserSubscription",
      tier: string,
      title: string,
      price: number,
      canceled?: string | null,
      subscribedAt?: string | null,
      expiresAt?: string | null,
      montlyPriceId?: string | null,
      yearlyPriceId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      sub?: string | null,
      firstname: string,
      lastname: string,
      email: string,
      role?: string | null,
      owner: string,
      avatarUrl?: string | null,
      avatarKey?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zipCode?: string | null,
      country?: string | null,
      occupation?: string | null,
      institution?: string | null,
      stripeCustomerId?: string | null,
      subscription?:  {
        __typename: "UserSubscription",
        tier: string,
        title: string,
        price: number,
        canceled?: string | null,
        subscribedAt?: string | null,
        expiresAt?: string | null,
        montlyPriceId?: string | null,
        yearlyPriceId?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type UserByEmailQueryVariables = {
  email: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserByEmailQuery = {
  userByEmail?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      sub?: string | null,
      firstname: string,
      lastname: string,
      email: string,
      role?: string | null,
      owner: string,
      avatarUrl?: string | null,
      avatarKey?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zipCode?: string | null,
      country?: string | null,
      occupation?: string | null,
      institution?: string | null,
      stripeCustomerId?: string | null,
      subscription?:  {
        __typename: "UserSubscription",
        tier: string,
        title: string,
        price: number,
        canceled?: string | null,
        subscribedAt?: string | null,
        expiresAt?: string | null,
        montlyPriceId?: string | null,
        yearlyPriceId?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type UserByCustomerIdQueryVariables = {
  stripeCustomerId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserByCustomerIdQuery = {
  userByCustomerId?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      sub?: string | null,
      firstname: string,
      lastname: string,
      email: string,
      role?: string | null,
      owner: string,
      avatarUrl?: string | null,
      avatarKey?: string | null,
      address?: string | null,
      city?: string | null,
      state?: string | null,
      zipCode?: string | null,
      country?: string | null,
      occupation?: string | null,
      institution?: string | null,
      stripeCustomerId?: string | null,
      subscription?:  {
        __typename: "UserSubscription",
        tier: string,
        title: string,
        price: number,
        canceled?: string | null,
        subscribedAt?: string | null,
        expiresAt?: string | null,
        montlyPriceId?: string | null,
        yearlyPriceId?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCourseQueryVariables = {
  id: string,
};

export type GetCourseQuery = {
  getCourse?:  {
    __typename: "Course",
    id: string,
    title?: string | null,
    slug?: string | null,
    shortDesc?: string | null,
    overview?: string | null,
    latestPrice?: number | null,
    beforePrice?: number | null,
    lessons?: string | null,
    duration?: string | null,
    image?:  {
      __typename: "S3Object",
      key: string,
      url: string,
    } | null,
    requirements?: string | null,
    whatYouWillLearn?: string | null,
    whoIsThisCourseFor?: string | null,
    catId?: string | null,
    levelId?: string | null,
    inHomePage?: string | null,
    inHomePageSetAt?: string | null,
    isClass?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListCoursesQueryVariables = {
  filter?: ModelCourseFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCoursesQuery = {
  listCourses?:  {
    __typename: "ModelCourseConnection",
    items:  Array< {
      __typename: "Course",
      id: string,
      title?: string | null,
      slug?: string | null,
      shortDesc?: string | null,
      overview?: string | null,
      latestPrice?: number | null,
      beforePrice?: number | null,
      lessons?: string | null,
      duration?: string | null,
      image?:  {
        __typename: "S3Object",
        key: string,
        url: string,
      } | null,
      requirements?: string | null,
      whatYouWillLearn?: string | null,
      whoIsThisCourseFor?: string | null,
      catId?: string | null,
      levelId?: string | null,
      inHomePage?: string | null,
      inHomePageSetAt?: string | null,
      isClass?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetWelcomeMessageQueryVariables = {
  id: string,
};

export type GetWelcomeMessageQuery = {
  getWelcomeMessage?:  {
    __typename: "WelcomeMessage",
    id: string,
    title?: string | null,
    content: string,
    footer?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListWelcomeMessagesQueryVariables = {
  filter?: ModelWelcomeMessageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListWelcomeMessagesQuery = {
  listWelcomeMessages?:  {
    __typename: "ModelWelcomeMessageConnection",
    items:  Array< {
      __typename: "WelcomeMessage",
      id: string,
      title?: string | null,
      content: string,
      footer?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetAdBannerQueryVariables = {
  id: string,
};

export type GetAdBannerQuery = {
  getAdBanner?:  {
    __typename: "AdBanner",
    id: string,
    bannerKey: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListAdBannersQueryVariables = {
  filter?: ModelAdBannerFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAdBannersQuery = {
  listAdBanners?:  {
    __typename: "ModelAdBannerConnection",
    items:  Array< {
      __typename: "AdBanner",
      id: string,
      bannerKey: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetFaqQueryVariables = {
  id: string,
};

export type GetFaqQuery = {
  getFaq?:  {
    __typename: "Faq",
    id: string,
    category: string,
    question: string,
    answer: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListFaqsQueryVariables = {
  filter?: ModelFaqFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListFaqsQuery = {
  listFaqs?:  {
    __typename: "ModelFaqConnection",
    items:  Array< {
      __typename: "Faq",
      id: string,
      category: string,
      question: string,
      answer: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateSubscriptionTierSubscriptionVariables = {
  filter?: ModelSubscriptionSubscriptionTierFilterInput | null,
  owner?: string | null,
};

export type OnCreateSubscriptionTierSubscription = {
  onCreateSubscriptionTier?:  {
    __typename: "SubscriptionTier",
    id: string,
    tier: string,
    title: string,
    price: number,
    description?: Array< string | null > | null,
    montlyPriceId?: string | null,
    yearlyPriceId?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateSubscriptionTierSubscriptionVariables = {
  filter?: ModelSubscriptionSubscriptionTierFilterInput | null,
  owner?: string | null,
};

export type OnUpdateSubscriptionTierSubscription = {
  onUpdateSubscriptionTier?:  {
    __typename: "SubscriptionTier",
    id: string,
    tier: string,
    title: string,
    price: number,
    description?: Array< string | null > | null,
    montlyPriceId?: string | null,
    yearlyPriceId?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteSubscriptionTierSubscriptionVariables = {
  filter?: ModelSubscriptionSubscriptionTierFilterInput | null,
  owner?: string | null,
};

export type OnDeleteSubscriptionTierSubscription = {
  onDeleteSubscriptionTier?:  {
    __typename: "SubscriptionTier",
    id: string,
    tier: string,
    title: string,
    price: number,
    description?: Array< string | null > | null,
    montlyPriceId?: string | null,
    yearlyPriceId?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    sub?: string | null,
    firstname: string,
    lastname: string,
    email: string,
    role?: string | null,
    owner: string,
    avatarUrl?: string | null,
    avatarKey?: string | null,
    address?: string | null,
    city?: string | null,
    state?: string | null,
    zipCode?: string | null,
    country?: string | null,
    occupation?: string | null,
    institution?: string | null,
    stripeCustomerId?: string | null,
    subscription?:  {
      __typename: "UserSubscription",
      tier: string,
      title: string,
      price: number,
      canceled?: string | null,
      subscribedAt?: string | null,
      expiresAt?: string | null,
      montlyPriceId?: string | null,
      yearlyPriceId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    sub?: string | null,
    firstname: string,
    lastname: string,
    email: string,
    role?: string | null,
    owner: string,
    avatarUrl?: string | null,
    avatarKey?: string | null,
    address?: string | null,
    city?: string | null,
    state?: string | null,
    zipCode?: string | null,
    country?: string | null,
    occupation?: string | null,
    institution?: string | null,
    stripeCustomerId?: string | null,
    subscription?:  {
      __typename: "UserSubscription",
      tier: string,
      title: string,
      price: number,
      canceled?: string | null,
      subscribedAt?: string | null,
      expiresAt?: string | null,
      montlyPriceId?: string | null,
      yearlyPriceId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    sub?: string | null,
    firstname: string,
    lastname: string,
    email: string,
    role?: string | null,
    owner: string,
    avatarUrl?: string | null,
    avatarKey?: string | null,
    address?: string | null,
    city?: string | null,
    state?: string | null,
    zipCode?: string | null,
    country?: string | null,
    occupation?: string | null,
    institution?: string | null,
    stripeCustomerId?: string | null,
    subscription?:  {
      __typename: "UserSubscription",
      tier: string,
      title: string,
      price: number,
      canceled?: string | null,
      subscribedAt?: string | null,
      expiresAt?: string | null,
      montlyPriceId?: string | null,
      yearlyPriceId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCourseSubscriptionVariables = {
  filter?: ModelSubscriptionCourseFilterInput | null,
  owner?: string | null,
};

export type OnCreateCourseSubscription = {
  onCreateCourse?:  {
    __typename: "Course",
    id: string,
    title?: string | null,
    slug?: string | null,
    shortDesc?: string | null,
    overview?: string | null,
    latestPrice?: number | null,
    beforePrice?: number | null,
    lessons?: string | null,
    duration?: string | null,
    image?:  {
      __typename: "S3Object",
      key: string,
      url: string,
    } | null,
    requirements?: string | null,
    whatYouWillLearn?: string | null,
    whoIsThisCourseFor?: string | null,
    catId?: string | null,
    levelId?: string | null,
    inHomePage?: string | null,
    inHomePageSetAt?: string | null,
    isClass?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateCourseSubscriptionVariables = {
  filter?: ModelSubscriptionCourseFilterInput | null,
  owner?: string | null,
};

export type OnUpdateCourseSubscription = {
  onUpdateCourse?:  {
    __typename: "Course",
    id: string,
    title?: string | null,
    slug?: string | null,
    shortDesc?: string | null,
    overview?: string | null,
    latestPrice?: number | null,
    beforePrice?: number | null,
    lessons?: string | null,
    duration?: string | null,
    image?:  {
      __typename: "S3Object",
      key: string,
      url: string,
    } | null,
    requirements?: string | null,
    whatYouWillLearn?: string | null,
    whoIsThisCourseFor?: string | null,
    catId?: string | null,
    levelId?: string | null,
    inHomePage?: string | null,
    inHomePageSetAt?: string | null,
    isClass?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteCourseSubscriptionVariables = {
  filter?: ModelSubscriptionCourseFilterInput | null,
  owner?: string | null,
};

export type OnDeleteCourseSubscription = {
  onDeleteCourse?:  {
    __typename: "Course",
    id: string,
    title?: string | null,
    slug?: string | null,
    shortDesc?: string | null,
    overview?: string | null,
    latestPrice?: number | null,
    beforePrice?: number | null,
    lessons?: string | null,
    duration?: string | null,
    image?:  {
      __typename: "S3Object",
      key: string,
      url: string,
    } | null,
    requirements?: string | null,
    whatYouWillLearn?: string | null,
    whoIsThisCourseFor?: string | null,
    catId?: string | null,
    levelId?: string | null,
    inHomePage?: string | null,
    inHomePageSetAt?: string | null,
    isClass?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateWelcomeMessageSubscriptionVariables = {
  filter?: ModelSubscriptionWelcomeMessageFilterInput | null,
  owner?: string | null,
};

export type OnCreateWelcomeMessageSubscription = {
  onCreateWelcomeMessage?:  {
    __typename: "WelcomeMessage",
    id: string,
    title?: string | null,
    content: string,
    footer?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateWelcomeMessageSubscriptionVariables = {
  filter?: ModelSubscriptionWelcomeMessageFilterInput | null,
  owner?: string | null,
};

export type OnUpdateWelcomeMessageSubscription = {
  onUpdateWelcomeMessage?:  {
    __typename: "WelcomeMessage",
    id: string,
    title?: string | null,
    content: string,
    footer?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteWelcomeMessageSubscriptionVariables = {
  filter?: ModelSubscriptionWelcomeMessageFilterInput | null,
  owner?: string | null,
};

export type OnDeleteWelcomeMessageSubscription = {
  onDeleteWelcomeMessage?:  {
    __typename: "WelcomeMessage",
    id: string,
    title?: string | null,
    content: string,
    footer?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateAdBannerSubscriptionVariables = {
  filter?: ModelSubscriptionAdBannerFilterInput | null,
  owner?: string | null,
};

export type OnCreateAdBannerSubscription = {
  onCreateAdBanner?:  {
    __typename: "AdBanner",
    id: string,
    bannerKey: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateAdBannerSubscriptionVariables = {
  filter?: ModelSubscriptionAdBannerFilterInput | null,
  owner?: string | null,
};

export type OnUpdateAdBannerSubscription = {
  onUpdateAdBanner?:  {
    __typename: "AdBanner",
    id: string,
    bannerKey: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteAdBannerSubscriptionVariables = {
  filter?: ModelSubscriptionAdBannerFilterInput | null,
  owner?: string | null,
};

export type OnDeleteAdBannerSubscription = {
  onDeleteAdBanner?:  {
    __typename: "AdBanner",
    id: string,
    bannerKey: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateFaqSubscriptionVariables = {
  filter?: ModelSubscriptionFaqFilterInput | null,
  owner?: string | null,
};

export type OnCreateFaqSubscription = {
  onCreateFaq?:  {
    __typename: "Faq",
    id: string,
    category: string,
    question: string,
    answer: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateFaqSubscriptionVariables = {
  filter?: ModelSubscriptionFaqFilterInput | null,
  owner?: string | null,
};

export type OnUpdateFaqSubscription = {
  onUpdateFaq?:  {
    __typename: "Faq",
    id: string,
    category: string,
    question: string,
    answer: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteFaqSubscriptionVariables = {
  filter?: ModelSubscriptionFaqFilterInput | null,
  owner?: string | null,
};

export type OnDeleteFaqSubscription = {
  onDeleteFaq?:  {
    __typename: "Faq",
    id: string,
    category: string,
    question: string,
    answer: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
