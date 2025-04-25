  export const createChatSlice = (set, get) => ({
    selectedChatType: undefined,
    selectedChatData: undefined,
    selectedChatMessages: [],
    directMessagesContacts: [],
    isUploading: false,
    isDownloading: false,
    fileUploadProgress: 0,
    fileDownloadProgress: 0,
    channels: [],

    setChannels: (channels) => set({ channels }),
    setIsUploading: (isUploading) => set({ isUploading }),
    setIsDownloading: (isDownloading) => set({ isDownloading }),
    setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
    setSelectedChatData: (selectedChatData) => set({ selectedChatData }),
    setFileUploadProgress: (fileUploadProgress) => set({ fileUploadProgress }),
    setFileDownloadProgress: (fileDownloadProgress) => set({ fileDownloadProgress }),
    setSelectedChatMessages: (selectedChatMessages) => set({ selectedChatMessages }),
    setDirectMessagesContacts: (directMessagesContacts) => set({ directMessagesContacts }),

    addChannel: (channel) => {
      const channels = get().channels;
      set({ channels: [channel, ...channels] });
    },

    closeChat: () => set({
      selectedChatData: undefined,
      selectedChatType: undefined,
      selectedChatMessages: [],
    }),

    addMessage: (message) => {
      const selectedChatMessages = get().selectedChatMessages || []; // Ensure it's always an array
      const selectedChatType = get().selectedChatType;
    
      set({
        selectedChatMessages: [
          ...selectedChatMessages,
          {
            ...message,
            recipient: selectedChatType === "channel"
              ? message.recipient
              : message.recipient._id,
          },
        ],
      });
    },
    

    addChannelInChannelList: (message) => {
      const channels = get().channels;
      const index = channels.findIndex(channel => channel._id === message.channelId);

      if (index !== -1) {
        const updatedChannel = { ...channels[index], lastMessage: message };
        const updatedChannels = [
          updatedChannel,
          ...channels.slice(0, index),
          ...channels.slice(index + 1),
        ];
        set({ channels: updatedChannels });
      } else {
        const newChannel = {
          _id: message.channelId,
          name: message.channelName || "New Channel",
          lastMessage: message,
        };
        set({ channels: [newChannel, ...channels] });
      }
    },

    addContactsInDmContacts:(message)=>{
      const userId= get().userInfo.id;
      const fromId=message.sender._id=== userId? message.recipient._id : message.sender._id;
      const fromData=message.sender._id=== userId? message.recipient: messaage.sender;
      const dmContacts= get().directMessagesContacts;
      const data= dmContacts.find((contact)=>contact._id ===fromId);
      const index= dmContacts.findIndex((contact)=>contact._id ===fromId);
      if(index!==-1 && index!== undefined){
        console.log("In if Condition");
        dmContacts.splice(index,1);
        dmContacts.unshift(data);
      }else{
        console.log("In Else Condition");
        dmContacts.unshift(fromData);
      }
      set({directMessagesContacts:dmContacts});

    },
  });
