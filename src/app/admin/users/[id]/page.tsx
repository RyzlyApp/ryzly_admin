"use client";
 
import UserProfile from "@/components/admin/users/profile/UserProfile";
import { LoadingLayout } from "@/components/shared";
import { IUser } from "@/helper/model/user";
import { useFetchData } from "@/hook/useFetchData";
import { useParams } from "next/navigation";

export default function UserDetails() {
    const param = useParams();
    const id = param.id;

    const { data, isLoading } = useFetchData<IUser>({
        name: "challenge",
        endpoint: `/admin-user/${id}`,  
    }); 

    return (
        <LoadingLayout loading={isLoading} >
            <UserProfile  user={data as IUser}/>
        </LoadingLayout>
    );
}
