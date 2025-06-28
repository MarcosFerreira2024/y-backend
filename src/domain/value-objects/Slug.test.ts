import Name from "./Name";
import Slug from "./Slug";

describe("Slug value object", () => {
  let name: Name;
  beforeEach(() => {
    name = Name.create("John Doe");
  });

  it("should create a incremented slug", () => {
    const slug = Slug.create(name, true);
    expect(slug).toBeInstanceOf(Slug);
    expect(slug.getValue()).toMatch(/^@[a-zA-Z0-9_]+-[a-zA-Z0-9]+$/);
  });
  it("should create a slug", () => {
    const slug = Slug.create(name);
    expect(slug).toBeInstanceOf(Slug);
    expect(slug.getValue()).toMatch(/^@[a-zA-Z0-9_]+-[a-zA-Z0-9]+$/);
  });
});
