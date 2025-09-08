"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/redux/store"; // <-- your redux store
import { ReactNode, useState } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  // ✅ ensure new QueryClient is not re-created on every render
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ReduxProvider>
  );
}
