import { validateWithRegex } from "../shared/regex_validation";

class Name {
  private static readonly regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{2,50}$/;
  private static readonly errorMessage = "Invalid name";
  constructor(private name: string) {
    if (!name || name.trim() === "" || typeof name != "string")
      throw new Error(Name.errorMessage);
    this.name = Name.validateData(name);
  }

  getName(): string {
    return this.name.trim();
  }

  private static validateData(name: string): string {
    return validateWithRegex(name, Name.regex, Name.errorMessage);
  }
}

export default Name;
