import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { FlatList, Text, View } from "react-native";

import { Recipe } from "@/components/recipe";

import Ingredients from "@/components/ingredients";
import { styles } from "./styles";

export default function Recipes() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons
          name="arrow-back"
          size={32}
          onPress={() => router.back()}
        />
        <Text style={styles.title}>Ingredientes</Text>

        <Ingredients />
      </View>

      <FlatList
        data={["1"]}
        keyExtractor={item => item}
        renderItem={() => (
          <Recipe recipe={{ name: "Omelete", image: "", minutes: 15 }} />
        )}
      />
    </View>
  );
}
