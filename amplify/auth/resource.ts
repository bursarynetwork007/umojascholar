import { defineAuth } from "@aws-amplify/backend";

/**
 * Cognito User Pool for UmojaScholar.
 * - Email + password login
 * - Email verification on signup
 * - Free tier: 50,000 MAU
 */
export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailStyle: "CODE",
      verificationEmailSubject: "Verify your UmojaScholar account",
      verificationEmailBody: (createCode) =>
        `Your UmojaScholar verification code is: ${createCode()}`,
    },
  },
  userAttributes: {
    givenName:  { required: true,  mutable: true },
    familyName: { required: false, mutable: true },
    phoneNumber:{ required: false, mutable: true },
    // Custom attribute for country of origin
    "custom:country": { dataType: "String", mutable: true },
  },
  multifactor: {
    mode: "OPTIONAL",
    totp: true,
  },
  accountRecovery: "EMAIL_ONLY",
  groups: ["students", "admins"],
});
