import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";

interface Props {
  id: number;
  service_title: string;
  hospital_name: string;
  location: string;
  date: any;
  time: Date;
}

const BookingCard: FC<Props> = ({
  id,
  service_title,
  hospital_name,
  location,
  date,
  time,
}) => {
  return (
    <Card style={styles.card}>
      <Card.Title title={hospital_name} subtitle={location} />
      <Card.Content>
        <Text
          variant="headlineMedium"
          style={{
            textAlign: "center",
          }}
        >
          {service_title}
        </Text>
        <Text
          variant="titleLarge"
          style={{
            textAlign: "center",
          }}
        >
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}{" "}
          -{" "}
          {new Date(time).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </Card.Content>
    </Card>
  );
};

export default BookingCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 8,
  },
});
