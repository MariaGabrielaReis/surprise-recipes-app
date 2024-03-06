import * as ingredients from "./ingredients";

export const services = {
  ingredients,
  storage: {
    imagePath: process.env.EXPO_PUBLIC_SUPABASE_STORAGE_URL ?? "",
  },
};
