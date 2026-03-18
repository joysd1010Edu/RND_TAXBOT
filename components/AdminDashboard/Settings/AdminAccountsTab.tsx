"use client";
import React, { useEffect, useState } from "react";
import { HiOutlinePlus } from "react-icons/hi2";
import AdminAccountRow from "./AdminAccountRow";
import AddAdminModal from "./AddAdminModal";
import EditAdminModal from "./EditAdminModal";
import type { AdminAccount } from "@/Type/AdminDashboard/Settings";
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

//========== Admin Accounts Tab Component ==========
const AdminAccountsTab: React.FC = () => {
  //========== State Management ==========
  const [accounts, setAccounts] = useState<AdminAccount[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<AdminAccount | null>(
    null,
  );
  const [pendingRemove, setPendingRemove] = useState<AdminAccount | null>(null);
  const [isRemoving, setIsRemoving] = useState(false);
  const axios = useAxios();

  // ============= fetch admin accounts from API (placeholder) =============
  const fetchAccounts = async () => {
    try {
      const response = await axios.get("/users/admin/");
      console.log("Fetched admin accounts:", response);
      setAccounts(response.data.data);
    } catch (error) {
      console.error("Failed to fetch admin accounts:", error);
    }
  };
  useEffect(() => {
    fetchAccounts();
  }, []);

  //========== Handle Additions ==========
  const handleAddAdmin = async (newAccount: Omit<AdminAccount, "id">) => {
    console.log("Adding new admin account:", newAccount);
    const body = {
      full_name: newAccount.full_name,
      email: newAccount.email,
      role: newAccount.role,
      password: newAccount.password,
      confirm_password: newAccount.confirm_password,
    };
    const response = await axios.post("/users/admin/", body);
    if (response.status === 200 || response.status === 201) {
      fetchAccounts();
      toastManager.add({
        type: "success",
        title: "Admin Added",
        description: `${body.full_name} has been added successfully`,
      });
    } else {
      toastManager.add({
        type: "error",
        title: "Failed to Add Admin",
        description: `There was an error adding ${body.full_name} as an admin`,
      });
    }
  };

  const getStatus = (
    account: AdminAccount,
  ): "active" | "suspended" | "pending" => {
    if (account.is_suspended) return "suspended";
    if (account.is_active) return "active";
    if (account.status === "inactive") return "suspended";
    if (account.status === "active") return "active";
    return "pending";
  };

  const handleEdit = (account: AdminAccount) => {
    setSelectedAccount(account);
    setIsEditModalOpen(true);
  };

  const handleUpdateAdmin = async (updatedAccount: AdminAccount) => {
    // console.log("Updating admin account:", updatedAccount);
    const body = {
      full_name: updatedAccount.name,
      email: updatedAccount.email,
      role: updatedAccount.role,
      status: updatedAccount.status,
    };
    const response = await axios.put(
      `/users/admin/${updatedAccount.id}/`,
      body,
    );

    console.log("Update response:", response);
    if (response.status === 200) {
      fetchAccounts();
      toastManager.add({
        type: "success",
        title: "Admin Updated",
        description: `${updatedAccount.full_name} has been updated successfully`,
      });
    } else {
      toastManager.add({
        type: "error",
        title: "Failed to Update Admin",
        description: `There was an error updating ${updatedAccount.full_name}'s account`,
      });
    }
  };

  const handleRemove = (account: AdminAccount) => {
    setPendingRemove(account);
  };

  const confirmRemove = async () => {
    if (!pendingRemove) return;
    try {
      setIsRemoving(true);
      const response = await axios.delete(`/users/admin/${pendingRemove.id}/`);
      if (response.status === 204 || response.status === 200) {
        fetchAccounts();
        toastManager.add({
          type: "success",
          title: "Admin Removed",
          description: `${pendingRemove.full_name} has been removed successfully`,
        });
      } else {
        toastManager.add({
          type: "error",
          title: "Failed to Remove Admin",
          description: `There was an error removing ${pendingRemove.full_name}'s account`,
        });
      }
    } catch (error) {
      toastManager.add({
        type: "error",
        title: "Failed to Remove Admin",
        description: `There was an error removing ${pendingRemove.full_name}'s account`,
      });
    } finally {
      setIsRemoving(false);
      setPendingRemove(null);
    }
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
                getStatus={getStatus}
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

      <Dialog
        open={!!pendingRemove}
        onOpenChange={(open) => !open && setPendingRemove(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove admin?</DialogTitle>
            <DialogDescription>
              This action cannot be undone.{" "}
              {pendingRemove?.full_name || "This admin"} will lose access
              immediately.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setPendingRemove(null)}
              disabled={isRemoving}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmRemove}
              disabled={isRemoving}
            >
              {isRemoving ? "Removing..." : "Remove"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminAccountsTab;
