export function validateWithRegex(
  data: string,
  regex: RegExp,
  error_message: string
): string {
  if (data === null || data === undefined || data === "")
    throw new Error("Data is empty");

  const isValid = regex.test(data);

  if (!isValid) throw new Error(error_message);

  return data;
}
