import {
  Call,
  Close,
  DarkModeOutlined,
  LightModeOutlined,
  MenuOutlined,
  PhoneEnabled,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Slide,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { ColorModeContext } from "../libs/AppTheme";

const Navbar = ({ children }: any) => {
  const navLinks = [
    {
      title: "خانه",
      href: "/",
    },
    {
      title: "ویلا ها",
      href: "/estates",
    },
    {
      title: "درباره",
      href: "/about",
    },
    {
      title: "تماس با ما",
      href: "/contact-us",
    },
  ];
  const router = useRouter();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const isMobileMode = !useMediaQuery("(min-width:600px)");
  const [openMobileNav, setOpenMobileNav] = useState(false);

  const isNavSelected = (nav: any) => {
    return nav.href === "/"
      ? router.pathname === "/"
      : router.pathname.startsWith(nav.href);
  };

  return (
    <Stack>
      {openMobileNav && (
        <Slide direction='down' in={true} mountOnEnter unmountOnExit>
          <Stack
            sx={{
              height: "100%",
              width: "100%",
              position: "fixed",
              overflowY: "scroll",
              backgroundColor: "background.paper",
              zIndex: 10000000,
              top: 0,
              bottom: 0,
            }}
          >
            <Stack spacing={1.5} sx={{ p: 2 }} alignItems='start'>
              <IconButton onClick={() => setOpenMobileNav(false)}>
                <Close />
              </IconButton>

              <List sx={{ p: 2 }}>
                {navLinks.map((item, index) => (
                  <Link key={index} href={item.href} passHref>
                    <ListItemButton onClick={() => setOpenMobileNav(false)}>
                      <Stack spacing={0.2}>
                        <Typography
                          variant='body1'
                          fontWeight={"bold"}
                          sx={{
                            color: isNavSelected(item)
                              ? "primary.main"
                              : "inherit",
                          }}
                        >
                          {item.title}
                        </Typography>

                        <Box
                          sx={{
                            height: 2,
                            borderRadius: 16,
                            backgroundColor: isNavSelected(item)
                              ? "primary.main"
                              : "transparent",
                          }}
                        />
                      </Stack>
                    </ListItemButton>
                  </Link>
                ))}
              </List>

              <Divider />

              <Stack justifyContent={"center"} direction='row'>
                <SideButtons theme={theme} colorMode={colorMode} />
              </Stack>
            </Stack>
          </Stack>
        </Slide>
      )}

      <AppBar
        elevation={0}
        color='transparent'
        position='sticky'
        sx={{
          backgroundColor:
            theme.palette.mode == "light"
              ? "rgba(255,255,255,0.72)"
              : "rgba(29,29,31,0.72)",
          backdropFilter:
            theme.palette.mode == "light"
              ? "saturate(180%) blur(20px)"
              : "saturate(180%) blur(20px)",
          borderBottom: "1px solid",
          borderBlockColor: (theme) =>
            theme.palette.mode == "dark" ? "#282828" : "#eceef0",
        }}
      >
        <Container maxWidth='xl'>
          <Stack direction='row' sx={{ p: 1 }} spacing={4} alignItems='center'>
            {isMobileMode && (
              <IconButton onClick={() => setOpenMobileNav(true)}>
                <MenuOutlined />
              </IconButton>
            )}

            <Link href='/' passHref>
              <Stack
                direction='row'
                spacing={1}
                alignItems='center'
                sx={{ cursor: "pointer" }}
                justifyContent={isMobileMode ? "end" : "start"}
              >
                <Image src='/images/logo-primary.svg' width={32} height={32} />
                <Typography variant='h6' fontWeight={"medium"}>
                  ویلانیل
                </Typography>
              </Stack>
            </Link>

            <Stack>
              {!isMobileMode && (
                <List sx={{ display: "inline-flex", p: 0 }} dense>
                  {navLinks.map((item, index) => (
                    <Link key={index} href={item.href} passHref>
                      <ListItemButton>
                        <Stack spacing={0.2}>
                          <Typography variant='body1'>{item.title}</Typography>

                          <Box
                            sx={{
                              height: 2,
                              borderRadius: 16,
                              backgroundColor: isNavSelected(item)
                                ? "primary.main"
                                : "transparent",
                            }}
                          />
                        </Stack>
                      </ListItemButton>
                    </Link>
                  ))}
                </List>
              )}
            </Stack>
            {!isMobileMode && <Stack sx={{ flexGrow: 1 }} />}

            {!isMobileMode && (
              <SideButtons theme={theme} colorMode={colorMode} />
            )}
          </Stack>
        </Container>
      </AppBar>

      <Stack sx={{ p: 1 }}>{children}</Stack>
    </Stack>
  );
};

function SideButtons({ theme, colorMode }: any) {
  return (
    <>
      <Stack direction='row' alignItems='center' spacing={1}>
        <Button startIcon={<PhoneEnabled />} color='inherit'>
          <span style={{ direction: "ltr" }}>0933 116 3183</span>
        </Button>

        <Typography fontSize={24}>|</Typography>

        <Button
          startIcon={
            theme.palette.mode === "dark" ? (
              <DarkModeOutlined />
            ) : (
              <LightModeOutlined />
            )
          }
          color='inherit'
          onClick={colorMode.toggleColorMode}
        >
          {theme.palette.mode === "dark" ? "تاریک" : "روشن"}
        </Button>
      </Stack>
    </>
  );
}

export default Navbar;
