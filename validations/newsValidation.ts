import vine from "@vinejs/vine";
import { CustomErrorReporter } from "./customErrorReporter.ts";

vine.errorReporter = () => new CustomErrorReporter();

export const newsSchema = vine.object({
  title: vine.string().minLength(3).maxLength(255),
  content: vine.string().minLength(3),
//   image: vine.string().minLength(3).maxLength(100),
});
