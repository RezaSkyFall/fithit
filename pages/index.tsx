import {
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import axios, { AxiosResponse } from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import RentEstateCard from "../components/RentEstateCard";
import { IEstate } from "../types/IEstate";

const Home: NextPage = () => {
  const [RecentRentalEstates, setRecentRentalEstates] = useState<IEstate[]>([
    // {
    //   title: 'کلبه چوبی',
    //   price: 1500000,
    //   address: 'اصفهان، کبوترآباد',
    //   hasParking: true,
    //   hasPool: true,
    //   peopleCapacity: 35,
    //   poolType: 'Outdoor',
    //   rooms: 1,
    //   images: ['https://vilanil.ir/images/estates/10/۲۰۲۱۰۷۰۸_۱۲۱۴۵۱.jpg']
    // },
    // {
    //   title: 'کلبه چوبی',
    //   price: 1500000,
    //   address: 'اصفهان، کبوترآباد',
    //   hasParking: true,
    //   hasPool: true,
    //   peopleCapacity: 35,
    //   poolType: 'Outdoor',
    //   rooms: 1,
    //   images: ['https://vilanil.ir/images/estates/11/۲۰۲۱۰۷۲۰_۱۸۲۵۵۹.jpg']
    // }, {
    //   title: 'کلبه چوبی',
    //   price: 1500000,
    //   address: 'اصفهان، کبوترآباد',
    //   hasParking: true,
    //   hasPool: true,
    //   peopleCapacity: 35,
    //   poolType: 'Outdoor',
    //   rooms: 1,
    //   images: ['https://vilanil.ir/images/estates/13/IMG_0030.jpg']
    // }, {
    //   title: 'کلبه چوبی',
    //   price: 1500000,
    //   address: 'اصفهان، کبوترآباد',
    //   hasParking: true,
    //   hasPool: true,
    //   peopleCapacity: 35,
    //   poolType: 'Outdoor',
    //   rooms: 1
    // },
  ]);

  const GetRecentRentalEstates = async () => {
    try {
      let res: AxiosResponse = await axios.get("api/estates");
      console.log(res.data);
      setRecentRentalEstates(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetRecentRentalEstates();
  }, []);

  return (
    <Stack spacing={6}>
      <Head>
        <title>ویلانیل | اجاره باغ و ویلا در اصفهان</title>
      </Head>

      <Stack>
        <Container maxWidth={false}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Stack spacing={2.5} sx={{ p: 2.5 }}>
                <Typography variant='h1' fontWeight={"medium"}>
                  <Stack component='span' color='primary.main'>
                    {"Vilanil.ir | ویلانیل"}
                  </Stack>
                  خدمات تخصصی باغ و ویلا در اصفهان
                </Typography>
                <Typography
                  variant='body1'
                  color='text.secondary'
                  sx={{ pl: 3, pr: 3 }}
                >
                  در این سایت خدماتی از قبیل خرید و فروش باغ و ویلا، اجاره ویلا،
                  طراحی و ساخت ساز و ... ارائه میگردد.
                </Typography>

                <Stack spacing={1} direction='row' justifyContent={"center"}>
                  <Button variant='contained' disableElevation>
                    اجاره روزانه
                  </Button>
                  <Button variant='contained' disableElevation color='inherit'>
                    خرید و فروش
                  </Button>
                  <Button variant='contained' disableElevation color='inherit'>
                    طراحی و ساخت و ساز
                  </Button>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Stack>

      <Stack>
        <Container maxWidth={false}>
          <Stack spacing={1.5}>
            <Typography variant='h3' fontWeight={"medium"}>
              اجاره باغ و ویلا در اصفهان
            </Typography>

            {/* <Stack sx={{ p: 2 }}>
              <Grid container spacing={1.5}>
                {RecentRentalEstates.map((item, index) => (
                  <Grid item xs={12} md={4} lg={3} key={index}>
                    <RentEstateCard data={item} />
                  </Grid>
                ))}
              </Grid>
            </Stack> */}
            <Stack
              direction={"row"}
              spacing={1.5}
              sx={{ overflowX: "scroll", pb: 1 }}
            >
              {RecentRentalEstates.map((item, index) => (
                <RentEstateCard data={item} key={index} />
              ))}
            </Stack>
          </Stack>
        </Container>
      </Stack>
    </Stack>
  );
};

export default Home;
