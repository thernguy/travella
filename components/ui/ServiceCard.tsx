import { Service } from "@/types/data";
import { FC } from "react";
import { StyleSheet } from "react-native";
import { Button, Card, Text } from "react-native-paper";

interface ServiceCardProps {
  service: Service;
  handleBook: (id: number) => void;
}

const ServiceCard: FC<ServiceCardProps> = ({ service, handleBook }) => {
  const { id, title, price, description } = service;
  return (
    <Card style={styles.card}>
      <Card.Title titleVariant="titleMedium" subtitleVariant="labelLarge" title={title} subtitle={description} />
      <Card.Content>
        <Text variant="titleLarge" style={styles.price}>
          {price} BDT
        </Text>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => handleBook(id)}>Book Now</Button>
      </Card.Actions>
    </Card>
  );
};

export default ServiceCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  price: {
    textAlign: "center",
  },
});
