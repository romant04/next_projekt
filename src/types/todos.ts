import { Category } from "@prisma/client";

export interface TodoInput {
  name?: string;
  dueDate?: Date;
  category?: Category;
}
