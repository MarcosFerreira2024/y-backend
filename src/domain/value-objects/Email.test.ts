import Email from "./Email";

describe("Email value object", () => {
  it("should create a valid Email", () => {
    const email = Email.create("john.doe@example.com");
    expect(email).toBeInstanceOf(Email);
    expect(email.getEmail()).toBe("john.doe@example.com");
  });

  it("should throw an error for an email without @", () => {
    expect(() => Email.create("john.doeexample.com")).toThrow("Invalid Email");
  });

  it("should throw an error for an email without a domain", () => {
    expect(() => Email.create("john.doe@")).toThrow("Invalid Email");
  });

  it("should throw an error for an email without a user", () => {
    expect(() => Email.create("@example.com")).toThrow("Invalid Email");
  });

  it("should throw an error for an empty email", () => {
    expect(() => Email.create("")).toThrow("Invalid Email");
  });

  it("should throw an error for an email with only spaces", () => {
    expect(() => Email.create("   ")).toThrow("Invalid Email");
  });
});