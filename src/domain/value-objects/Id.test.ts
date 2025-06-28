import Id from "./Id";

describe("Id value object", () => {
  it("should create a valid Id", () => {
    const id = Id.create(1);
    expect(id).toBeInstanceOf(Id);
    expect(id.getId()).toBe(1);
  });

  it("should throw an error for zero", () => {
    expect(() => Id.create(0)).toThrow("Invalid Id");
  });

  it("should throw an error for a negative number", () => {
    expect(() => Id.create(-1)).toThrow("Invalid Id");
  });

  it("should throw an error for a non-numeric value", () => {
    expect(() => Id.create("a" as any)).toThrow("Invalid Id");
  });
});