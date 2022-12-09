import { Grid, Stack, Typography } from "@mui/material";
import { NextPage } from "next";
import Image from "next/image";

const ContactUs: NextPage = () => {

    return (
        <Stack spacing={2}>
            <Typography variant="h1" color='primary' gutterBottom>
                تماس با ما ویلانیل
            </Typography>

            <Stack spacing={2}>

                {/* phone numers */}
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3} lg={2}>
                        <Stack>
                            <Stack sx={{ height: 220 }}>
                                <Image src='/images/customer-service.gif' layout='responsive' width='100%' height='220px'
                                    objectFit='contain' />
                            </Stack>

                            <Typography variant='h5' align="center" color={'#4252FF'}>
                                شماره های تماس
                            </Typography>
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={9} lg={10}>
                        <Stack spacing={1} sx={{height:'100%'}} justifyContent='center'> 

                        <Typography variant="h6">
                            شما میتوانید در 24 ساعت شبانه روز در 7 روز هفته با شماره های زیر تماس حاصل فرمایید.
                        </Typography>
                        </Stack>
                        </Grid>
                </Grid>

            </Stack>
        </Stack>
    )
}

export default ContactUs;