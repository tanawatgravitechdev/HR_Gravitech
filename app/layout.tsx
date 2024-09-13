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
      <body style={{ height: '100%'}}>
        <Provider store={store}>
          <main style={{ height: '100%'}}>{children}</main>
        </Provider>
      </body>
    </html>
  );
}
