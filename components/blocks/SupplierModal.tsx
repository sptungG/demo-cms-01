import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

interface SupplierModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const SupplierModal: React.FC<SupplierModalProps> = ({ isOpen, onOpenChange }) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-8 w-full max-w-md z-50 max-h-[90vh] overflow-y-auto">
          <Dialog.Title className="text-2xl font-bold text-slate-900 mb-6">
            Become a Supplier
          </Dialog.Title>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="+84 xxx xxx xxx"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Product Category
              </label>
              <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                <option value="">Select a category</option>
                <option value="food-agriculture">Food & Agriculture</option>
                <option value="fashion-accessories">
                  Fashion & Accessories
                </option>
                <option value="furniture-home">Furniture & Home Decor</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Company Profile (PDF)
              </label>
              <input
                type="file"
                accept=".pdf"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <p className="text-sm text-slate-500 mt-1">
                Upload your company profile, certifications, and product
                catalog
              </p>
            </div>
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Submit Application
              </button>
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
              </Dialog.Close>
            </div>
          </form>
          <Dialog.Close asChild>
            <button className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <X className="w-6 h-6" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default SupplierModal;