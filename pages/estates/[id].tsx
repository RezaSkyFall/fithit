import {
  CabinOutlined,
  ChairOutlined,
  ChevronLeft,
  FireplaceOutlined,
  LocalFireDepartmentOutlined,
  LocalParkingOutlined,
  MyLocationOutlined,
  OutdoorGrillOutlined,
  PoolOutlined,
  SegmentOutlined,
  WidgetsOutlined,
} from "@mui/icons-material";
import { Box, Grid, Paper, Stack, SvgIcon, Typography } from "@mui/material";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useEffect, useState } from "react";
import { PhotoAlbum } from "react-photo-album";
import dbConnect from "../../data/dbConnect";
import EstateModel from "../../models/EstateModel";
import { IEstate } from "../../types/IEstate";
import ImageGallery from "react-image-gallery";

import "react-image-gallery/styles/css/image-gallery.css";

interface EstateLandingProps {
  EstateData: IEstate;
}

const EstateLanding: NextPage<EstateLandingProps> = ({ EstateData }) => {
  const [Photos, setPhotos] = useState<any | undefined>([]);
  useEffect(() => {
    setPhotos(
      EstateData.images?.map((item) => ({
        original: `/images/estates/${item}`,
        width: 600,
        height: 480,
      }))
    );
  }, []);

  return (
    <Stack>
      <Stack spacing={4}>
        <Typography variant='h1' fontWeight={"medium"}>
          اجاره ویلا روزانه {EstateData.title}
        </Typography>

        <Stack sx={{ pl: 2, pr: 2 }}>
          <Stack>
            <Grid container spacing={8}>
              <Grid item xs={12} md={6}>
                <ImageGallery
                  items={Photos}
                  showPlayButton={false}
                  isRTL={true}
                  showThumbnails={true}
                  showBullets={true}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <TitleSection title={"مشخصات"} />

                  <Stack spacing={1} sx={{ pl: 2 }}>
                    <Typography
                      variant='body1'
                      whiteSpace={"pre-wrap"}
                      fontWeight={"medium"}
                    >
                      {EstateData.description}
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={2}>
                  <Stack spacing={1}>
                    <TitleSection
                      title={"آدرس"}
                      icon={<MyLocationOutlined />}
                    />
                    <Stack spacing={1} sx={{ pl: 2 }}>
                      <Typography variant='body1' fontWeight={"medium"}>
                        {EstateData.address}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={3}>
                  <TitleSection
                    title={"امکانات ویلا"}
                    icon={<WidgetsOutlined />}
                  />

                  <Stack sx={{ pl: 2, pr: 2 }}>
                    <Grid container spacing={2.5}>
                      <Grid item xs={6} md={3} lg={2}>
                        <EstateProperty
                          text='استخر'
                          icon={<PoolOutlined />}
                          isHave={EstateData.hasPool}
                        />
                      </Grid>
                      <Grid item xs={6} md={3} lg={2}>
                        <EstateProperty
                          text='آتشکده'
                          icon={<FireplaceOutlined />}
                          isHave={EstateData.hasFireplace}
                        />
                      </Grid>
                      <Grid item xs={6} md={3} lg={2}>
                        <EstateProperty
                          text='باربیکیو'
                          icon={<OutdoorGrillOutlined />}
                          isHave={EstateData.hasBarbecue}
                        />
                      </Grid>
                      <Grid item xs={6} md={3} lg={2}>
                        <EstateProperty
                          text='مبلمان'
                          icon={<ChairOutlined />}
                          isHave={EstateData.hasFurniture}
                        />
                      </Grid>
                      <Grid item xs={6} md={3} lg={2}>
                        <EstateProperty
                          text='آلاچیق'
                          icon={<CabinOutlined />}
                          isHave={EstateData.hasGazebo}
                        />
                      </Grid>
                      <Grid item xs={6} md={3} lg={2}>
                        <EstateProperty
                          text='پارکینگ'
                          icon={<LocalParkingOutlined />}
                          isHave={EstateData.hasParking}
                        />
                      </Grid>
                    </Grid>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

const EstateProperty = ({
  icon,
  text,
  isHave,
}: {
  icon: any;
  text: any;
  isHave: boolean;
}) => {
  return (
    <Paper>
      <Stack
        spacing={1}
        alignItems='center'
        sx={{ color: isHave ? "primary.light" : "text.secondary", p: 2 }}
      >
        <SvgIcon sx={{ fontSize: 32 }}>{icon}</SvgIcon>
        <Typography
          align='center'
          variant='body1'
          sx={{ textDecoration: isHave ? "normal" : "line-through" }}
        >
          {text}
        </Typography>
        {/* <Box
        sx={{
          height: 2,
          backgroundColor: isHave ? "primary.light" : "text.secondary",
          width: "100%",
        }}
      /> */}
      </Stack>
    </Paper>
  );
};
const TitleSection = ({
  title,
  icon = <SegmentOutlined />,
}: {
  title: string;
  icon?: any;
}) => {
  return (
    <Stack direction='row' spacing={1.5} alignItems='center'>
      <Paper variant='outlined'>
        <Stack sx={{ p: 2, color: "primary.main" }}>
          <SvgIcon>{icon}</SvgIcon>
        </Stack>
      </Paper>
      <Typography variant='h4' fontWeight={"medium"}>
        {title}
      </Typography>
    </Stack>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  await dbConnect();
  let estates = await EstateModel.find({});

  const paths = estates.map((item) => ({
    params: {
      id: item._id.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};
export const getStaticProps: GetStaticProps = async (context) => {
  // ...
  let EstateData;

  try {
    await dbConnect();
    console.log(context.params);
    let data = await EstateModel.findOne({ _id: context.params?.id });
    EstateData = JSON.parse(JSON.stringify(data)) as IEstate;
  } catch (error) {
    console.log(error);
  }

  if (!EstateData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      EstateData,
    },
  };
};

export default EstateLanding;
