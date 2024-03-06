import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView } from "react-native";

import { services } from "@/services";

import Ingredient from "../ingredient";
import Selected from "../selected";

import { styles } from "./styles";

export default function Ingredients() {
  const [selected, setSelected] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<IngredientResponse[]>([]);

  useEffect(() => {
    services.ingredients.findAll().then(setIngredients);
  }, []);

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
        {ingredients.map(item => (
          <Ingredient
            key={item.id}
            name={item.name}
            image={`${services.storage.imagePath}/${item.image}`}
            selected={selected.includes(item.id.toString())}
            onPress={() => handleToggleSelected(item.id.toString())}
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
