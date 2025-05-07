import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card } from "react-native-paper";

interface HospitalCardProps {
  id: string;
  name: string;
  location: string;
  handleSelect: (id: string) => void;
}

const LogCard: FC<HospitalCardProps> = ({
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

export default LogCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
  },
});
