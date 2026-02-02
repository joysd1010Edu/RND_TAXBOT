"use client";
import React from "react";
import {
  Dialog,
  DialogPopup,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogPanel,
} from "@/components/ui/dialog";
import AddUserForm from "./AddUserForm";
import type { AddUserModalProps } from "@/Type/AdminDashboard/UserManagement";

//========== Add User Modal Component ==========
const AddUserModal: React.FC<AddUserModalProps> = ({
  isOpen,
  onClose,
  onAddUser,
}) => {
  const handleFormSubmit = (data: Parameters<typeof onAddUser>[0]) => {
    onAddUser(data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Create a new user account. Email and password are required fields.
          </DialogDescription>
        </DialogHeader>
        <DialogPanel>
          <AddUserForm onSubmit={handleFormSubmit} onCancel={onClose} />
        </DialogPanel>
      </DialogPopup>
    </Dialog>
  );
};

export default AddUserModal;
