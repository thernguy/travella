import { Timestamp } from "firebase/firestore";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Icon, Text } from "react-native-paper";

interface LogCardProps {
  id: string;
  location: string;
  notes: string;
  handleSelect: (id: string) => void;
  photos: string[];
  createdAt?: Timestamp;
}

const LogCard: FC<LogCardProps> = ({
  id,
  location,
  notes,
  handleSelect,
  photos,
  createdAt: firebaseTimestamp = Timestamp.now(),
}) => {
  const date = new Date(
    firebaseTimestamp.seconds * 1000 + firebaseTimestamp.nanoseconds / 1e6
  ).toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Card style={styles.card} onPress={() => handleSelect(id)}>
      <View
        style={{
          flexDirection: "row",
          gap: 8,
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <Icon source={"map-marker"} size={24} />
        <Text variant="titleLarge" style={{ textAlign: "center" }}>
          {location}
        </Text>
        <Text
          variant="bodyMedium"
          style={{ marginTop: 8, textAlign: "center", marginLeft: "auto" }}
        >
          {date}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 8,
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <Icon source={"microsoft-onenote"} size={24} />
        <Text variant="titleMedium" style={{ textAlign: "center" }}>
          {notes}
        </Text>
      </View>
      <Card.Content>
        {photos.length > 0 && (
          <View style={{ flexDirection: "row", gap: 8 }}>
            {photos.map((photo, index) => (
              <Card.Cover
                key={index}
                source={{ uri: photo }}
                style={{ width: "100%", height: 200 }}
              />
            ))}
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

export default LogCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 8,
  },
});
