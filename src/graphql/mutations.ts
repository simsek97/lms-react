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
      __typename
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
      __typename
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
      __typename
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
        __typename
      }
      createdAt
      updatedAt
      __typename
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
        __typename
      }
      createdAt
      updatedAt
      __typename
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
        __typename
      }
      createdAt
      updatedAt
      __typename
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
      __typename
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
      __typename
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
      __typename
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
      __typename
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
      __typename
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
      __typename
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
      __typename
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
      __typename
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
      __typename
    }
  }
`;
