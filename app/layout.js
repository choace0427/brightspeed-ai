import { Inter } from "next/font/google";
import "./globals.css";
import MainLayout from "./components/layouts/MainLayout";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BrightSpeed.ai",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MantineProvider defaultColorScheme="light">
          <MainLayout children={children} />
          <ToastContainer />
        </MantineProvider>
      </body>
    </html>
  );
}
