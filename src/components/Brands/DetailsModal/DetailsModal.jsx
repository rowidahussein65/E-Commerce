import { Dialog } from '@headlessui/react';

export default function DetailsModal({ isOpen, onClose, brand }) {
  if (!brand) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="fixed inset-0 bg-gray-500/75" aria-hidden="true" />
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 z-50">
        <Dialog-Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:scale-100">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="">
              <div className="mx-auto  h-60 w-60  items-center justify-center object-contain">
                <img src={brand.image} alt={brand.title} className="object-contain" />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <Dialog-Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  {brand.title}
                </Dialog-Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Here you can add more info about the brand.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
            >
              Close
            </button>
          </div>
        </Dialog-Panel>
      </div>
    </Dialog>
  );
}
