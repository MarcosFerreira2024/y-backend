import { validateWithRegex } from "../shared/regex_validation";

class Email {
  private static readonly regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  private static readonly errorMessage = "Invalid Email";

  constructor(private email: string) {
    if (!email || email.trim() === "" || typeof email != "string")
      throw new Error(Email.errorMessage);
    this.email = Email.validateData(email);
  }

  getEmail(): string {
    return this.email.trim();
  }

  private static validateData(email: string): string {
    return validateWithRegex(email, Email.regex, Email.errorMessage);
  }
}

export default Email;
