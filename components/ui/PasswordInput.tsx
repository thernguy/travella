import { FC, useState } from "react";
import { TextInput } from "react-native-paper";

interface PasswordInputProps {
  label?: string;
  onBlur: () => void;
  onChange: (text: string) => void;
  value: string;
  errors: any;
}

const PasswordInput: FC<PasswordInputProps> = ({
  label = "Password",
  onBlur,
  onChange,
  value,
  errors,
}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const toggleSecureTextEntry = () => {
    setSecureTextEntry((prev) => !prev);
  };
  return (
    <TextInput
      label={label}
      mode="outlined"
      dense
      onBlur={onBlur}
      onChangeText={onChange}
      value={value}
      secureTextEntry={secureTextEntry}
      error={!!errors.confirmPassword}
      right={
        <TextInput.Icon
          icon={secureTextEntry ? "eye-off" : "eye"}
          onPress={toggleSecureTextEntry}
        />
      }
    />
  );
};

export default PasswordInput;
