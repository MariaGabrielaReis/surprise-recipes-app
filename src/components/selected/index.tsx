import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";

import { theme } from "@/theme";
import { styles } from "./styles";

export type SelectedProps = {
  quantity: number;
  onClear: () => void;
  onSearch: () => void;
};

export default function Selected({
  quantity,
  onClear,
  onSearch,
}: SelectedProps) {
  return (
    <Animated.View
      style={styles.container}
      entering={SlideInDown.duration(500)}
      exiting={SlideOutDown.duration(500)}
    >
      <View style={styles.header}>
        <Text style={styles.description}>
          {quantity} ingredientes selecionados
        </Text>
        <MaterialIcons
          name="close"
          onPress={onClear}
          size={24}
          color={theme.colors.gray_400}
        />
      </View>
    </Animated.View>
  );
}
