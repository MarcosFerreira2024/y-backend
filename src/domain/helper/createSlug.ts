export function createSlug(name: string, increment?: boolean): string {
  let addition: string = "";
  if (increment === true) {
    addition = Math.floor(Math.random() * 100).toString(36);
  }

  const formattedName = name.toLowerCase().split(" ").join("_");
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 6);
  const created = `@${formattedName}-${timestamp}${random}${addition}`;
  return created;
}
