"use client";
import React, { useState } from "react";
import { HiOutlinePlus } from "react-icons/hi2";
import AdminAccountRow from "./AdminAccountRow";
import AddAdminModal from "./AddAdminModal";
import EditAdminModal from "./EditAdminModal";
import type { AdminAccount } from "@/Type/AdminDashboard/Settings";
import { toastManager } from "@/components/ui/toast";

//========== Admin Accounts Tab Component ==========
const AdminAccountsTab: React.FC = () => {
  //========== State Management ==========
  const [accounts, setAccounts] = useState<AdminAccount[]>([
    {
      id: "1",
      name: "Admin User",
      email: "admin@example.com",
      role: "Super Admin",
      status: "active",
    },
    {
      id: "2",
      name: "Review Manager",
      email: "reviewer@example.com",
      role: "Reviewer",
      status: "active",
    },
  ]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<AdminAccount | null>(
    null
  );

  //========== Handle Actions ==========
  const handleAddAdmin = (newAccount: Omit<AdminAccount, "id">) => {
    const account: AdminAccount = {
      ...newAccount,
      id: (accounts.length + 1).toString(),
    };
    setAccounts([...accounts, account]);
    toastManager.add({
      type: "success",
      title: "Admin Added",
      description: `${account.name} has been added successfully`,
    });
  };

  const handleEdit = (account: AdminAccount) => {
    setSelectedAccount(account);
    setIsEditModalOpen(true);
  };

  const handleUpdateAdmin = (updatedAccount: AdminAccount) => {
    setAccounts(
      accounts.map((acc) =>
        acc.id === updatedAccount.id ? updatedAccount : acc
      )
    );
    toastManager.add({
      type: "success",
      title: "Admin Updated",
      description: `${updatedAccount.name} has been updated successfully`,
    });
  };

  const handleRemove = (account: AdminAccount) => {
    setAccounts(accounts.filter((acc) => acc.id !== account.id));
    toastManager.add({
      type: "error",
      title: "Admin Removed",
      description: `${account.name} has been removed`,
    });
  };

  return (
    <div className="space-y-6">
      {/*========== Header ==========*/}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Admin Accounts & Roles
        </h3>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          <HiOutlinePlus size={18} />
          Add Admin
        </button>
      </div>

      {/*========== Admin Accounts Table ==========*/}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left p-4 text-sm font-semibold text-gray-700">
                Name
              </th>
              <th className="text-left p-4 text-sm font-semibold text-gray-700">
                Email
              </th>
              <th className="text-left p-4 text-sm font-semibold text-gray-700">
                Role
              </th>
              <th className="text-left p-4 text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="text-left p-4 text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <AdminAccountRow
                key={account.id}
                account={account}
                onEdit={handleEdit}
                onRemove={handleRemove}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/*========== Modals ==========*/}
      <div>
          <AddAdminModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onAdd={handleAddAdmin}
          />
          <EditAdminModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onUpdate={handleUpdateAdmin}
            account={selectedAccount}
          />
      </div>
    </div>
  );
};

export default AdminAccountsTab;
