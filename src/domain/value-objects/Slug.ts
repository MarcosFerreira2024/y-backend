import { createSlug } from "../helper/createSlug";
import { validateWithRegex } from "../shared/regex_validation";
import Name from "./Name";

class Slug {
  private static readonly regex = /^@[a-zA-Z0-9_]+-[a-zA-Z0-9]+$/;
  private static readonly errorMessage = "Invalid slug";

  private readonly value: string;

  private constructor(name: Name, increment?: boolean) {
    const normalized = Slug.normalize(name.getName());
    const slug = createSlug(normalized, increment);
    Slug.validateData(slug);
    this.value = slug;
  }

  private static normalize(name: string): string {
    return name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/['’`´]/g, "");
  }

  getValue(): string {
    return this.value;
  }

  static create(name: Name, increment?: boolean): Slug {
    return new Slug(name, increment);
  }

  equals(other: Slug): boolean {
    return this.value === other.getValue();
  }

  private static validateData(slug: string): void {
    validateWithRegex(slug, Slug.regex, Slug.errorMessage);
  }
}

export default Slug;
