"use client";
import React, { useState } from "react";
import { HiOutlineMagnifyingGlass, HiOutlinePlus } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import UserRow from "./UserRow";
import AddUserModal from "./AddUserModal";
import type { User, AddUserFormData } from "@/Type/AdminDashboard/UserManagement";
import { toastManager } from "@/components/ui/toast";

//========== User Table Component ==========
const UserTable: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  //========== Sample Users Data ==========
  const initialUsers: User[] = [
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@techcorp.com",
      company: "TechCorp Inc",
      projects: 3,
      status: "active",
      lastLogin: "2 hours ago",
      role: "Project Manager",
      department: "R&D",
      phone: "+1 (555) 123-4567",
      joinDate: "2024-01-15",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.j@innovate.com",
      company: "Innovate Labs",
      projects: 5,
      status: "active",
      lastLogin: "1 day ago",
      role: "Tech Lead",
      department: "Engineering",
      phone: "+1 (555) 234-5678",
      joinDate: "2023-11-20",
    },
    {
      id: "3",
      name: "Michael Chen",
      email: "mchen@startupx.io",
      company: "StartupX",
      projects: 2,
      status: "active",
      lastLogin: "3 hours ago",
      role: "Developer",
      department: "Product",
      phone: "+1 (555) 345-6789",
      joinDate: "2024-03-10",
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily.d@designstudio.com",
      company: "Design Studio",
      projects: 0,
      status: "pending",
      lastLogin: "Never",
      role: "Designer",
      department: "Creative",
      phone: "+1 (555) 456-7890",
      joinDate: "2024-12-01",
    },
    {
      id: "5",
      name: "Robert Wilson",
      email: "rwilson@datatech.com",
      company: "DataTech Solutions",
      projects: 1,
      status: "suspended",
      lastLogin: "2 weeks ago",
      role: "Analyst",
      department: "Data Science",
      phone: "+1 (555) 567-8901",
      joinDate: "2023-08-15",
    },
  ];

  const [users, setUsers] = useState<User[]>(initialUsers);

  //========== Handle Add User ==========
  const handleAddUser = (userData: AddUserFormData) => {
    // Generate new user ID
    const newId = (users.length + 1).toString();
    
    // Construct full name from first and last name
    const fullName = [userData.firstName, userData.lastName]
      .filter(Boolean)
      .join(" ") || "New User";
    
    // Create new user object matching the User type
    const newUser: User = {
      id: newId,
      name: fullName,
      email: userData.email,
      company: userData.businessName || "No Company",
      projects: 0,
      status: "pending",
      lastLogin: "Never",
      role: "User",
      department: "General",
      phone: "",
      joinDate: new Date().toISOString().split("T")[0],
    };
    
    // Add new user to the list
    setUsers([newUser, ...users]);
    
    // Show success toast
    toastManager.add({
      type: "success",
      title: "User Added",
      description: `${newUser.name} has been successfully added to the system`,
    });
  };

  //========== Filter Users ==========
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  //========== Handle Actions ==========
  const handleViewProfile = (userId: string) => {
    router.push(`/Admin/userManagement/${userId}`);
  };

  const handleSendEmail = (user: User) => {
    toastManager.add({
      type: "success",
      title: "Email Sent",
      description: `Email sent successfully to ${user.name} (${user.email})`,
    });
  };

  const handleResetPassword = (user: User) => {
    toastManager.add({
      type: "success",
      title: "Password Reset",
      description: `Password reset link sent to ${user.email}`,
    });
  };

  const handleSuspendAccount = (user: User) => {
    toastManager.add({
      type: "warning",
      title: "Account Suspended",
      description: `${user.name}'s account has been suspended`,
    });
  };

  const handleDeleteUser = (user: User) => {
    toastManager.add({
      type: "error",
      title: "User Deleted",
      description: `${user.name} has been removed from the system`,
    });
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
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
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
                  onSendEmail={handleSendEmail}
                  onResetPassword={handleResetPassword}
                  onSuspendAccount={handleSuspendAccount}
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
    </div>
  );
};

export default UserTable;
