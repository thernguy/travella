// app/book/[id].tsx
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Text, TextInput, Button } from "react-native-paper";
import Styles from "@/constants/Styles";

type BookingFormData = {
  name: string;
  date: string;
  notes: string;
};

const serviceNames: Record<number, string> = {
  101: "General Checkup",
  102: "Blood Test",
  103: "X-Ray",
  201: "Cardiology Consultation",
  202: "MRI Scan",
  301: "Dental Checkup",
  302: "Eye Examination",
};

export default function BookService() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormData>({
    defaultValues: {
      name: "",
      date: "",
      notes: "",
    },
  });

  const onSubmit = (data: BookingFormData) => {
    console.log({
      serviceId: id,
      serviceName: serviceNames[parseInt(id ?? "0")],
      ...data,
    });
    // router.replace("/success"); // Later we can create a success screen
  };

  const serviceName = serviceNames[parseInt(id ?? "0")] || "Service";

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={Styles.containerContent}
      automaticallyAdjustContentInsets
      automaticallyAdjustKeyboardInsets
    >
      <View style={styles.form}>
        <Text variant="titleLarge">{serviceName}</Text>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Your Name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.name}
              mode="outlined"
              dense
            />
          )}
          name="name"
        />

        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Preferred Date (YYYY-MM-DD)"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.date}
              mode="outlined"
            />
          )}
          name="date"
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Notes (optional)"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              multiline
              numberOfLines={4}
              mode="outlined"
              dense
            />
          )}
          name="notes"
        />

        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          style={{ marginTop: 20 }}
        >
          Confirm Booking
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  form: {
    gap: 12,
  },
});
