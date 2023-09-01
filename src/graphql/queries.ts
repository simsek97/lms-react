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
      __typename
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
        __typename
      }
      nextToken
      __typename
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
        __typename
      }
      createdAt
      updatedAt
      __typename
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
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
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
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
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
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
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
      __typename
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
        __typename
      }
      nextToken
      __typename
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
      __typename
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
        __typename
      }
      nextToken
      __typename
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
      __typename
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
        __typename
      }
      nextToken
      __typename
    }
  }
`;
