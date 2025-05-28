import React, { createContext, useState } from "react";

export const SalesContext = createContext();

export function SalesProvider({ children }) {
  const [sales, setSales] = useState([
    {
      id: 1,
      invoice: "INV-001",
      customerId: 1,
      date: "2025-05-10",
      total: 1500000,
      status: "Lunas",
    },
    {
      id: 2,
      invoice: "INV-002",
      customerId: 2,
      date: "2025-05-11",
      total: 250000,
      status: "Belum Lunas",
    },
  ]);

  return (
    <SalesContext.Provider value={{ sales, setSales }}>
      {children}
    </SalesContext.Provider>
  );
}
