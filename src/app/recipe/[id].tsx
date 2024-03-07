import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";

import { Ingredients } from "@/components/ingredients";
import { Loading } from "@/components/loading";
import { Step } from "@/components/step";
import { services } from "@/services";

import { styles } from "./styles";

export default function Recipes() {
  const [isLoading, setIsLoading] = useState(true);
  const [recipe, setRecipe] = useState<RecipeResponse | null>(null);
  const [ingredients, setIngredients] = useState<IngredientResponse[]>([]);
  const [preparations, setPreparations] = useState<PreparationResponse[]>([]);

  const { id } = useLocalSearchParams<{ id: string }>();

  useEffect(() => {
    services.recipes
      .show(id)
      .then(setRecipe)
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    services.ingredients.findByRecipeId(id).then(setIngredients);
  }, []);

  useEffect(() => {
    services.preparations
      .findByRecipeId(id)
      .then(response => setPreparations(response));
  }, []);

  if (isLoading) return <Loading />;
  if (!id || !recipe) return <Redirect href="/" />;

  return (
    <View style={styles.container}>
      <Image source={{ uri: recipe.image }} style={styles.image} />

      <View style={styles.body}>
        <View style={styles.header}>
          <MaterialIcons
            size={32}
            name="arrow-back"
            onPress={() => router.back()}
          />

          <Text style={styles.name}>{recipe.name}</Text>
          <Text style={styles.time}>{recipe.minutes} minutos de preparo</Text>
        </View>

        <View style={{ paddingHorizontal: 32 }}>
          <Ingredients ingredients={ingredients} />
        </View>

        <View style={styles.content}>
          <Text style={styles.preparation}>Modo de preparo</Text>

          <FlatList
            data={preparations}
            renderItem={({ item }) => (
              <Step step={item.step} description={item.description} />
            )}
            contentContainerStyle={{ gap: 16 }}
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
          />
        </View>
      </View>
    </View>
  );
}
