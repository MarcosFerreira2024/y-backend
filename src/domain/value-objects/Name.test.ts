import Name from "./Name";

describe("Name value object", () => {
  const error_message = /invalid name/i;

  it("Should create a Name VO", () => {
    const name = new Name("John Doe");

    expect(name).toBeInstanceOf(Name);
  });

  it("Should return a name", () => {
    const name = new Name("John Doe");

    expect(name.getName()).toBe("John Doe");
  });

  it("Should throw an error", () => {
    expect(() => new Name("")).toThrow(error_message);
    expect(() => new Name("John Doe 1234")).toThrow(error_message);
    expect(() => new Name(null as unknown as string)).toThrow(error_message);
    expect(() => new Name(undefined as unknown as string)).toThrow(
      error_message
    );
  });
});
