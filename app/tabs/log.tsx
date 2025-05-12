import Styles from "@/constants/Styles";
import { useAppContext } from "@/context/AppContext";
import { useCreateLog } from "@/hooks/useFirebase";
import { LogFormData } from "@/types/data";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Avatar, Button, Text, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
const uploadToCloudinary = async (imageUri: string) => {
  const data = new FormData();
  data.append("file", {
    uri: imageUri,
    type: "image/jpeg",
    name: "upload.jpg",
  } as any);
  data.append("upload_preset", "job_task");
  data.append("cloud_name", "dtvnhwkst");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dtvnhwkst/image/upload",
    {
      method: "POST",
      body: data,
    }
  );

  const json = await res.json();
  return json.secure_url;
};

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
      photos: [],
    },
  });

  const { user } = useAppContext();
  const { create } = useCreateLog();
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: LogFormData) => {
    if (!user) return Alert.alert("Error", "User not logged in");
    setLoading(true);
    try {
      const uploadedPhotos = (await Promise.all(
        photos.map((photo) => uploadToCloudinary(photo))
      )) as string[];
      uploadedPhotos.map((photo: any) => photo);
      await create({
        location: data.location,
        notes: data.notes,
        userId: user.uid,
        photos: uploadedPhotos,
      });
      Alert.alert("Success", "Log added!");
      reset();
      setPhotos([]);
    } catch (err: any) {
      Alert.alert("Error", err.message || "Failed to add log");
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission denied",
        "We need permission to access your gallery"
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
      selectionLimit: 1,
    });
    if (!result.canceled && result.assets && result.assets[0]?.uri) {
      result.assets.map((asset) => {
        setPhotos((prevPhotos) => [...prevPhotos, asset.uri]);
      });
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission denied",
        "We need permission to access your camera"
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets[0]?.uri) {
      setPhotos((prevPhotos) => [...prevPhotos, result.assets[0].uri]);
    }
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
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
          style={{ alignSelf: "center", marginBottom: 10 }}
        />

        <Text variant="titleLarge" style={{ textAlign: "center" }}>
          Add Travel Log
        </Text>

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
              label="Journal notes"
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
        {photos.length > 0 && (
          <View
            style={{
              marginVertical: 10,
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
              gap: 8,
            }}
          >
            {photos.map((photoUri, index) => (
              <View
                key={index}
                style={{
                  position: "relative",
                  width: 100,
                  height: 100,
                }}
              >
                <Image
                  source={{ uri: photoUri }}
                  style={{ width: 100, height: 100, margin: 5 }}
                  resizeMode="cover"
                />
                <Pressable
                  onPress={() => handleRemovePhoto(index)}
                  style={{
                    position: "absolute",
                  }}
                >
                  <Avatar.Icon
                    icon="close-circle"
                    size={24}
                    style={{
                      backgroundColor: "red",
                    }}
                  />
                </Pressable>
              </View>
            ))}
          </View>
        )}
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Button
            mode="contained"
            onPress={pickImage}
            style={{ marginVertical: 10, flex: 1 }}
            icon={"image-plus"}
          >
            Upload Photo
          </Button>
          <Button
            mode="contained"
            onPress={takePhoto}
            style={{ marginVertical: 10, flex: 1 }}
            icon={"camera"}
          >
            Take a Photo
          </Button>
        </View>

        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          loading={loading}
          disabled={loading}
          icon="content-save"
        >
          {loading ? "Saving..." : "Save Log"}
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
