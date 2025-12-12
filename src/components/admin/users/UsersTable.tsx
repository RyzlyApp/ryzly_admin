import React from "react";
import { Avatar, Spinner } from "@heroui/react";
import CustomButton from "@/components/custom/customButton";
import httpService from "@/helper/services/httpService";
import { IUser } from "@/app/types/User";
import { PaginatedReturnType } from "@/app/types/PaginatedReturnType";
import useUsers from "@/hook/useUsers";

const UsersTable: React.FC = ({ }) => {


  const { limit, offset, filter, users, setUsers, isLoading, setIsLoading, setTotal } = useUsers();

  const loadUsers = React.useCallback(async() => {
    setIsLoading(true);
    const params: Record<string, unknown> = {
      limit,
      page: offset,
    }

    if (filter === 'coach') {
      params['isCoach'] = true;
    }

    if (filter === 'active') {
      params['isSuspended'] = false;
    }

    if (filter === 'banned') {
      params['isSuspended'] = true;
    }
    const response = await httpService.get('/admin-user', {
      params
    });

    const data = response?.data as PaginatedReturnType<IUser[]>;
    setUsers(data?.data);
    setTotal(data?.total);
    setIsLoading(false);
  }, [limit, offset, setIsLoading, setTotal, setUsers, filter]);

  React.useEffect(() => {
    loadUsers();
  }, [loadUsers])


  return (
    <div className="overflow-x-auto">
     
      {!isLoading && users?.length > 0 && (
        <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
              Name
            </th>
            <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
              Email
            </th>
            <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
              Location
            </th>
            <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
              Joined On
            </th>
            <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
              Status
            </th>
            <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user._id}
              className="border-b border-gray-100 hover:bg-gray-50"
            >
              <td className="py-4 px-6">
                <div
                  className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
                  onClick={() => {}}
                >
                  <Avatar
                    className="w-8 h-8 text-xs"
                    name={user?.firstName}
                    src={user?.profilePicture}
                    color="primary"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">
                        {user?.firstName} {user?.lastName}
                      </span>
                      {user.isCoach && (
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          Coach
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600">{user.track}</p>
                  </div>
                </div>
              </td>
              <td className="py-4 px-6 text-sm text-gray-900">{user.email}</td>
              <td className="py-4 px-6 text-sm text-gray-900">
                {user.country}
              </td>
              <td className="py-4 px-6 text-sm text-gray-900">
                {new Date(user.createdAt).toDateString()}
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      !user.isSuspended ? "bg-blue-500" : "bg-red-500"
                    }`}
                  ></div>
                  <span className="text-sm text-gray-600">{user.isSuspended ? 'BANNED':'ACTIVE'}</span>
                </div>
              </td>
              <td className="py-4 px-6">
                {!user.isSuspended ? (
                  <CustomButton
                    variant="customDanger"
                    size="sm"
                    height="32px"
                    fontSize="12px"
                  >
                    Suspend
                  </CustomButton>
                ) : (
                  <CustomButton
                    variant="primary"
                    size="sm"
                    height="32px"
                    fontSize="12px"
                  >
                    Unsuspend
                  </CustomButton>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}

      {!isLoading && users?.length < 1 && (
        <div className="w-full h-24 flex justify-center items-center flex-col">
          <p>There are currently no users</p>
        </div>
      )}

       {isLoading && users?.length < 1 && (
        <div className="w-full h-24 flex justify-center items-center flex-col">
          <Spinner />
          <p>Loading users...</p>
        </div>
      )}
    </div>
  );
};

export default UsersTable; 

