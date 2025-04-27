import { FC } from "react";
import { StyleSheet } from "react-native";
import { Button, Card } from "react-native-paper";

interface HospitalCardProps {
  id: number;
  name: string;
  location: string;
  handleSelect: (id: number) => void;
}

const HospitalCard: FC<HospitalCardProps> = ({
  id,
  name,
  location,
  handleSelect,
}) => {
  return (
    <Card style={styles.card} onPress={() => handleSelect(id)}>
      <Card.Title title={name} subtitle={location} />
      <Card.Actions>
        <Button onPress={() => handleSelect(id)}>View Services</Button>
      </Card.Actions>
    </Card>
  );
};

export default HospitalCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
  },
});
