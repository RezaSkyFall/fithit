import { Add,ChevronLeft,Clear } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import Link from 'next/link';

export default function EstatesList() {
const router = useRouter()

    const DataGridColumns = [
        {
            field: 'actions',
            type: 'actions',
            renderCell: (params) => (
                <Stack spacing={1} direction='row'>
                    <Button startIcon={<ChevronLeft/>} onClick={()=>router.push(`estates/${params.row._id}`)}>
                        باز کردن
                    </Button>
                    <Button startIcon={<Clear/>} color='error' onClick={()=>router.push(`estates/${params.row._id}`)}>
                       حذف
                    </Button>
                </Stack>
            ),
            width: 220,
          },
        {
            field: 'title',
            headerName: 'عنوان ویلا',   
            width: 160,

        },
        {
            field: 'code',
            headerName: 'کد',
            width: 160,

        },
        {
            field: 'serviceTypeTitle',
            headerName: 'نوع سرویس',
            width: 160,

        },
        {
            field: 'price',
            headerName: 'هزینه',
            width: 160,

        },
    ]

    const [EstatesListData, setEstatesListData] = useState([])

    const GetEstateListData = async () => {
        try {
            let estates = await axios.get('/api/estates');
            setEstatesListData(estates.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        GetEstateListData()
    }, [])


    return (
        <Stack spacing={1} sx={{ pl: 2, pr: 2 }}>
            <Typography variant="h6">
                لیست ویلا ها
            </Typography>

            <Stack direction='row' spacing={1} sx={{ p: 1 }}>
                <Link href='/admin/estates/0' passHref>
                <Button variant="contained" startIcon={<Add />}>
                    ویلا جدید
                </Button>
                </Link>
            </Stack>

            <Stack sx={{ minHeight: 450 }}>
                <DataGrid disableColumnMenu disableVirtualization hideFooter
                    columns={DataGridColumns} rows={EstatesListData} loading={EstatesListData.length === 0}
                    getRowId={(row) => row._id} />
            </Stack>
        </Stack>
    )
}