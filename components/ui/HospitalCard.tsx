import { FC } from "react";
import { StyleSheet, View } from "react-native";
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
      <View>
        <Card.Title title={name} subtitle={location} />
      </View>
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
