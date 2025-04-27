import ServiceCard from "@/components/ui/ServiceCard";
import Spinner from "@/components/ui/Spinner";
import Styles from "@/constants/Styles";
import { useServices } from "@/hooks/useDB";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FlatList, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function HospitalServices() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const router = useRouter();

  const handleBook = (serviceId: number) => {
    router.push(`/book/${serviceId}`);
  };
  const { services, loading, error } = useServices(Number(id));

  if (loading) {
    return (
      <View style={Styles.empty}>
        <Spinner />
        <Text variant="bodyLarge">Fetching Services...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={Styles.empty}>
        <Text variant="bodyLarge">Error: {error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={{
        paddingBottom: 120,
      }}
      data={services}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ServiceCard service={item} handleBook={handleBook} />
      )}
      initialNumToRender={8}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      ListEmptyComponent={() => (
        <View style={Styles.empty}>
          <Text variant="bodyLarge">No services found.</Text>
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
