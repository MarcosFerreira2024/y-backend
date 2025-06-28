import { validateWithRegex } from "../shared/regex_validation";

class Id {
  private static readonly regex = /^[1-9][0-9]*$/;

  private static readonly errorMessage = "Invalid Id";

  private constructor(private id: number) {
    this.id = Id.validateData(id);
  }

  static create(id: number): Id {
    if (!id || typeof id != "number" || id < 0)
      throw new Error(Id.errorMessage);
    return new Id(id);
  }

  getId(): number {
    return this.id;
  }

  private static validateData(id: number): number {
    return +validateWithRegex(id.toString(), Id.regex, Id.errorMessage);
  }
}

export default Id;
