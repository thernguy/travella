import LogCard from "@/components/ui/HospitalCard";
import Spinner from "@/components/ui/Spinner";
import Styles from "@/constants/Styles";
import { useAppContext } from "@/context/AppContext";
import { useLogs } from "@/hooks/useDB";
import { useGetLogs } from "@/hooks/useFirebase";
import { useRouter } from "expo-router";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function Feed() {
  const navigate = useRouter();
  const handleSelect = (logId: string) => {
    navigate.push(`/logs/${logId}`);
  };
  const { user } = useAppContext();

  const { data, loading, fetch } = useGetLogs(user?.uid);

  if (loading) {
    return (
      <View style={Styles.empty}>
        <Spinner />
        <Text variant="bodyLarge">Fetching Logs...</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
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
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
});
