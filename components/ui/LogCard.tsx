import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card } from "react-native-paper";

interface LogCardProps {
  id: string;
  location: string;
  notes: string;

  handleSelect: (id: string) => void;
}

const LogCard: FC<LogCardProps> = ({
  id,
  location,
  notes,
  handleSelect,
}) => {
  return (
    <Card style={styles.card} onPress={() => handleSelect(id)}>
      <View>
        <Card.Title title={location} subtitle={notes} />
      </View>
      <Card.Actions>
        
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
