import { validateWithRegex } from "../shared/regex_validation";

class Id {
  private static readonly cuidRegex = /^c[a-z0-9]{24}$/;

  private static readonly errorMessage = "Invalid Id";

  private constructor(private id: string) {
    this.id = Id.validateData(id);
  }

  static create(id: string): Id {
    if (!id || id.trim() === "" || typeof id != "string")
      throw new Error(Id.errorMessage);
    return new Id(id);
  }

  getId(): string {
    return this.id.trim();
  }

  private static validateData(id: string): string {
    return validateWithRegex(id, Id.cuidRegex, Id.errorMessage);
  }
}

export default Id;
