import { useAppContext } from "@/context/AppContext";
import { db } from "@/firebaseConfig";
import { useChatMessages } from "@/hooks/useFirebase";
import { sendMessage } from "@/services/chatService";
import { IUser } from "@/types/data";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { doc, onSnapshot } from "firebase/firestore";
import { FC, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SectionList,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import {
  Avatar,
  Badge,
  Icon,
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
          placeholder="Type a message..."
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
const Status = ({ isOnline }: { isOnline: boolean }) => {
  const theme = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
      }}
    >
      <Badge
        size={16}
        style={{
          backgroundColor: isOnline
            ? '#00FF00'
            : theme.colors.secondary,
        }}
      />
      <Text>{isOnline ? "Online" : "Offline"}</Text>
    </View>
  );
};
const groupMessagesByDate = (messages: any[]) => {
  const groups: { [key: string]: any[] } = {};

  const stripTime = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const now = stripTime(new Date());
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  const isSameDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const getLabel = (date: Date) => {
    const stripped = stripTime(date);
    if (isSameDay(stripped, now)) return "Today";
    if (isSameDay(stripped, yesterday)) return "Yesterday";

    const weekday = stripped.toLocaleDateString(undefined, {
      weekday: "long",
    });
    const month = stripped.toLocaleDateString(undefined, {
      month: "short",
    });
    return `${weekday}, ${month} ${stripped.getDate()}`;
  };

  messages.forEach((msg) => {
    const msgDate = msg?.createdAt
      ? stripTime(msg.createdAt.toDate())
      : new Date();
    const label = getLabel(msgDate);
    if (!groups[label]) groups[label] = [];
    groups[label].push(msg);
  });

  return Object.entries(groups).map(([title, data]) => ({ title, data }));
};
const ChatScreen: FC<indexProps> = (props) => {
  const theme = useTheme();
  const params = useLocalSearchParams();
  const recevier = JSON.parse(params?.user as string) as IUser;
  const { user: sender } = useAppContext();
  const navigation = useNavigation();
  const recipientId = recevier?.uid;
  const senderId = sender?.uid;
  const inset = useSafeAreaInsets();
  const messages = useChatMessages(senderId, recipientId);

  useEffect(() => {
    onSnapshot(doc(db, "status", recipientId), (doc) => {
      const isOnline = doc.data()?.state === "online";
      navigation.setOptions({
        headerRight: () => <Status isOnline={isOnline} />,
      });
    });
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={"padding"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 75}
      style={{ flex: 1, marginBottom: inset.bottom }}
    >
      <SectionList
        sections={groupMessagesByDate(messages)}
        keyExtractor={(item) => item.id}
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
          section: { title, data },
          index,
        }) => (
          <>
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
                  isSender ? styles.receiverItem : styles.senderItem,
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
                  {createdAt?.toDate().toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </View>
            </Pressable>
            {index === data.length - 1 && (
              <Text
                style={[
                  styles.dateHeader,
                  {
                    color: theme.colors.primary,
                  },
                ]}
              >
                {title}
              </Text>
            )}
          </>
        )}
        inverted
        contentContainerStyle={{
          paddingHorizontal: 12,
          paddingBottom: 12,
        }}
      />
      {recipientId && (
        <SendMessage recipientId={recipientId} senderId={sender?.uid} />
      )}
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  senderItem: {
    maxWidth: "70%",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderTopEndRadius: 12,
    borderBottomEndRadius: 12,
    borderBottomStartRadius: 12,
  },
  receiverItem: {
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
  dateHeader: {
    textAlign: "center",
    fontWeight: "bold",
  },
});
export default ChatScreen;
