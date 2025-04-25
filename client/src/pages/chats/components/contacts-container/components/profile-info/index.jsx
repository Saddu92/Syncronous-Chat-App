import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { apiClient } from "@/lib/api-client";
import { getColor } from "@/lib/utils";
import { LOGOUT_ROUTES } from "@/lib/utils/constants";
import { useAppStore } from "@/store";
import React from "react";
import { FiEdit2 } from "react-icons/fi";
import {IoLogOut} from "react-icons/io5"
import { useNavigate } from "react-router-dom";

function ProfileInfo() {
  const { userInfo,setUserInfo } = useAppStore();
  const navigate= useNavigate();
  
  const logOut= async()=>{
    try {
        const res= await apiClient.post(LOGOUT_ROUTES,{},{withCredentials:true});
        if(res.status===200){
            navigate("/auth");
            setUserInfo(null);
        }
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <div className="absolute bottom-0 flex items-center justify-between px-10 w-full bg-[#2a2b33] py-4">
      <div className="flex gap-3 items-center">
        <div className="flex-shrink-0">
          <Avatar className="h-14 w-14 rounded-full overflow-hidden border-2 border-gray-500 shadow-md">
            {userInfo.image ? (
              <AvatarImage
                src={`${HOST}/${userInfo.image}`}
                alt="profile"
                className="h-full w-full object-cover rounded-full"
              />
            ) : (
              <div
                className={`uppercase h-full w-full text-lg font-semibold flex items-center justify-center rounded-full ${getColor(
                  userInfo.color
                )}`}
              >
                {userInfo.firstName
                  ? userInfo.firstName.charAt(0)
                  : userInfo.email.charAt(0)}
              </div>
            )}
          </Avatar>
        </div>
        <div>
          {userInfo.firstName && userInfo.lastName
            ? `${userInfo.firstName} ${userInfo.lastName}`
            : ""}
        </div>
      </div>
      <div className="flex gap-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger> <FiEdit2 className="text-purple-500 text-xl font-medium" onClick={()=> navigate('/profile')}/> </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none text-white">
              <p>Edit Profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger> <IoLogOut className="text-red-500 text-xl font-medium" onClick={logOut}/> </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none text-white">
              <p>LogOut</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}

export default ProfileInfo;
