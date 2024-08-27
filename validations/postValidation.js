import vine from "@vinejs/vine";
import { CustomErrorReporter } from "./customeErrorRepoter.js";
vine.errorReporter = () => new CustomErrorReporter();

export const postSchema = vine.object({
    title: vine.string().minLength(10).maxLength(200),
    description: vine.string().minLength(10).maxLength(1000)
  });

