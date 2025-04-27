import { FC } from "react";
import { StyleSheet } from "react-native";
import { Button, Card } from "react-native-paper";

interface ServiceCardProps {
  id: number;
  name: string;
  handleBook: (id: number) => void;
}

const ServiceCard: FC<ServiceCardProps> = ({ id, name, handleBook }) => {
  return (
    <Card style={styles.card}>
      <Card.Title title={name} />
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
});
