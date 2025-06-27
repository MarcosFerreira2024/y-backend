import Name from "./Name";

describe("Name value object", () => {
  const error_message = /invalid name/i;

  it("Should create a Name VO", () => {
    const name = Name.create("John Doe");

    expect(name).toBeInstanceOf(Name);
  });

  it("Should return a name", () => {
    const name = Name.create("John Doe");

    expect(name.getName()).toBe("John Doe");
  });

  it("Should throw an error", () => {
    expect(() => Name.create("")).toThrow(error_message);
    expect(() => Name.create("John Doe 1234")).toThrow(error_message);
  });
});
