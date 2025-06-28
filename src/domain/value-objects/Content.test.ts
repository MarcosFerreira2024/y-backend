import Content from "./Content";

describe("Content", () => {
  it("should create a valid content", () => {
    const content = Content.create("This is a valid content");
    expect(content).toBeInstanceOf(Content);
    expect(content.getContent()).toBe("This is a valid content");
  });

  it("should throw an error for content longer than 280 characters", () => {
    const longContent = "a".repeat(281);
    expect(() => Content.create(longContent)).toThrow("Invalid content");
  });

  it("should throw an error for content with newlines", () => {
    const contentWithNewline = "This content has a\nnewline";
    expect(() => Content.create(contentWithNewline)).toThrow("Invalid content");
  });

  it("should throw an error for empty content", () => {
    expect(() => Content.create("")).toThrow("Invalid content");
  });

  it("should throw an error for content with only spaces", () => {
    expect(() => Content.create("   ")).toThrow("Invalid content");
  });

  it("should throw an error for null content", () => {
    expect(() => Content.create(null as any)).toThrow("Invalid content");
  });

  it("should throw an error for undefined content", () => {
    expect(() => Content.create(undefined as any)).toThrow("Invalid content");
  });

  it("should correctly get the content", () => {
    const content = Content.create("Another valid content");
    expect(content.getContent()).toBe("Another valid content");
  });
});
