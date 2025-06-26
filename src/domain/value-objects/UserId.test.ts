import Id from "./UserId";

describe("Id value object", () => {
  const error_message = /invalid Id/i;
  const value = "ckj1x5xnz0000qzrm03duzv5y";

  it("Should create a Id VO", () => {
    const id = new Id(value);

    expect(id).toBeInstanceOf(Id);
  });

  it("Should return a Id", () => {
    const id = new Id(value);

    expect(id.getId()).toBe(value);
  });

  it("Should throw an error", () => {
    expect(() => new Id("")).toThrow(error_message);
    expect(() => new Id(null as unknown as string)).toThrow(error_message);
    expect(() => new Id(undefined as unknown as string)).toThrow(error_message);
  });
});
