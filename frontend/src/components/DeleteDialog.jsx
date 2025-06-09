import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

const DeleteDialog = ({ open, onOpenChange, onConfirm }) => (
  <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
    <AlertDialog.Overlay className="fixed inset-0 bg-black opacity-30" />
    <AlertDialog.Content className="fixed top-1/2 left-1/2 max-w-md p-6 bg-white rounded-md shadow-lg -translate-x-1/2 -translate-y-1/2">
      <AlertDialog.Title className="text-lg font-bold mb-2">
        Remove Item
      </AlertDialog.Title>
      <AlertDialog.Description className="mb-4">
        Are you sure you want to remove this item from your cart?
      </AlertDialog.Description>
      <div className="flex gap-3 justify-end">
        <AlertDialog.Cancel asChild>
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </button>
        </AlertDialog.Cancel>
        <AlertDialog.Action asChild>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={onConfirm}
          >
            Yes, Remove
          </button>
        </AlertDialog.Action>
      </div>
    </AlertDialog.Content>
  </AlertDialog.Root>
);

export default DeleteDialog;
