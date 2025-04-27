import Styles from "@/constants/Styles";
import { useAuth } from "@/hooks/useContext";
import { useCreateBooking, useService } from "@/hooks/useDB";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

type BookingFormData = {
  date: Date;
  time: Date;
  notes: string;
};

export default function BookService() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useAuth();
  const router = useRouter();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const { service } = useService(Number(id));
  const { create, loading } = useCreateBooking();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormData>({
    defaultValues: {
      date: new Date(),
      notes: "",
      time: new Date(),
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    const { date, time, notes } = data;
    const userId = user?.id;
    if (!userId) {
      Alert.alert("Error", "User not found. Please log in again.", [
        { text: "OK", onPress: () => router.replace("/auth") },
      ]);
      return;
    }
    const serviceId = Number(id);
    create(userId, serviceId, date, time, notes).then((res) => {
      if (res) {
        Alert.alert(
          "Booking Confirmed",
          `Your appoinment was confirmed for: ${service?.title}`,
          [{ text: "OK", onPress: () => router.replace("/tabs/bookings") }]
        );
      } else {
        Alert.alert("Error", "Failed to create booking");
      }
    }).catch((err) => {
      console.error(err);
      Alert.alert("Error", "Failed to create booking");
    }
    );
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
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                label="Date"
                onPress={() => setShowDatePicker(true)}
                error={!!errors.date}
                value={value?.toLocaleDateString()}
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
          loading={loading}
          disabled={loading}
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
