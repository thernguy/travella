import Styles from "@/constants/Styles";
import { useAppContext } from "@/context/AppContext";
import { useCreateLog } from "@/hooks/useFirebase";
import { LogFormData } from "@/types/data";
import { Controller, useForm } from "react-hook-form";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { Avatar, Button, Text, TextInput } from "react-native-paper";

export default function AddLog() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LogFormData>({
    defaultValues: {
      location: "",
      notes: "",
    },
  });

  const { user } = useAppContext();
  const { create, loading } = useCreateLog();

  const onSubmit = async (data: LogFormData) => {
    if (!user) return Alert.alert("Error", "User not logged in");

    try {
      await create({
        location: data.location,
        notes: data.notes,
      });
      Alert.alert("Success", "Log added!");
      reset();
    } catch (err: any) {
      Alert.alert("Error", err.message || "Failed to add log");
    }
  };

  return (
    <ScrollView
      style={Styles.container}
      contentContainerStyle={Styles.containerContent}
    >
      <View style={styles.formContainer}>
        <Avatar.Icon
          size={64}
          icon="map"
          style={{ alignSelf: "center", marginBottom: 20 }}
        />

        <Text style={Styles.text2xl}>Add Travel Log</Text>

        <Controller
          control={control}
          name="location"
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Location"
              mode="outlined"
              dense
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.location}
            />
          )}
        />
        {errors.location && (
          <Text style={{ color: "red" }}>Location is required.</Text>
        )}

        <Controller
          control={control}
          name="notes"
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Notes"
              mode="outlined"
              dense
              multiline
              numberOfLines={5}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.notes}
            />
          )}
        />
        {errors.notes && (
          <Text style={{ color: "red" }}>Notes are required.</Text>
        )}

        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          loading={loading}
          disabled={loading}
        >
          Save Log
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    gap: 16,
  },
});
