/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSubscriptionTier = /* GraphQL */ `
  query GetSubscriptionTier($id: ID!) {
    getSubscriptionTier(id: $id) {
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
export const listSubscriptionTiers = /* GraphQL */ `
  query ListSubscriptionTiers(
    $filter: ModelSubscriptionTierFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubscriptionTiers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const userByEmail = /* GraphQL */ `
  query UserByEmail(
    $email: String!
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userByEmail(
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const userByCustomerId = /* GraphQL */ `
  query UserByCustomerId(
    $stripeCustomerId: String!
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userByCustomerId(
      stripeCustomerId: $stripeCustomerId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getCourse = /* GraphQL */ `
  query GetCourse($id: ID!) {
    getCourse(id: $id) {
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
export const listCourses = /* GraphQL */ `
  query ListCourses(
    $filter: ModelCourseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCourses(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
      nextToken
    }
  }
`;
export const getWelcomeMessage = /* GraphQL */ `
  query GetWelcomeMessage($id: ID!) {
    getWelcomeMessage(id: $id) {
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
export const listWelcomeMessages = /* GraphQL */ `
  query ListWelcomeMessages(
    $filter: ModelWelcomeMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWelcomeMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        content
        footer
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getAdBanner = /* GraphQL */ `
  query GetAdBanner($id: ID!) {
    getAdBanner(id: $id) {
      id
      bannerKey
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listAdBanners = /* GraphQL */ `
  query ListAdBanners(
    $filter: ModelAdBannerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAdBanners(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        bannerKey
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getFaq = /* GraphQL */ `
  query GetFaq($id: ID!) {
    getFaq(id: $id) {
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
export const listFaqs = /* GraphQL */ `
  query ListFaqs(
    $filter: ModelFaqFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFaqs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        category
        question
        answer
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
