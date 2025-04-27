import { ActivityIndicator } from "react-native";
import { useTheme } from "react-native-paper";

const Spinner = () => {
  const theme = useTheme();
  return <ActivityIndicator size={"large"} color={theme.colors.primary} />;
};

export default Spinner;
