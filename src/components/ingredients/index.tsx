import { useState } from "react";
import { Alert, ScrollView } from "react-native";

import Ingredient from "../ingredient";
import Selected from "../selected";

import { router } from "expo-router";
import { styles } from "./styles";

export default function Ingredients() {
  const [selected, setSelected] = useState<string[]>([]);

  function handleToggleSelected(value: string) {
    if (selected.includes(value)) {
      return setSelected(prev => prev.filter(item => item !== value));
    }
    setSelected(prev => [...prev, value]);
  }

  function handleClearSelected() {
    Alert.alert("Limpar", "Deseja limpar tudo?", [
      { text: "Não", style: "cancel" },
      { text: "Sim", onPress: () => setSelected([]) },
    ]);
  }

  function handleSearch() {
    router.navigate("/recipes/");
  }

  return (
    <>
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

      {selected.length > 0 && (
        <Selected
          quantity={selected.length}
          onClear={handleClearSelected}
          onSearch={handleSearch}
        />
      )}
    </>
  );
}
