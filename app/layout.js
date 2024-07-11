import { Inter } from "next/font/google";
import "./globals.css";
import MainLayout from "./components/layouts/MainLayout";
import { MantineProvider, createTheme } from "@mantine/core";
import { ToastContainer, toast } from "react-toastify";

import "react-photo-view/dist/react-photo-view.css";
import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "react-phone-input-2/lib/bootstrap.css";
import "@mantine/dates/styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BrightSpeed.ai",
  description: "",
};

const theme = createTheme({
  breakpoints: {
    xs: "30em",
    sm: "48em",
    md: "64em",
    lg: "74em",
    xl: "90em",
  },
  autoContrast: true,
  luminanceThreshold: 0.7,
  // colors: {
  //   light: {
  //     body: "#ffffff",
  //   },
  //   dark: {
  //     body: "#000000", // Dark mode body color
  //   },
  // },
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
          <MainLayout children={children} />
          <ToastContainer />
        </MantineProvider>
      </body>
    </html>
  );
}
