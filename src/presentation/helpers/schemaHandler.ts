import { ZodSchema } from "zod";

export function zodSchemaHandler(schema: ZodSchema, data: unknown) {
  const validation = schema.safeParse(data);

  if (validation.error)
    throw new Error(
      `${validation.error?.errors[0].path}: ${validation.error?.errors[0].message}`
    );

  return validation.data;
}
