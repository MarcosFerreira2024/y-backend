import { validateWithRegex } from "../shared/regex_validation";

class Content {
  static readonly regex = /^[^\r\n]{1,280}$/;
  static readonly errorMessage = "Invalid content";

  private constructor(private content: string) {
    this.content = Content.validate(content);
  }

  static create(content: string): Content {
    if (!content || content.trim() === "" || typeof content != "string")
      throw new Error(Content.errorMessage);

    return new Content(content);
  }

  static validate(content: string): string {
    return validateWithRegex(content, Content.regex, Content.errorMessage);
  }

  getContent(): string {
    return this.content;
  }
}

export default Content;
