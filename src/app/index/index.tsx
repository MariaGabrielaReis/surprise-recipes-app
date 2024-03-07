import { useEffect, useState } from "react";
import { Text, View } from "react-native";

import { Ingredients } from "@/components/ingredients";
import { services } from "@/services";

import { styles } from "./styles";

export default function Index() {
  const [ingredients, setIngredients] = useState<IngredientResponse[]>([]);

  useEffect(() => {
    services.ingredients.findAll().then(setIngredients);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Escolha {"\n"}
        <Text style={styles.subtitle}>os produtos</Text>
      </Text>
      <Text style={styles.message}>
        Descubra receitas baseadas nos produtos que você escolheu
      </Text>

      <Ingredients ingredients={ingredients} />
    </View>
  );
}
