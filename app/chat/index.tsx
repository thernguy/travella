import Spinner from "@/components/ui/Spinner";
import { useAppContext } from "@/context/AppContext";
import { useChatMessages } from "@/hooks/useFirebase";
import { sendMessage } from "@/services/chatService";
import { IUser } from "@/types/data";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { FC, useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Avatar,
  Icon,
  IconButton,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface indexProps {}
const SendMessage = ({
  recipientId,
  senderId,
}: {
  recipientId: string;
  senderId: string | undefined;
}) => {
  const theme = useTheme();
  const [messageText, setMessageText] = useState("");
  const handleSendMessage = async () => {
    if (!messageText.trim()) return;
    sendMessage({
      senderId: senderId!,
      recipientId,
      message: messageText.trim(),
    });
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setMessageText("");
  };

  return (
    <View
      style={{
        padding: 12,
        paddingTop: 4,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 8,
        }}
      >
        <TextInput
          style={{
            flex: 1,
            borderRadius: 12,
          }}
          value={messageText}
          onChangeText={setMessageText}
          mode="outlined"
          outlineStyle={{
            borderRadius: 12,
            borderColor: theme.colors.secondary,
          }}
          placeholder="Type a message"
        />

        <TouchableOpacity
          onPress={handleSendMessage}
          activeOpacity={0.8}
          disabled={!messageText}
        >
          <Icon
            source={messageText ? "send-circle" : "send-circle-outline"}
            size={62}
            color={messageText ? theme.colors.primary : theme.colors.secondary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const ChatScreen: FC<indexProps> = (props) => {
  const theme = useTheme();
  const params = useLocalSearchParams();
  const recevier = JSON.parse(params?.user as string) as IUser;
  const { user: sender } = useAppContext();
  const navigation = useNavigation();
  const isFetching = false;
  const currentPage = 1;
  const fetchMore = () => {};
  const recipientId = recevier?.uid;
  const senderId = sender?.uid;
  const inset = useSafeAreaInsets();
  const messages = useChatMessages(senderId, recipientId);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 75}
      style={{ flex: 1, marginBottom: inset.bottom }}
    >
      <FlatList
        automaticallyAdjustKeyboardInsets
        contentContainerStyle={{
          paddingHorizontal: 12,
          flexGrow: 1,
        }}
        data={messages}
        inverted
        initialNumToRender={10}
        renderItem={({
          item: {
            message,
            senderId,
            isSender = senderId === sender?.uid,
            user: {
              name = isSender
                ? sender?.displayName || "-"
                : recevier?.name || "U",
            } = {},
            status,
            createdAt,
          },
        }) => (
          <Pressable
            style={{
              padding: 12,
              flexDirection: isSender ? "row-reverse" : "row",
              gap: 12,
              marginLeft: isSender ? "auto" : 0,
            }}
          >
            <Avatar.Text
              label={name?.charAt(0)}
              size={44}
              style={{
                backgroundColor: isSender
                  ? theme.colors.primary
                  : theme.colors.secondary,
              }}
            />
            <View
              style={[
                isSender ? styles.opponentMessageItem : styles.selfMssageItem,
                {
                  backgroundColor: isSender
                    ? theme.colors.primary
                    : theme.colors.secondary,
                  borderColor: isSender
                    ? theme.colors.secondary
                    : theme.colors.primary,
                },
              ]}
            >
              <Text
                variant="bodyLarge"
                style={{
                  color: isSender
                    ? theme.colors.onPrimary
                    : theme.colors.onSecondary,
                }}
              >
                {message}
              </Text>
              <Text
                variant="bodyMedium"
                style={{
                  color: isSender
                    ? theme.colors.onPrimary
                    : theme.colors.onSecondary,
                  marginLeft: "auto",
                }}
              >
                {status || (isSender && "sent")} at{" "}
                {createdAt?.toDate().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={() =>
          false && (
            <View>
              <Text variant="bodyLarge">No messages yet.</Text>
            </View>
          )
        }
        keyExtractor={(item) => item.id.toString()}
        onEndReached={fetchMore}
        ListFooterComponent={
          isFetching ? (
            <Spinner />
          ) : currentPage > 1 ? (
            <Text style={styles.footerText}>No more data</Text>
          ) : null
        }
      />
      {recipientId && (
        <SendMessage recipientId={recipientId} senderId={sender?.uid} />
      )}
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  selfMssageItem: {
    maxWidth: "70%",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderTopEndRadius: 12,
    borderBottomEndRadius: 12,
    borderBottomStartRadius: 12,
  },

  opponentMessageItem: {
    maxWidth: "70%",
    paddingVertical: 8,

    paddingHorizontal: 12,

    borderTopStartRadius: 12,
    borderBottomEndRadius: 12,
    borderBottomStartRadius: 12,
  },
  footerText: {
    textAlign: "center",
    padding: 10,
  },
  activeSwapperIndicator: {
    width: 10,
    height: 10,
    backgroundColor: "#12B76A",
    borderRadius: 5,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  pdfContainer: {
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  pdfText: {
    color: "#007bff",
    textDecorationLine: "underline",
  },
  fileContainer: {
    padding: 10,
    borderRadius: 5,
  },
  fileText: {
    color: "#333",
  },
  errorText: {
    color: "red",
  },
});
export default ChatScreen;
