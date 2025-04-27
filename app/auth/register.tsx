import PasswordInput from "@/components/ui/PasswordInput";
import Styles from "@/constants/Styles";
import { useAuth } from "@/hooks/useContext";
import { useRegister } from "@/hooks/useDB";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";
import { Avatar, Button, Text, TextInput } from "react-native-paper";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const navigate = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const { register, loading } = useRegister();
  const { login } = useAuth();

  const onSubmit = (data: FormData) => {
    register(data.email, data.password, `${data.firstName} ${data.lastName}`)
      .then((res) => {
        login(res);
        navigate.replace("/tabs");
      })
  };

  const gotoLogin = () => {
    navigate.replace("/auth");
  };

  return (
    <ScrollView
      style={Styles.container}
      contentContainerStyle={Styles.containerContent}
    >
      <View style={styles.formContainer}>
        <Avatar.Icon
          size={64}
          icon="lock"
          style={{ alignSelf: "center", marginBottom: 20 }}
        />

        <Text style={Styles.text2xl}>Register</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label={"First name"}
              mode="outlined"
              dense
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.firstName}
            />
          )}
          name="firstName"
        />
        {errors.firstName && (
          <Text style={{ color: "red" }}>First name is required.</Text>
        )}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label={"Last name"}
              mode="outlined"
              dense
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.lastName}
            />
          )}
          name="lastName"
        />
        {errors.lastName && (
          <Text style={{ color: "red" }}>Last name is required.</Text>
        )}
        <Controller
          control={control}
          rules={{
            required: true,
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Email"
              mode="outlined"
              dense
              keyboardType="email-address"
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.email}
            />
          )}
          name="email"
        />
        {errors.email && (
          <Text style={{ color: "red" }}>
            {errors.email.message || "Email is required."}
          </Text>
        )}
        <Controller
          control={control}
          rules={{
            required: true,
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <PasswordInput
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              errors={errors}
            />
          )}
          name="password"
        />
        {errors.password && (
          <Text style={{ color: "red" }}>
            {errors.password.message || "Password is required."}
          </Text>
        )}
        <Controller
          control={control}
          rules={{
            required: true,
            validate: (value) =>
              value === getValues("password") || "Passwords do not match",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <PasswordInput
              label="Confirm Password"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              errors={errors}
            />
          )}
          name="confirmPassword"
        />
        {errors.confirmPassword && (
          <Text style={{ color: "red" }}>{errors.confirmPassword.message}</Text>
        )}

        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          loading={loading}
          disabled={loading}
        >
          Submit
        </Button>
        <Button mode="text" onPress={gotoLogin}>
          Already have an account? Login
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
