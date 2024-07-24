"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import store from "@/store/store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <title>HR Gravitech</title>
      <body className={"max-h-full"}>
        <Provider store={store}>
          <main className="h-max">{children}</main>
        </Provider>
      </body>
    </html>
  );
}
