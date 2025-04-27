import ServiceCard from "@/components/ui/ServiceCard";
import Styles from "@/constants/Styles";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FlatList, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

const services = {
  1: [
    { id: 101, name: "General Checkup" },
    { id: 102, name: "Blood Test" },
    { id: 103, name: "X-Ray" },
  ],
  2: [
    { id: 201, name: "Cardiology Consultation" },
    { id: 202, name: "MRI Scan" },
  ],
  3: [
    { id: 301, name: "Dental Checkup" },
    { id: 302, name: "Eye Examination" },
  ],
};

export default function HospitalServices() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const router = useRouter();

  const serviceList = services[id as unknown as keyof typeof services] || [];

  const handleBook = (serviceId: number) => {
    router.push(`/book/${serviceId}`);
  };

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={Styles.containerContent}
      data={serviceList}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item: { id, name } }) => (
        <ServiceCard id={id} name={name} handleBook={handleBook} />
      )}
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
