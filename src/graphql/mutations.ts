/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSubscriptionTier = /* GraphQL */ `
  mutation CreateSubscriptionTier(
    $input: CreateSubscriptionTierInput!
    $condition: ModelSubscriptionTierConditionInput
  ) {
    createSubscriptionTier(input: $input, condition: $condition) {
      id
      tier
      title
      price
      description
      montlyPriceId
      yearlyPriceId
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateSubscriptionTier = /* GraphQL */ `
  mutation UpdateSubscriptionTier(
    $input: UpdateSubscriptionTierInput!
    $condition: ModelSubscriptionTierConditionInput
  ) {
    updateSubscriptionTier(input: $input, condition: $condition) {
      id
      tier
      title
      price
      description
      montlyPriceId
      yearlyPriceId
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteSubscriptionTier = /* GraphQL */ `
  mutation DeleteSubscriptionTier(
    $input: DeleteSubscriptionTierInput!
    $condition: ModelSubscriptionTierConditionInput
  ) {
    deleteSubscriptionTier(input: $input, condition: $condition) {
      id
      tier
      title
      price
      description
      montlyPriceId
      yearlyPriceId
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      sub
      firstname
      lastname
      email
      role
      owner
      avatarUrl
      avatarKey
      address
      city
      state
      zipCode
      country
      occupation
      institution
      stripeCustomerId
      subscription {
        tier
        title
        price
        canceled
        subscribedAt
        expiresAt
        montlyPriceId
        yearlyPriceId
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      sub
      firstname
      lastname
      email
      role
      owner
      avatarUrl
      avatarKey
      address
      city
      state
      zipCode
      country
      occupation
      institution
      stripeCustomerId
      subscription {
        tier
        title
        price
        canceled
        subscribedAt
        expiresAt
        montlyPriceId
        yearlyPriceId
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      sub
      firstname
      lastname
      email
      role
      owner
      avatarUrl
      avatarKey
      address
      city
      state
      zipCode
      country
      occupation
      institution
      stripeCustomerId
      subscription {
        tier
        title
        price
        canceled
        subscribedAt
        expiresAt
        montlyPriceId
        yearlyPriceId
      }
      createdAt
      updatedAt
    }
  }
`;
export const createCategory = /* GraphQL */ `
  mutation CreateCategory(
    $input: CreateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    createCategory(input: $input, condition: $condition) {
      id
      name
      slug
      courses {
        items {
          id
          title
          slug
          shortDesc
          overview
          latestPrice
          beforePrice
          lessons
          duration
          requirements
          whatYouWillLearn
          whoIsThisCourseFor
          catID
          levelID
          inHomePage
          inHomePageSetAt
          isClass
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateCategory = /* GraphQL */ `
  mutation UpdateCategory(
    $input: UpdateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    updateCategory(input: $input, condition: $condition) {
      id
      name
      slug
      courses {
        items {
          id
          title
          slug
          shortDesc
          overview
          latestPrice
          beforePrice
          lessons
          duration
          requirements
          whatYouWillLearn
          whoIsThisCourseFor
          catID
          levelID
          inHomePage
          inHomePageSetAt
          isClass
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteCategory = /* GraphQL */ `
  mutation DeleteCategory(
    $input: DeleteCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    deleteCategory(input: $input, condition: $condition) {
      id
      name
      slug
      courses {
        items {
          id
          title
          slug
          shortDesc
          overview
          latestPrice
          beforePrice
          lessons
          duration
          requirements
          whatYouWillLearn
          whoIsThisCourseFor
          catID
          levelID
          inHomePage
          inHomePageSetAt
          isClass
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createLevel = /* GraphQL */ `
  mutation CreateLevel(
    $input: CreateLevelInput!
    $condition: ModelLevelConditionInput
  ) {
    createLevel(input: $input, condition: $condition) {
      id
      name
      slug
      courses {
        items {
          id
          title
          slug
          shortDesc
          overview
          latestPrice
          beforePrice
          lessons
          duration
          requirements
          whatYouWillLearn
          whoIsThisCourseFor
          catID
          levelID
          inHomePage
          inHomePageSetAt
          isClass
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateLevel = /* GraphQL */ `
  mutation UpdateLevel(
    $input: UpdateLevelInput!
    $condition: ModelLevelConditionInput
  ) {
    updateLevel(input: $input, condition: $condition) {
      id
      name
      slug
      courses {
        items {
          id
          title
          slug
          shortDesc
          overview
          latestPrice
          beforePrice
          lessons
          duration
          requirements
          whatYouWillLearn
          whoIsThisCourseFor
          catID
          levelID
          inHomePage
          inHomePageSetAt
          isClass
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteLevel = /* GraphQL */ `
  mutation DeleteLevel(
    $input: DeleteLevelInput!
    $condition: ModelLevelConditionInput
  ) {
    deleteLevel(input: $input, condition: $condition) {
      id
      name
      slug
      courses {
        items {
          id
          title
          slug
          shortDesc
          overview
          latestPrice
          beforePrice
          lessons
          duration
          requirements
          whatYouWillLearn
          whoIsThisCourseFor
          catID
          levelID
          inHomePage
          inHomePageSetAt
          isClass
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createCourse = /* GraphQL */ `
  mutation CreateCourse(
    $input: CreateCourseInput!
    $condition: ModelCourseConditionInput
  ) {
    createCourse(input: $input, condition: $condition) {
      id
      title
      slug
      shortDesc
      overview
      latestPrice
      beforePrice
      lessons
      duration
      image {
        key
        url
      }
      requirements
      whatYouWillLearn
      whoIsThisCourseFor
      catID
      category {
        id
        name
        slug
        courses {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      levelID
      level {
        id
        name
        slug
        courses {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      inHomePage
      inHomePageSetAt
      isClass
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateCourse = /* GraphQL */ `
  mutation UpdateCourse(
    $input: UpdateCourseInput!
    $condition: ModelCourseConditionInput
  ) {
    updateCourse(input: $input, condition: $condition) {
      id
      title
      slug
      shortDesc
      overview
      latestPrice
      beforePrice
      lessons
      duration
      image {
        key
        url
      }
      requirements
      whatYouWillLearn
      whoIsThisCourseFor
      catID
      category {
        id
        name
        slug
        courses {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      levelID
      level {
        id
        name
        slug
        courses {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      inHomePage
      inHomePageSetAt
      isClass
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteCourse = /* GraphQL */ `
  mutation DeleteCourse(
    $input: DeleteCourseInput!
    $condition: ModelCourseConditionInput
  ) {
    deleteCourse(input: $input, condition: $condition) {
      id
      title
      slug
      shortDesc
      overview
      latestPrice
      beforePrice
      lessons
      duration
      image {
        key
        url
      }
      requirements
      whatYouWillLearn
      whoIsThisCourseFor
      catID
      category {
        id
        name
        slug
        courses {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      levelID
      level {
        id
        name
        slug
        courses {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      inHomePage
      inHomePageSetAt
      isClass
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createWelcomeMessage = /* GraphQL */ `
  mutation CreateWelcomeMessage(
    $input: CreateWelcomeMessageInput!
    $condition: ModelWelcomeMessageConditionInput
  ) {
    createWelcomeMessage(input: $input, condition: $condition) {
      id
      title
      content
      footer
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateWelcomeMessage = /* GraphQL */ `
  mutation UpdateWelcomeMessage(
    $input: UpdateWelcomeMessageInput!
    $condition: ModelWelcomeMessageConditionInput
  ) {
    updateWelcomeMessage(input: $input, condition: $condition) {
      id
      title
      content
      footer
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteWelcomeMessage = /* GraphQL */ `
  mutation DeleteWelcomeMessage(
    $input: DeleteWelcomeMessageInput!
    $condition: ModelWelcomeMessageConditionInput
  ) {
    deleteWelcomeMessage(input: $input, condition: $condition) {
      id
      title
      content
      footer
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createAdBanner = /* GraphQL */ `
  mutation CreateAdBanner(
    $input: CreateAdBannerInput!
    $condition: ModelAdBannerConditionInput
  ) {
    createAdBanner(input: $input, condition: $condition) {
      id
      bannerKey
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateAdBanner = /* GraphQL */ `
  mutation UpdateAdBanner(
    $input: UpdateAdBannerInput!
    $condition: ModelAdBannerConditionInput
  ) {
    updateAdBanner(input: $input, condition: $condition) {
      id
      bannerKey
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteAdBanner = /* GraphQL */ `
  mutation DeleteAdBanner(
    $input: DeleteAdBannerInput!
    $condition: ModelAdBannerConditionInput
  ) {
    deleteAdBanner(input: $input, condition: $condition) {
      id
      bannerKey
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createFaq = /* GraphQL */ `
  mutation CreateFaq(
    $input: CreateFaqInput!
    $condition: ModelFaqConditionInput
  ) {
    createFaq(input: $input, condition: $condition) {
      id
      category
      question
      answer
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateFaq = /* GraphQL */ `
  mutation UpdateFaq(
    $input: UpdateFaqInput!
    $condition: ModelFaqConditionInput
  ) {
    updateFaq(input: $input, condition: $condition) {
      id
      category
      question
      answer
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteFaq = /* GraphQL */ `
  mutation DeleteFaq(
    $input: DeleteFaqInput!
    $condition: ModelFaqConditionInput
  ) {
    deleteFaq(input: $input, condition: $condition) {
      id
      category
      question
      answer
      createdAt
      updatedAt
      owner
    }
  }
`;
