import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { HOST } from "@/lib/utils/constants";
import { useAppStore } from "@/store";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const [socketReady, setSocketReady] = useState(false);
  const userInfo = useAppStore((state) => state.userInfo);

  useEffect(() => {
    if (userInfo) {
      socketRef.current = io(HOST, {
        withCredentials: true,
        query: { userId: userInfo.id },
      });

      socketRef.current.on("connect", () => {
        console.log("✅ Connected to socket server");
        setSocketReady(true);
      });

      const handleReceiveMessage = (message) => {
        const {
          selectedChatData,
          selectedChatType,
          addMessage,
          addChannelInChannelList,
          addContactsInDmContacts,
        } = useAppStore.getState();

        const isActiveChat =
          selectedChatType !== undefined &&
          (selectedChatData?._id === message.sender._id ||
            selectedChatData?._id === message.recipient._id);

        if (isActiveChat) {
          addMessage(message);
        }
        addContactsInDmContacts(message);
      };

      const handleReceiveChannelMessage = (message) => {
        const {
          selectedChatData,
          selectedChatType,
          addMessage,
          addChannelInChannelList,
        } = useAppStore.getState();

        const isActiveChannel =
          selectedChatType === "channel" &&
          selectedChatData?._id === message.channelId;

        if (isActiveChannel) {
          addMessage(message);
        }

        addChannelInChannelList(message);
      };

      socketRef.current.on("recieveMessage", handleReceiveMessage);
      socketRef.current.on("recieve-channel-message", handleReceiveChannelMessage);

      return () => {
        socketRef.current?.disconnect();
      };
    }
  }, [userInfo]);

  return (
    <SocketContext.Provider value={socketReady ? socketRef.current : null}>
      {children}
    </SocketContext.Provider>
  );
};
