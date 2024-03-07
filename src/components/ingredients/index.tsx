import { router } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView } from "react-native";

import { services } from "@/services";
import Ingredient from "../ingredient";
import Selected from "../selected";

import { styles } from "./styles";

type Props = { ingredients: IngredientResponse[]; isHome?: boolean };

export function Ingredients({ ingredients, isHome }: Props) {
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
    router.navigate("/recipes/" + selected);
  }

  return (
    <>
      <ScrollView
        style={[styles.container, isHome && { flex: 1 }]}
        contentContainerStyle={[
          styles.ingredientsContent,
          isHome && { paddingBottom: 200 },
        ]}
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
