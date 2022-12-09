import {
  ChevronLeft,
  GroupsOutlined,
  ImageOutlined,
  LocalParking,
  MeetingRoomOutlined,
  PoolOutlined,
} from "@mui/icons-material";
import {
  Button,
  Card,
  Stack,
  SvgIcon,
  Typography,
  useTheme,
  Link as MuiLink,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { IEstate } from "../types/IEstate";
import { thousandsSeparators } from "../utils/numberFormater";

export default function RentEstateCard({ data }: { data: IEstate }) {
  const theme = useTheme();

  return (
    <Link href={`estates/${data._id}`} passHref>
      <MuiLink underline='none'>
        <Card
          sx={{ cursor: "pointer", minWidth: 360 }}
          elevation={theme.palette.mode == "dark" ? 0 : 3}
          variant={theme.palette.mode == "dark" ? "outlined" : "elevation"}
        >
          <Stack spacing={1.5} sx={{ p: 1 }}>
            <Stack sx={{ height: 220 }}>
              {data.images && data.images.length > 0 ? (
                <Image
                  src={"/images/estates/" + data.images[0]}
                  layout='responsive'
                  width='100%'
                  height='220'
                  style={{ borderRadius: theme.shape.borderRadius }}
                  objectFit='cover'
                />
              ) : (
                <Stack
                  spacing={1}
                  justifyContent='center'
                  alignItems='center'
                  sx={{ color: "text.secondary", height: "100%" }}
                >
                  <SvgIcon sx={{ fontSize: 48 }}>
                    <ImageOutlined />
                  </SvgIcon>
                  <Typography variant='body1'>بدون تصویر</Typography>
                </Stack>
              )}
            </Stack>

            <Stack sx={{ pl: 1, pr: 1 }}>
              <Typography variant='h5' fontWeight={"bold"}>
                {data.title}
              </Typography>
              {/* <Typography variant='body1' color={"text.secondary"}>
                {data.address}
              </Typography> */}

              <Stack spacing={1} direction='row' sx={{ p: 1, pt: 2 }}>
                <Stack
                  spacing={0.5}
                  sx={{ color: "text.secondary" }}
                  alignItems='center'
                  flexGrow={1}
                >
                  <SvgIcon sx={{ fontSize: 28 }}>
                    <PoolOutlined />
                  </SvgIcon>

                  <Typography variant='caption'>
                    {"استخر " +
                      (data.poolType == "Indoor" ? "سرباز" : "سرپوشیده")}
                  </Typography>
                </Stack>

                <Stack
                  spacing={0.5}
                  sx={{ color: "text.secondary" }}
                  alignItems='center'
                  flexGrow={1}
                >
                  <SvgIcon sx={{ fontSize: 28 }}>
                    <MeetingRoomOutlined />
                  </SvgIcon>

                  <Typography variant='caption'>
                    {data.rooms + " خواب "}
                  </Typography>
                </Stack>

                <Stack
                  spacing={0.5}
                  sx={{ color: "text.secondary" }}
                  alignItems='center'
                  flexGrow={1}
                >
                  <SvgIcon sx={{ fontSize: 28 }}>
                    <LocalParking />
                  </SvgIcon>

                  <Typography variant='caption'>
                    {"پارکینگ " + (data.hasParking ? "دارد" : "ندارد")}
                  </Typography>
                </Stack>

                <Stack
                  spacing={0.5}
                  sx={{ color: "text.secondary" }}
                  alignItems='center'
                  flexGrow={1}
                >
                  <SvgIcon sx={{ fontSize: 28 }}>
                    <GroupsOutlined />
                  </SvgIcon>

                  <Typography variant='caption'>
                    {"ظرفیت " + (data.peopleCapacity + " نفر")}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>

            <Stack
              spacing={1}
              direction='row'
              alignItems='center'
              sx={{ pl: 1, pr: 1 }}
            >
              <Typography variant='body1' color='text.secondary'>
                اجاره شبی
              </Typography>
              <Typography variant='h6'>
                {thousandsSeparators(data.price)}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                تومان
              </Typography>
            </Stack>

            <Button startIcon={<ChevronLeft />}>بیشتر</Button>
          </Stack>
        </Card>
      </MuiLink>
    </Link>
  );
}
