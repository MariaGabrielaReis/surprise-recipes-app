import * as ingredients from "./ingredients";
import * as preparations from "./preparations";
import * as recipes from "./recipes";

export const services = {
  recipes,
  ingredients,
  preparations,

  storage: {
    imagePath: process.env.EXPO_PUBLIC_SUPABASE_STORAGE_URL ?? "",
  },
};
