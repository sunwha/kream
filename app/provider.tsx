"use client";
import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type Props = {
  children: React.ReactNode;
  // session?: Session | null;
};

export default function Providers({ children }: Props) {
  const queryClient = new QueryClient();
  return (
    // <SessionProvider session={session}>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    // </SessionProvider>
  );
}
