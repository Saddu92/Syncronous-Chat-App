import React, { useEffect, useState } from "react";
import Select from "react-select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaPlus } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  CREATE_CHANNEL_ROUTE,
  GET_ALL_CONTACTS_ROUTES,
  SEARCH_CONTACTS_ROUTES,
} from "@/lib/utils/constants";
import { apiClient } from "@/lib/api-client";
import { useAppStore } from "@/store";
import { Button } from "@/components/ui/button";
// import MultipleSelector from "@/components/ui/multipleselect";

function CreateChannel() {
  const { setSelectedChatType, setSelectedChatData,addChannel } = useAppStore();
  const [newChannelModel, setNewChannelModel] = useState(false);
  const [searchedContacts, setSearchedContacts] = useState([]);
  const [allContacts, setAllContacts] = useState([]);
  const [selectedContacts, setSelectedContancts] = useState([]);
  const [channelName, setChannelName] = useState("");

  useEffect(() => {
    const getData = async () => {
      const res = await apiClient.get(GET_ALL_CONTACTS_ROUTES, {
        withCredentials: true,
      });
      setAllContacts(res.data.contacts);
    };
    getData();
  }, []);

  const createChannel = async () => {
    try {
      const res=await apiClient.post(CREATE_CHANNEL_ROUTE,{
        name:channelName,
        members:selectedContacts.map((contact)=> contact.value),
      },
    {withCredentials:true});
    if(res.status===201){
      setChannelName("");
      setSelectedContancts([]);
      setNewChannelModel(false);
      addChannel(res.data.channel);

    }
      
    } catch (error) {
      console.log({error})
    }
  };

  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            {" "}
            <FaPlus
              className="text-neutral-500 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300"
              onClick={() => setNewChannelModel(true)}
            />{" "}
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none  mb-2 p-3 text-white">
            Create New Channel
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={newChannelModel} onOpenChange={setNewChannelModel}>
        <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>
              Please fill up the details for New Channel
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <Input
              placeholder="Search for contacts"
              className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              onChange={(e) => setChannelName(e.target.value)}
              value={channelName}
            />
          </div>
          <div>
            <Select
              isMulti
              options={allContacts}
              value={selectedContacts}
              onChange={setSelectedContancts}
              placeholder="Select members..."
              noOptionsMessage={() => (
                <p className="text-center text-lg leading-10 text-gray-400">
                  No Contacts Found
                </p>
              )}
              styles={{
                control: (base, state) => ({
                  ...base,
                  backgroundColor: "#2c2e3b",
                  borderColor: state.isFocused ? "#7e22ce" : "#2c2e3b",
                  boxShadow: "none",
                  ":hover": {
                    borderColor: "#9333ea",
                  },
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: "#2c2e3b",
                  color: "#fff",
                  zIndex: 100,
                }),
                option: (base, { isFocused, isSelected }) => ({
                  ...base,
                  backgroundColor: isSelected
                    ? "#7e22ce"
                    : isFocused
                    ? "#4c4f60"
                    : "#2c2e3b",
                  color: "#fff",
                  ":active": {
                    backgroundColor: "#9333ea",
                  },
                }),
                multiValue: (base) => ({
                  ...base,
                  backgroundColor: "#7e22ce",
                }),
                multiValueLabel: (base) => ({
                  ...base,
                  color: "white",
                }),
                multiValueRemove: (base) => ({
                  ...base,
                  color: "#fff",
                  ":hover": {
                    backgroundColor: "#9333ea",
                    color: "white",
                  },
                }),
                placeholder: (base) => ({
                  ...base,
                  color: "#aaa",
                }),
                singleValue: (base) => ({
                  ...base,
                  color: "#fff",
                }),
                input: (base) => ({
                  ...base,
                  color: "#fff",
                }),
              }}
            />
          </div>
          <div className="">
            <Button
              className="w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300"
              onClick={createChannel}
            >
              Create Channel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateChannel;
