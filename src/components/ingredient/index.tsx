import { Image, Pressable, PressableProps, Text } from "react-native";

import { theme } from "@/theme";
import { styles } from "./styles";

export type IngredientProps = PressableProps & {
  name: string;
  image: string;
  selected?: boolean;
};

export default function Ingredient({
  name,
  image,
  selected = false,
  ...rest
}: IngredientProps) {
  return (
    <Pressable
      style={[styles.container, selected && styles.selected]}
      {...rest}
    >
      <Image style={styles.image} source={{ uri: image }} />
      <Text
        style={[styles.title, selected && { color: theme.colors.green_600 }]}
      >
        {name}
      </Text>
    </Pressable>
  );
}
