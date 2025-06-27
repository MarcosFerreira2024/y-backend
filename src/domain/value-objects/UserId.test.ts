import Id from "./UserId";

describe("Id value object", () => {
  const error_message = /invalid Id/i;
  const value = "ckj1x5xnz0000qzrm03duzv5y";

  it("Should create a Id VO", () => {
    const id = Id.create(value);

    expect(id).toBeInstanceOf(Id);
  });

  it("Should return a Id", () => {
    const id = Id.create(value);

    expect(id.getId()).toBe(value);
  });

  it("Should throw an error", () => {
    expect(() => Id.create("")).toThrow(error_message);
    expect(() => Id.create(null as unknown as string)).toThrow(error_message);
    expect(() => Id.create(undefined as unknown as string)).toThrow(
      error_message
    );
  });
});
