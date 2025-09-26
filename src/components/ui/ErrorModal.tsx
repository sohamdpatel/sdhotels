// components/ErrorModalClient.tsx
"use client";

import Modal from "./Modal";

export default function ErrorModalClient({ message }: { message: string }) {
  return (
    <Modal
      // disable close if you want to force refresh
      onClose={() => window.location.reload()}
      disableClose={true}
    >
      <div className="text-center space-y-4">
        <h2 className="text-lg font-semibold">Something went wrong</h2>
        <p className="text-gray-700 dark:text-gray-300">{message}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Refresh
        </button>
      </div>
    </Modal>
  );
}
