import Email from "./Email";

describe("Email value object", () => {
  const error_message = /invalid Email/i;

  it("Should create a Email VO", () => {
    const email = Email.create("John@doe.com");

    expect(email).toBeInstanceOf(Email);
  });

  it("Should return a Email", () => {
    const email = Email.create("John@doe.com");

    expect(email.getEmail()).toBe("John@doe.com");
  });

  it("Should throw an error", () => {
    expect(() => Email.create("")).toThrow(error_message);
    expect(() => Email.create("John Doe 1234")).toThrow(error_message);
  });
});
