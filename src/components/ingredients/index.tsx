import { useState } from "react";
import { ScrollView } from "react-native";

import Ingredient from "../ingredient";

import { styles } from "./styles";

export default function Ingredients() {
  const [selected, setSelected] = useState<string[]>([]);

  function handleToggleSelected(value: string) {
    if (selected.includes(value)) {
      return setSelected(prev => prev.filter(item => item !== value));
    }
    setSelected(prev => [...prev, value]);
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {Array.from({ length: 100 }).map((_, index) => (
        <Ingredient
          key={index}
          name="Banana"
          image=""
          selected={selected.includes(index.toString())}
          onPress={() => handleToggleSelected(index.toString())}
        />
      ))}
    </ScrollView>
  );
}
