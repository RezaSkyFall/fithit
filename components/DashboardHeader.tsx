import { LogoutOutlined } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material"
import Link from "next/link";

const DashboardHeader = () => {

    return (
        <Stack sx={{ p: 2,mb:2}} spacing={2} direction="row" alignItems={'center'}>
            <Typography>
                کاربر ادمین
            </Typography>

<Link href='/'>
            <Button startIcon={<LogoutOutlined />} >
                خروج
            </Button>
            </Link>
        </Stack>
    )
}
export default DashboardHeader;