import LogCard from "@/components/ui/LogCard";
import Spinner from "@/components/ui/Spinner";
import Styles from "@/constants/Styles";
import { useAppContext } from "@/context/AppContext";
import { useGetLogs } from "@/hooks/useFirebase";
import { useRouter } from "expo-router";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Searchbar, Text } from "react-native-paper";

export default function Feed() {
  const navigate = useRouter();
  const handleSelect = (logId: string) => {
    // navigate.push(`/logs/${logId}`);
  };
  const { user } = useAppContext();

  const { data, loading, fetch } = useGetLogs(user?.uid);
  const onSearchPress = () => {
    navigate.push("/search");
  };
  if (loading) {
    return (
      <View style={Styles.empty}>
        <Spinner />
        <Text variant="bodyLarge">Fetching Logs...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onSearchPress} activeOpacity={0.8}>
        <Searchbar placeholder="Search User..." value="" pointerEvents="none" />
      </TouchableOpacity>
      <FlatList
        style={styles.flatListContainer}
        contentContainerStyle={Styles.containerContent}
        automaticallyAdjustContentInsets
        automaticallyAdjustKeyboardInsets
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <LogCard {...item} handleSelect={handleSelect} />
        )}
        initialNumToRender={8}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListEmptyComponent={() =>
          loading ? (
            <View style={Styles.empty}>
              <Spinner />
              <Text variant="bodyLarge">Fetching Logs...</Text>
            </View>
          ) : (
            <View style={Styles.empty}>
              <Text variant="bodyLarge">No log found.</Text>
            </View>
          )
        }
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={fetch}
            tintColor="#6200ee"
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  flatListContainer: {
    marginVertical: 16,
  },
});
