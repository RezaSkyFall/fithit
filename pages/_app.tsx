import type { AppProps } from "next/app";
import AppTheme from "../libs/AppTheme";
import RightToLeft from "../libs/RightToLeft";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import { Stack } from "@mui/material";
import DashboardHeader from "../components/DashboardHeader";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const isAdminDashboard = router.pathname.startsWith("/admin") ? true : false;

  return (
    <RightToLeft>
      <AppTheme>
        {isAdminDashboard ? (
          <Stack>
            <DashboardHeader />
            <Component {...pageProps} />
          </Stack>
        ) : (
          <>
            <Navbar>
              <Component {...pageProps} />
            </Navbar>
            <Footer />
          </>
        )}
      </AppTheme>
    </RightToLeft>
  );
}

export default MyApp;
