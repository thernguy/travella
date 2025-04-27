import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { Text, Card, Button } from "react-native-paper";
import { useRouter } from "expo-router";
import Styles from "@/constants/Styles";
import HospitalCard from "@/components/ui/HospitalCard";

const hospitals = [
  { id: 1, name: "City Hospital", location: "Downtown" },
  { id: 2, name: "Green Valley Medical", location: "Uptown" },
  { id: 3, name: "Sunrise Clinic", location: "East Side" },
  { id: 4, name: "Riverbank Hospital", location: "West Side" },
  { id: 5, name: "Mountain View Health Center", location: "North End" },
  { id: 6, name: "Ocean Breeze Hospital", location: "South Shore" },
  { id: 7, name: "Maple Leaf Medical Center", location: "Central Park" },
  { id: 8, name: "Pine Hill Hospital", location: "Hilltop" },
];

export default function HospitalList() {
  const navigate = useRouter();

  const handleSelect = (hospitalId: number) => {
    navigate.push(`/hospitals/${hospitalId}`);
  };

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={Styles.containerContent}
      automaticallyAdjustContentInsets
      automaticallyAdjustKeyboardInsets
      data={hospitals}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <HospitalCard {...item} handleSelect={handleSelect} />
      )}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      ListEmptyComponent={() => (
        <View style={Styles.empty}>
          <Text variant="bodyLarge">No hospitals found.</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
