import HospitalCard from "@/components/ui/HospitalCard";
import Spinner from "@/components/ui/Spinner";
import Styles from "@/constants/Styles";
import { useHospitals } from "@/hooks/useDB";
import { useRouter } from "expo-router";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function HospitalList() {
  const navigate = useRouter();
  const handleSelect = (hospitalId: number) => {
    navigate.push(`/hospitals/${hospitalId}`);
  };

  const { hospitals, loading, fetch } = useHospitals();
  
  if (loading) {
    return (
      <View style={Styles.empty}>
        <Spinner />
        <Text variant="bodyLarge">Fetching Hospitals...</Text>
      </View>
    );
  }

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
      initialNumToRender={8}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      ListEmptyComponent={() => (
        <View style={Styles.empty}>
          <Text variant="bodyLarge">No hospitals found.</Text>
        </View>
      )}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={fetch}
          tintColor="#6200ee"
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
});
