import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

const PlaceOrderDialog = ({ open, onOpenChange, address, setAddress, onSubmit, loading }) => (
  <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
    <AlertDialog.Overlay className="fixed inset-0 bg-black opacity-30" />
    <AlertDialog.Content className="fixed top-1/2 left-1/2 max-w-md p-6 bg-white rounded-md shadow-lg -translate-x-1/2 -translate-y-1/2">
      <AlertDialog.Title className="text-lg font-bold mb-2">
        Enter Shipping Address
      </AlertDialog.Title>
      <AlertDialog.Description className="mb-4">
        Please fill in your shipping details to place the order.
      </AlertDialog.Description>
      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmit();
        }}
        className="space-y-2"
      >
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Full Name"
          required
          value={address.fullName}
          onChange={e => setAddress({ ...address, fullName: e.target.value })}
        />
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Phone"
          required
          value={address.phone}
          onChange={e => setAddress({ ...address, phone: e.target.value })}
        />
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Street"
          required
          value={address.street}
          onChange={e => setAddress({ ...address, street: e.target.value })}
        />
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="City"
          required
          value={address.city}
          onChange={e => setAddress({ ...address, city: e.target.value })}
        />
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="State"
          required
          value={address.state}
          onChange={e => setAddress({ ...address, state: e.target.value })}
        />
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Pin Code"
          required
          value={address.pinCode}
          onChange={e => setAddress({ ...address, pinCode: e.target.value })}
        />
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Country"
          required
          value={address.country}
          onChange={e => setAddress({ ...address, country: e.target.value })}
        />
        <div className="flex gap-3 justify-end mt-4">
          <AlertDialog.Cancel asChild>
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </button>
          </AlertDialog.Cancel>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            disabled={loading}
          >
            {loading ? "Placing..." : "Place Order"}
          </button>
        </div>
      </form>
    </AlertDialog.Content>
  </AlertDialog.Root>
);

export default PlaceOrderDialog;
