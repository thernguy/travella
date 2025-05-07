import Styles from "@/constants/Styles";
import { useAppContext } from "@/context/AppContext";
import { useCreateLog } from "@/hooks/useFirebase";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function BookingList() {
  const { user } = useAppContext();

  const { loading } = useCreateLog(user?.uid);
  return (
    <View style={Styles.empty}>
      {/* <Spinner /> */}
      <Text variant="bodyLarge">Add your log here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
});
