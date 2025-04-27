import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Text, TextInput, Button } from "react-native-paper";
import Styles from "@/constants/Styles";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { useCreateBooking, useService } from "@/hooks/useDB";

type BookingFormData = {
  name: string;
  date: Date;
  time: Date;
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
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const { service } = useService(Number(id));
  const { create, loading, error } = useCreateBooking();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormData>({
    defaultValues: {
      name: "",
      date: new Date(),
      notes: "",
      time: new Date(),
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    const { date, time, notes } = data;
    const userId = 1; // Replace with actual user ID
    const serviceId = Number(id); // Replace with actual service ID
    create(userId, serviceId, date, time, notes)
      .then(() => {
        console.log("Booking created successfully");
      })
      .catch((error) => {
        console.error("Error creating booking:", error);
      });

    // router.replace("/success"); // Later we can create a success screen
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={Styles.containerContent}
      automaticallyAdjustContentInsets
      automaticallyAdjustKeyboardInsets
    >
      <View style={styles.form}>
        <Text variant="titleLarge">{service?.title}</Text>
        <Text variant="bodyLarge">{service?.description}</Text>
        <Text variant="titleLarge" style={{ textAlign: "center" }}>
          {service?.price} BDT
        </Text>
        <Text variant="bodyLarge" style={{ textAlign: "center" }}>
          {service?.hospital_name}
        </Text>
        <Text variant="titleMedium" style={{ textAlign: "center" }}>
          {service?.hospital_location}
        </Text>

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
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                label="Date"
                onPress={() => setShowDatePicker(true)}
                error={!!errors.date}
                value={value.toLocaleDateString()}
                mode="outlined"
                dense
              />
              {showDatePicker && (
                <RNDateTimePicker
                  value={value}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    const currentDate = selectedDate || value;
                    onChange(currentDate);
                    setShowDatePicker(false);
                  }}
                  onTouchCancel={() => setShowDatePicker(false)}
                  onTouchEnd={() => setShowDatePicker(false)}
                />
              )}
            </>
          )}
          name="date"
        />
        {errors.date && (
          <Text variant="bodySmall" style={{ color: "red" }}>
            Date is required
          </Text>
        )}

        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                label="Time"
                onPress={() => setShowTimePicker(true)}
                value={value.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                error={!!errors.date}
                mode="outlined"
                dense
              />
              {showTimePicker && (
                <RNDateTimePicker
                  value={value}
                  mode="time"
                  display="clock"
                  onChange={(event, selectedTime) => {
                    const time = selectedTime;
                    onChange(time);
                    setShowTimePicker(false);
                  }}
                  onTouchCancel={() => setShowTimePicker(false)}
                />
              )}
            </>
          )}
          name="time"
        />
        {errors.time && (
          <Text variant="bodySmall" style={{ color: "red" }}>
            Time is required
          </Text>
        )}
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
