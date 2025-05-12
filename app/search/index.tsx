import Spinner from "@/components/ui/Spinner";
import Styles from "@/constants/Styles";
import { useAppContext } from "@/context/AppContext";
import { useGetUsers } from "@/hooks/useFirebase";
import { IUser } from "@/types/data";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Avatar, Card, Searchbar, Text, useTheme } from "react-native-paper";

interface UserCardProps extends IUser {
  handleSelect: (user: IUser) => void;
}

const UserCard = ({
  avatar,
  email,
  handleSelect,
  name,
  uid,
}: UserCardProps) => {
  const theme = useTheme();
  const LeftContent = (props: any) => <Avatar.Icon {...props} icon="account" />;
  const RightContent = (props: any) => (
    <Avatar.Icon
      {...props}
      icon="android-messages"
      size={40}
      color={theme.colors.primary}
      style={{
        backgroundColor: "transparent",
      }}
    />
  );

  return (
    <Card onPress={() => handleSelect({ avatar, email, name, uid })}>
      <Card.Title
        title={name}
        subtitle={email}
        left={LeftContent}
        right={RightContent}
        rightStyle={{
          backgroundColor: "transparent",
          marginRight: 8,
        }}
      />
    </Card>
  );
};
export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const { user } = useAppContext();
  const { data, loading, searchUsers } = useGetUsers(user?.uid);
  const navigation = useRouter();
  const handleSelect = (user: IUser) => {
    navigation.push({
      pathname: `/chat`,
      params: {
        user: JSON.stringify(user),
      },
    });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      await searchUsers(query);
    };
    fetchUsers();
  }, [query]);
  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Enter user name..."
        value={query}
        autoFocus
        onChangeText={setQuery}
      />
      <FlatList
        style={styles.flatListContainer}
        contentContainerStyle={Styles.containerContent}
        automaticallyAdjustContentInsets
        automaticallyAdjustKeyboardInsets
        data={data}
        keyExtractor={(item) => item.uid.toString()}
        renderItem={({ item }) => (
          <UserCard {...item} handleSelect={handleSelect} />
        )}
        initialNumToRender={8}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListEmptyComponent={() =>
          loading ? (
            <View style={Styles.empty}>
              <Spinner />
              <Text variant="bodyLarge">Fetching Users...</Text>
            </View>
          ) : (
            <View style={Styles.empty}>
              <Text variant="bodyLarge">No user found.</Text>
            </View>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  form: {
    gap: 12,
  },
  flatListContainer: {
    marginVertical: 12,
    paddingHorizontal: 2,
  },
});
