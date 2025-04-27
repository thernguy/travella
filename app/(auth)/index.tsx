import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Avatar, Button, Text, TextInput } from "react-native-paper";
import Styles from "@/constants/Styles";
import { useRouter } from "expo-router";
import PasswordInput from "@/components/ui/PasswordInput";

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
  const onSubmit = (data: FormData) => console.log(data);

  const gotoRegister = () => {
    navigate.replace("/register");
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
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Email"
              mode="outlined"
              dense
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.email}
            />
          )}
          name="email"
        />
        {errors.email && (
          <Text style={{ color: "red" }}>Email is required.</Text>
        )}

        <Controller
          control={control}
          rules={{
            required: true,
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
          <Text style={{ color: "red" }}>Password is required.</Text>
        )}
        <Button mode="contained" onPress={handleSubmit(onSubmit)}>
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
