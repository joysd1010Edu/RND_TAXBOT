import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/Components/Providers/AuthProvider";
import { AxiosProvider } from "@/Components/Providers/AxiosProvider";
import { RouteGuard } from "@/Components/Providers/RouteGuard";
import { ErrorPageProvider } from "@/Components/Providers/ErrorPageProvider";
import { PageTitleProvider } from "@/Components/Providers/PageTitleProvider";
import { AnchoredToastProvider, ToastProvider } from "@/Components/ui/toast";
import DashboardLayout from "@/Components/Layouts/DashboardLayout";

//========== Font Configuration ===========
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});




//========== Metadata ===========
export const metadata: Metadata = {
  title: "PATTENS - Tax Bot",
  description: "R&D Tax Bot Application",
};

//========== Root Layout ===========
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AxiosProvider>
          <AuthProvider>
            <ErrorPageProvider>
              <PageTitleProvider>
                <ToastProvider position="top-center">
                  <AnchoredToastProvider>
                    <RouteGuard>
                      <DashboardLayout>{children}</DashboardLayout>
                    </RouteGuard>
                  </AnchoredToastProvider>
                </ToastProvider>
              </PageTitleProvider>
            </ErrorPageProvider>
          </AuthProvider>
        </AxiosProvider>
      </body>
    </html>
  );
}
