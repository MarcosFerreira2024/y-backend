export function createSlug(name: string, increment?: boolean): string {
  let addition: string = "";
  if (increment === true) {
    addition = Math.floor(Math.random() * 100).toString(36);
  }

  const formattedName = name.toLowerCase().split(" ").join("_");
  const random = Math.random().toString(36).substring(2, 10);
  const created = `@${formattedName}-${random}${addition}`;
  return created;
}
