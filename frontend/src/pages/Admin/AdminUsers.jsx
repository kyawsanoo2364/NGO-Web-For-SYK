import { memo, useEffect, useState } from "react";
import { AdminView } from "../../hoc";
import { useUserStore } from "../../store/userStore";
import moment from "moment";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuthStore } from "../../store/AuthStore";
import { IoMdRefresh } from "react-icons/io";

const AdminUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { getAllUsers, users, updateUser } = useUserStore();
  const [editState, setEditState] = useState(
    users?.map((user) => ({
      id: user._id,
      isEdit: false,
      isUpdating: false,
      role: user.role,
    }))
  );
  const { user } = useAuthStore();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await getAllUsers();

      setIsLoading(false);

      setEditState(
        res.data.users.map((user) => ({
          id: user._id,
          isEdit: false,
          isUpdating: false,
          role: user.role,
        }))
      );
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleEdit = (id, isEdit) => {
    setEditState((prev) =>
      prev.map((user) => (user.id === id ? { ...user, isEdit } : user))
    );
  };

  const handleChangeData = (id, { role }) => {
    setEditState((prev) =>
      prev.map((user) => (user.id === id ? { ...user, role } : user))
    );
  };

  const handleChangeUpdatingLoading = (id, isUpdating) => {
    setEditState((prev) =>
      prev.map((u) => (u.id === id ? { ...u, isUpdating } : u))
    );
  };

  const getUserEditState = (id) => {
    return editState?.find((u) => u.id === id);
  };

  const handleUpdate = async (user) => {
    try {
      handleChangeUpdatingLoading(user._id, true);
      const role = getUserEditState(user._id).role;

      await updateUser(user._id, { ...user, role });
      handleChangeUpdatingLoading(user._id, false);
      toast.success("User information updated successfully.");
      handleToggleEdit(user._id, false);
    } catch (error) {
      handleChangeUpdatingLoading(user._id, false);
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen w-full p-2">
      <div className="w-full h-full border p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-slate-800">Users</h1>
          <button
            className="px-4 py-2 border rounded-full border-gray-200 text-slate-600 flex items-center gap-2 hover:bg-gray-100"
            onClick={() => fetchData()}
          >
            <IoMdRefresh />
            Refresh
          </button>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center w-full h-full text-xl font-semibold text-slate-400">
            Loading... Please wait....
          </div>
        ) : (
          <div className="my-5 mx-5">
            <table className="table-auto w-full">
              <thead className="border border-b-2 border-gray-300">
                <tr className="bg-slate-100">
                  <th className="text-sm p-2 tracking-wide font-semibold text-left">
                    Name
                  </th>
                  <th className="text-sm p-2 tracking-wide font-semibold text-left">
                    Email
                  </th>
                  <th className="text-sm p-2 tracking-wide font-semibold text-left">
                    Phone
                  </th>
                  <th className="text-sm p-2 tracking-wide font-semibold text-left">
                    Birth
                  </th>
                  <th className="text-sm p-2 tracking-wide font-semibold text-left">
                    Address
                  </th>
                  <th className="text-sm p-2 tracking-wide font-semibold text-left">
                    Role
                  </th>
                  <th className="text-sm p-2 tracking-wide font-semibold text-left">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {users?.map((usr, idx) => {
                  const editState = getUserEditState(usr._id);

                  return (
                    <tr key={idx} className="bg-white border hover:bg-gray-100">
                      <td className="text-sm p-3 text-gray-700 font-semibold">
                        {usr.fullName}
                      </td>
                      <td className="text-sm p-3 text-gray-700">{usr.email}</td>
                      <td className="text-sm p-3 text-gray-700">{usr.phone}</td>
                      <td className="text-sm p-3 text-gray-700">
                        {moment(usr.birth).format("ll")}
                      </td>
                      <td className="text-sm p-3 text-gray-700">
                        {usr.location}
                      </td>
                      <td className="text-sm p-3 text-gray-700">
                        {editState?.isEdit ? (
                          <select
                            name=""
                            id=""
                            value={editState?.role}
                            onChange={(e) =>
                              handleChangeData(usr._id, {
                                role: e.target.value,
                              })
                            }
                          >
                            <option value="admin">admin</option>
                            <option value="user">user</option>
                          </select>
                        ) : (
                          usr.role
                        )}
                      </td>
                      <td className="text-sm p-3 flex items-center gap-1">
                        {usr._id !== user?._id ? (
                          editState?.isEdit ? (
                            editState.isUpdating ? (
                              <p className="text-gray-300">Saving...</p>
                            ) : (
                              <>
                                <button
                                  className="px-2 py-1 border rounded"
                                  onClick={() =>
                                    handleToggleEdit(usr._id, false)
                                  }
                                >
                                  Cancel
                                </button>
                                <button
                                  className="px-2 py-1 border rounded bg-blue-500 text-white"
                                  onClick={() => handleUpdate(usr)}
                                >
                                  Save
                                </button>
                              </>
                            )
                          ) : (
                            <button
                              className="p-2 bg-emerald-500 text-white rounded-full flex justify-center items-center"
                              onClick={() => handleToggleEdit(usr._id, true)}
                            >
                              <FaEdit />
                            </button>
                          )
                        ) : (
                          <span className="text-slate-400">No Action</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
export default memo(AdminView(AdminUsers));
