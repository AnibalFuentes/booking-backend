import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";

const lambdaClient = new LambdaClient({
  region: process.env.AWS_REGION || "us-east-1",
});

export const invokeLambda = async (payload: object): Promise<void> => {
  const command = new InvokeCommand({
    FunctionName: process.env.LAMBDA_FUNCTION_NAME || "booking-email-sender",
    InvocationType: "Event", // async, no bloquea la respuesta
    Payload: Buffer.from(JSON.stringify(payload)),
  });

  try {
    await lambdaClient.send(command);
    console.log("Lambda invoked successfully");
  } catch (error) {
    console.error("Failed to invoke Lambda:", error);
  }
};