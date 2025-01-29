"use client";

import { SessionProvider } from "next-auth/react";
import React, { useState, useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

const ClientProvider = ({ children }: Props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a loading spinner
  }

  return <SessionProvider>{children}</SessionProvider>;
};

export default ClientProvider;