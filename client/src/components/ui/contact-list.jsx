import { getColor } from "@/lib/utils";
import { HOST } from "@/lib/utils/constants";
import { useAppStore } from "@/store";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import React from "react";

// Temporary placeholders — replace with actual values or imports

const ContactList = ({ contacts = [], isChannel = false }) => {
  const {
    selectedChatData,
    setSelectedChatData,
    setSelectedChatType,
    setSelectedChatMessages,
  } = useAppStore();

  const handleClick = (contact) => {
    if (isChannel) setSelectedChatType("channel");
    else setSelectedChatType("contact");

    if (!selectedChatData || selectedChatData._id !== contact._id) {
      setSelectedChatMessages([]);
    }

    setSelectedChatData(contact);
  };

  
  return (
    <div className="mt-5">
      {contacts.map((contact) => (
        <div
          key={contact._id || `${contact.firstName}-${contact.lastName}`} // Fallback key
          onClick={() => handleClick(contact)}
          className={`pl-10 py-2 transition-all duration-300 cursor-pointer ${
            selectedChatData && selectedChatData._id === contact._id
              ? "bg-[#8417ff] hover:bg-[#8417ff]"
              : "hover:bg-[#f1f1f111]"
          }`}
        >
          <div className="flex gap-5 items-center justify-start text-neutral-300">
            {!isChannel && (
              <Avatar className="h-14 w-14 rounded-full overflow-hidden border-2 border-gray-500 shadow-md">
                {contact.image ? (
                  <AvatarImage
                    src={`${HOST}/${contact.image}`}
                    alt="profile"
                    className="h-full w-full object-cover rounded-full"
                  />
                ) : (
                  <AvatarFallback
                    className={`uppercase h-full w-full text-lg font-semibold flex items-center justify-center rounded-full ${getColor(
                      contact.color
                    )}`}
                  >
                    {contact.firstName
                      ? contact.firstName.charAt(0)
                      : contact.email?.charAt(0)}
                  </AvatarFallback>
                )}
              </Avatar>
            )}
            {isChannel && (
              <div className="bg-[#fffffff22] h-10 w-10 flex items-center justify-center rounded-full">
                #
              </div>
            )}
            {isChannel ? (
              <span>{contact.name}</span>
            ) : (
              <span>{`${contact.firstName} ${contact.lastName}`}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
  
};

export default ContactList;
