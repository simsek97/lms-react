/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSubscriptionTier = /* GraphQL */ `
  subscription OnCreateSubscriptionTier(
    $filter: ModelSubscriptionSubscriptionTierFilterInput
    $owner: String
  ) {
    onCreateSubscriptionTier(filter: $filter, owner: $owner) {
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
export const onUpdateSubscriptionTier = /* GraphQL */ `
  subscription OnUpdateSubscriptionTier(
    $filter: ModelSubscriptionSubscriptionTierFilterInput
    $owner: String
  ) {
    onUpdateSubscriptionTier(filter: $filter, owner: $owner) {
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
export const onDeleteSubscriptionTier = /* GraphQL */ `
  subscription OnDeleteSubscriptionTier(
    $filter: ModelSubscriptionSubscriptionTierFilterInput
    $owner: String
  ) {
    onDeleteSubscriptionTier(filter: $filter, owner: $owner) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onCreateUser(filter: $filter, owner: $owner) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onUpdateUser(filter: $filter, owner: $owner) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onDeleteUser(filter: $filter, owner: $owner) {
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
export const onCreateCourse = /* GraphQL */ `
  subscription OnCreateCourse(
    $filter: ModelSubscriptionCourseFilterInput
    $owner: String
  ) {
    onCreateCourse(filter: $filter, owner: $owner) {
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
      catId
      levelId
      inHomePage
      inHomePageSetAt
      isClass
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateCourse = /* GraphQL */ `
  subscription OnUpdateCourse(
    $filter: ModelSubscriptionCourseFilterInput
    $owner: String
  ) {
    onUpdateCourse(filter: $filter, owner: $owner) {
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
      catId
      levelId
      inHomePage
      inHomePageSetAt
      isClass
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteCourse = /* GraphQL */ `
  subscription OnDeleteCourse(
    $filter: ModelSubscriptionCourseFilterInput
    $owner: String
  ) {
    onDeleteCourse(filter: $filter, owner: $owner) {
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
      catId
      levelId
      inHomePage
      inHomePageSetAt
      isClass
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateWelcomeMessage = /* GraphQL */ `
  subscription OnCreateWelcomeMessage(
    $filter: ModelSubscriptionWelcomeMessageFilterInput
    $owner: String
  ) {
    onCreateWelcomeMessage(filter: $filter, owner: $owner) {
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
export const onUpdateWelcomeMessage = /* GraphQL */ `
  subscription OnUpdateWelcomeMessage(
    $filter: ModelSubscriptionWelcomeMessageFilterInput
    $owner: String
  ) {
    onUpdateWelcomeMessage(filter: $filter, owner: $owner) {
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
export const onDeleteWelcomeMessage = /* GraphQL */ `
  subscription OnDeleteWelcomeMessage(
    $filter: ModelSubscriptionWelcomeMessageFilterInput
    $owner: String
  ) {
    onDeleteWelcomeMessage(filter: $filter, owner: $owner) {
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
export const onCreateAdBanner = /* GraphQL */ `
  subscription OnCreateAdBanner(
    $filter: ModelSubscriptionAdBannerFilterInput
    $owner: String
  ) {
    onCreateAdBanner(filter: $filter, owner: $owner) {
      id
      bannerKey
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateAdBanner = /* GraphQL */ `
  subscription OnUpdateAdBanner(
    $filter: ModelSubscriptionAdBannerFilterInput
    $owner: String
  ) {
    onUpdateAdBanner(filter: $filter, owner: $owner) {
      id
      bannerKey
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteAdBanner = /* GraphQL */ `
  subscription OnDeleteAdBanner(
    $filter: ModelSubscriptionAdBannerFilterInput
    $owner: String
  ) {
    onDeleteAdBanner(filter: $filter, owner: $owner) {
      id
      bannerKey
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateFaq = /* GraphQL */ `
  subscription OnCreateFaq(
    $filter: ModelSubscriptionFaqFilterInput
    $owner: String
  ) {
    onCreateFaq(filter: $filter, owner: $owner) {
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
export const onUpdateFaq = /* GraphQL */ `
  subscription OnUpdateFaq(
    $filter: ModelSubscriptionFaqFilterInput
    $owner: String
  ) {
    onUpdateFaq(filter: $filter, owner: $owner) {
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
export const onDeleteFaq = /* GraphQL */ `
  subscription OnDeleteFaq(
    $filter: ModelSubscriptionFaqFilterInput
    $owner: String
  ) {
    onDeleteFaq(filter: $filter, owner: $owner) {
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
