import { validateWithRegex } from "../shared/regex_validation";

class Id {
  private static readonly cuidRegex = /^c[a-z0-9]{24}$/;

  private static readonly errorMessage = "Invalid Id";

  constructor(private id: string) {
    if (!id || id.trim() === "" || typeof id != "string")
      throw new Error(Id.errorMessage);
    this.id = Id.validateData(id);
  }

  getId(): string {
    return this.id.trim();
  }

  private static validateData(id: string): string {
    return validateWithRegex(id, Id.cuidRegex, Id.errorMessage);
  }
}

export default Id;
