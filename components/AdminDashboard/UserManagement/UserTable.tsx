"use client";
import React, { useEffect, useState } from "react";
import { HiOutlineMagnifyingGlass, HiOutlinePlus } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import UserRow from "./UserRow";
import AddUserModal from "./AddUserModal";
import type {
  User,
  AddUserFormData,
} from "@/Type/AdminDashboard/UserManagement";
import { toastManager } from "@/components/ui/toast";
import { useAxios } from "@/Hooks/useAxiosInstance";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

//========== User Table Component ==========
const UserTable: React.FC = () => {
  const router = useRouter();
  const axios = useAxios();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<User | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [users, setUsers] = useState<User[]>([]);
  const fetchUsers = async () => {
    try {
      const response = await axios.get("users/user/");

      const data = response.data;
      console.log("Fetched users data:", data);
      const userList = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data?.results)
            ? data.results
            : [];
      setUsers(userList);
    } catch (error) {
      toastManager.add({
        type: "error",
        title: "Error",
        description: "Failed to fetch users. Please try again later.",
      });
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  //========== Handle Add User ==========
  const handleAddUser = async (userData: AddUserFormData) => {
    const tempId = Date.now();
    const optimisticUser: User = {
      id: tempId,
      email: userData.email,
      full_name: userData.full_name,
      company: null,
      company_size: null,
      abn: null,
      city: null,
      state: null,
      post_code: null,
      street_address: null,
      phone: null,
      website: null,
      industry: null,
      fiscal_year_end: null,
      role: "user",
      is_active: false,
      is_pending: true,
      is_staff: false,
      is_superuser: false,
      is_suspended: false,
      date_joined: new Date().toISOString(),
      last_login: "",
      tax_projects: 0,
    };

    setUsers((prev) => [optimisticUser, ...prev]);

    try {
      const body = {
        email: userData.email,
        full_name: userData.full_name,
        password: userData.password,
        confirm_password: userData.confirm_password,
      };

      const response = await axios.post("users/user/", body);
      const raw = response?.data?.data ?? response?.data ?? {};
      // Some APIs wrap the created user in a data/user field; unwrap conservatively.
      const savedUser: User = (raw as any).user ?? raw;

      const mergedUser: User = {
        ...optimisticUser,
        ...savedUser,
        id:
          (savedUser as any).id ??
          (savedUser as any).user_id ??
          (savedUser as any).pk ??
          optimisticUser.id,
        full_name:
          savedUser.full_name ?? (savedUser as any).name ?? userData.full_name,
        email:
          savedUser.email ?? (savedUser as any).user_email ?? userData.email,
      };

      setUsers((prev) => prev.map((u) => (u.id === tempId ? mergedUser : u)));
      // Fetch fresh list to sync any derived fields from backend (e.g., status)
      fetchUsers();

      toastManager.add({
        type: "success",
        title: "User Added",
        description: `${savedUser.full_name} has been successfully added to the system`,
      });
    } catch (error: any) {
      setUsers((prev) => prev.filter((u) => u.id !== tempId));

      const errData = error?.response?.data?.error;
      let message = "Failed to add user. Please try again.";

      if (errData && typeof errData === "object") {
        message = Object.values(errData).flat().join(", ");
      } else if (
        error?.response?.data?.message ||
        error?.response?.data?.detail
      ) {
        message = error.response.data.message || error.response.data.detail;
      }

      toastManager.add({
        type: "error",
        title: "Error",
        description: message,
      });
    }
  };

  //========== Derive display status from API flags ==========
  const getUserStatus = (user: User): "active" | "suspended" | "pending" => {
    if (user.is_suspended) return "suspended";
    if (user.is_pending) return "pending";
    return "active";
  };

  //========== Filter Users ==========
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user?.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user?.company || "").toLowerCase().includes(searchQuery.toLowerCase());
    const status = getUserStatus(user);
    const matchesStatus = statusFilter === "all" || status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  //========== Handle Actions ==========
  const handleViewProfile = (userId: number) => {
    router.push(`/Admin/userManagement/${userId}`);
  };

  const handleSuspendAccount = async (user: User) => {
    const response = await axios.put(`users/suspend-user/${user.id}/`);
    if (response.status === 200) {
      fetchUsers();
      toastManager.add({
        type: "warning",
        title: "Account Suspended",
        description: `${user.full_name}'s account has been suspended`,
      });
    } else {
      toastManager.add({
        type: "error",
        title: "Error",
        description: `Failed to suspend ${user.full_name}'s account. Please try again.`,
      });
    }
  };

  const handleUnsuspendAccount = async (user: User) => {
    const response = await axios.put(`users/suspend-user/${user.id}/`);
    if (response.status === 200) {
      fetchUsers();
      toastManager.add({
        type: "success",
        title: "Account Unsuspended",
        description: `${user.full_name}'s account has been unsuspended`,
      });
    } else {
      toastManager.add({
        type: "error",
        title: "Error",
        description: `Failed to unsuspend ${user.full_name}'s account. Please try again.`,
      });
    }
  };

  const handleDeleteUser = (user: User) => {
    setPendingDelete(user);
  };

  const confirmDeleteUser = async () => {
    if (!pendingDelete) return;
    try {
      setIsDeleting(true);
      const response = await axios.delete(`users/user/${pendingDelete.id}/`);
      if (response.status === 200 || response.status === 204) {
        fetchUsers();
        toastManager.add({
          type: "success",
          title: "User Deleted",
          description: `${pendingDelete.full_name} has been removed from the system`,
        });
      } else {
        toastManager.add({
          type: "error",
          title: "Error",
          description: `Failed to delete ${pendingDelete.full_name}. Please try again.`,
        });
      }
    } catch {
      toastManager.add({
        type: "error",
        title: "Error",
        description: `Failed to delete ${pendingDelete.full_name}. Please try again.`,
      });
    } finally {
      setIsDeleting(false);
      setPendingDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/*========== Search and Filter Bar ==========*/}
      <div className="flex flex-col sm:flex-row gap-4">
        {/*========== Search Input ==========*/}
        <div className="flex-1 relative">
          <HiOutlineMagnifyingGlass
            size={20}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search users by name, email, or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/*========== Status Filter ==========*/}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="suspended">Suspended</option>
        </select>

        {/*========== Add User Button ==========*/}
        <button
          onClick={() => setIsAddUserModalOpen(true)}
          className="flex py-3 px-2 border border-gray-200 rounded-lg hover:bg-blue-50 duration-500 bg-white cursor-pointer items-center gap-2"
        >
          <HiOutlinePlus size={20} />
          Add User
        </button>
      </div>

      {/*========== User Table ==========*/}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 ">
        <div className="">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left p-4 text-sm font-semibold text-gray-700">
                  User ID
                </th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">
                  Name & Email
                </th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">
                  Company
                </th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">
                  Projects
                </th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">
                  Last Login
                </th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <UserRow
                  key={user.id}
                  user={user}
                  onViewProfile={handleViewProfile}
                  onSuspendAccount={handleSuspendAccount}
                  onUnsuspendAccount={handleUnsuspendAccount}
                  onDeleteUser={handleDeleteUser}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/*========== Empty State ==========*/}
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No users found</p>
          </div>
        )}
      </div>

      {/*========== Add User Modal ==========*/}
      <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
        onAddUser={handleAddUser}
      />

      {/* Delete Confirmation */}
      <Dialog
        open={!!pendingDelete}
        onOpenChange={(open) => !open && setPendingDelete(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete user?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. The user{" "}
              {pendingDelete?.full_name || ""} will be permanently removed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setPendingDelete(null)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDeleteUser}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserTable;
