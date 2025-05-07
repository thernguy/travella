import BookingCard from "@/components/ui/BookingCard";
import Spinner from "@/components/ui/Spinner";
import Styles from "@/constants/Styles";
import { useAuth } from "@/context/AppContext";
import { useBookings } from "@/hooks/useDB";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function BookingList() {
  const { user } = useAuth();

  const { bookings, loading } = useBookings(user?.uid);

  if (loading) {
    return ( 
      <View style={Styles.empty}>
        <Spinner />
        <Text variant="bodyLarge">Fetching Booking...</Text>
      </View>
    );
  }
  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={Styles.containerContent}
      automaticallyAdjustContentInsets
      automaticallyAdjustKeyboardInsets
      data={bookings}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <BookingCard {...item} />}
      initialNumToRender={8}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      ListEmptyComponent={() => (
        <View style={Styles.empty}>
          <Text variant="bodyLarge">No bookings found.</Text>
        </View>
      )}
      refreshControl={
        <RefreshControl refreshing={loading} tintColor="#6200ee" />
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
