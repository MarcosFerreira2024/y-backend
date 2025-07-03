import { validateWithRegex } from "../shared/regex_validation";

class Name {
  private static readonly regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{2,50}$/;
  private static readonly errorMessage = "Invalid name";
  private constructor(private name: string) {
    this.name = Name.validateData(name);
  }

  getName(): string {
    return this.name.trim();
  }

  static create(name: string): Name {
    if (!name || name.trim() === "" || typeof name != "string")
      throw new Error(Name.errorMessage);
    return new Name(name);
  }

  equals(other: Name): boolean {
    return this.name === other.getName();
  }

  static formatter(name: string): string {
    if (name.split(" ").length >= 1) {
      let [firstname, secondname] = name.split(" ");

      firstname = firstname.trim().charAt(0).toUpperCase() + firstname.slice(1);
      secondname =
        secondname.trim().charAt(0).toUpperCase() + secondname.slice(1);

      if (firstname.length + secondname.length > 30) return `${firstname}`;
      return `${firstname} ${secondname}.`;
    }

    return name.trim().charAt(0).toUpperCase() + name.slice(1);
  }

  private static validateData(name: string): string {
    return validateWithRegex(name, Name.regex, Name.errorMessage);
  }
}

export default Name;
