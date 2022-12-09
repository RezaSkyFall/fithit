import {
  ChevronLeft,
  FiberManualRecord,
  LoginOutlined,
  PhoneEnabled,
} from "@mui/icons-material";
import {
  Button,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const pageLinks = [
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

  return (
    <Stack spacing={1} sx={{ mt: 1, backgroundColor: "background.paper" }}>
      <Divider />

      <Stack>
        <Container maxWidth='xl'>
          <Stack>
            <Grid container spacing={2}>
              <Grid item xs={12} md={5}>
                <Stack>
                  <Stack direction='row' spacing={1} alignItems='center'>
                    <Image
                      src='/images/logo-primary.svg'
                      width={42}
                      height={42}
                    />
                    <Typography variant='h6' fontWeight={"bold"}>
                      vilanil.ir | ویلانیل
                    </Typography>
                  </Stack>

                  <Typography
                    variant='body1'
                    color='text.secondary'
                    sx={{ p: 1 }}
                  >
                    سایت ویلانیل با هدف اجاره ، خرید و فروش ویلا در سراسر اصفهان
                    راه اندازی گردیده شده تا مشتریان در یک محیط امن و با شفافیت
                    معاملات خود را انجام دهند.
                  </Typography>

                  <Stack spacing={1}>
                    <Typography variant='h6'>صفحات</Typography>

                    <List
                      sx={{
                        color: "text.secondary",
                        display: "inline-flex",
                        flexWrap: "wrap",
                      }}
                      dense
                    >
                      {pageLinks.map((item, index) => (
                        <ListItemButton key={index}>
                          <ListItemText>{item.title}</ListItemText>
                        </ListItemButton>
                      ))}
                    </List>
                  </Stack>
                </Stack>
              </Grid>

              <Grid item xs={12} md={4}>
                <Stack spacing={1}>
                  <Typography variant='h5'>راه های ارتباطی</Typography>

                  <Paper variant='outlined'>
                    <Stack spacing={1} sx={{ p: 2 }} direction='row'>
                      <PhoneEnabled />
                      <Typography>0933-116-3183</Typography>
                    </Stack>
                  </Paper>

                  <List>
                    <ListItemButton>
                      <ListItemIcon>
                        <PhoneEnabled />
                      </ListItemIcon>
                      <ListItemText>0933-116-3183</ListItemText>
                    </ListItemButton>
                  </List>
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </Container>
      </Stack>
      <Divider />

      <Stack
        sx={{ p: 1 }}
        alignItems='center'
        spacing={2}
        direction='row'
        justifyContent='center'
        flexWrap='wrap'
      >
        <Typography variant='body2' color='text.secondary'>
          کلیه حقوق سایت محفوظ میباشد. 2022 © VilaNil.ir
        </Typography>

        <Link href='/admin/estates'>
          <Button startIcon={<LoginOutlined />} color='inherit' size='small'>
            ورود
          </Button>
        </Link>
      </Stack>
    </Stack>
  );
};

export default Footer;
