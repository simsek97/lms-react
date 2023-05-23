/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context, callback) => {
  // Set the user pool autoConfirmUser flag after validating the email domain
  event.response.autoConfirmUser = true;
  event.response.autoVerifyEmail = true;

  // Return to Amazon Cognito
  callback(null, event);
};
