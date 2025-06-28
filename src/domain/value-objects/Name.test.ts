import Name from "./Name";

describe("Name value object", () => {
  it("should create a valid Name", () => {
    const name = Name.create("John Doe");
    expect(name).toBeInstanceOf(Name);
    expect(name.getName()).toBe("John Doe");
  });

  it("should throw an error for a name with numbers", () => {
    expect(() => Name.create("John Doe 123")).toThrow("Invalid name");
  });

  it("should throw an error for a name with less than 2 characters", () => {
    expect(() => Name.create("J")).toThrow("Invalid name");
  });

  it("should throw an error for a name with more than 50 characters", () => {
    const longName = "a".repeat(51);
    expect(() => Name.create(longName)).toThrow("Invalid name");
  });

  it("should throw an error for an empty name", () => {
    expect(() => Name.create("")).toThrow("Invalid name");
  });

  it("should throw an error for a name with only spaces", () => {
    expect(() => Name.create("   ")).toThrow("Invalid name");
  });
});