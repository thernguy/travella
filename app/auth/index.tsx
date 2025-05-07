import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Avatar, Button, Text, TextInput } from "react-native-paper";
import Styles from "@/constants/Styles";
import { useRouter } from "expo-router";
import PasswordInput from "@/components/ui/PasswordInput";
import { useLogin } from "@/hooks/useFirebase";

type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const navigate = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { login, loading } = useLogin();
  const onSubmit = (data: FormData) => {
    login(data.email, data.password)
      .then((res) => {
        navigate.replace("/tabs");
      })
      .catch((err) => {
        Alert.alert("Login failed", "Invalid email or password");
      });
  };

  const gotoRegister = () => {
    navigate.replace("/auth/register");
  };

  return (
    <ScrollView style={Styles.container}>
      <View style={styles.formContainer}>
        <Avatar.Icon
          size={64}
          icon="lock"
          style={{ alignSelf: "center", marginBottom: 20 }}
        />
        <Text style={Styles.text2xl}>Login</Text>
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
          <Text style={{ color: "red" }}>{errors.email.message}</Text>
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
          <Text style={{ color: "red" }}>{errors.password.message}</Text>
        )}
        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          loading={loading}
          disabled={loading}
        >
          Submit
        </Button>
        <Button mode="text" onPress={gotoRegister}>
          Don't have an account? Register
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
