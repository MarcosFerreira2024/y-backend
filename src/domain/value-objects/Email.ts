import { validateWithRegex } from "../shared/regex_validation";

class Email {
  private static readonly regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  private static readonly errorMessage = "Invalid Email";

  private constructor(private email: string) {
    this.email = Email.validateData(email);
  }

  static create(email: string): Email {
    if (!email || email.trim() === "" || typeof email != "string")
      throw new Error(Email.errorMessage);

    return new Email(email);
  }

  getEmail(): string {
    return this.email.trim();
  }

  equals(other: Email): boolean {
    return this.email === other.getEmail();
  }

  private static validateData(email: string): string {
    return validateWithRegex(email, Email.regex, Email.errorMessage);
  }
}

export default Email;
