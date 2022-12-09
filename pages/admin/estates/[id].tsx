import {
  Autocomplete,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Save, ChevronLeft } from "@mui/icons-material";
import { NumericTextFeild } from "../../../utils/NumericTextField";
import { FileUploader } from "react-drag-drop-files";
import { EstateServiceType, IEstate } from "../../../types/IEstate";

export default function EstateItem() {
  const router = useRouter();
  const { id } = router.query;

  const serviceTypesOptions = [
    { label: "اجاره روزانه", id: 10 },
    { label: "خرید", id: 20 },
    { label: "فروش", id: 30 },
  ];
  const fileTypes = ["JPG", "JPEG", "PNG", "GIF"];

  const [EstateData, setEstateData] = useState<IEstate | undefined>(undefined);

  const GetEstateData = async () => {
    try {
      let estate = await axios.get(`/api/estates/${id}`);
      setEstateData(estate.data);
    } catch (error) {
      console.log(error);
    }
  };
  const SubmitChanges = async () => {
    try {
      console.log(EstateData);
      if (id == "0") {
        let estate = await axios.post(`/api/estates/${id}`, EstateData);
      } else {
        let estate = await axios.patch(`/api/estates/${id}`, EstateData);
      }
      router.back();
    } catch (error) {
      console.log(error);
    }
  };
  const onInputChanges = (evt: any) => {
    const value =
      evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    setEstateData((curr) => ({
      ...curr,
      [evt.target.name]: value,
    }));
  };
  const handleUploadImage = (files) => {
    console.log(files);
    let _images = [];

    for (let index = 0; index < files.length; index++) {
      _images.push(files[index].name);
    }
    setEstateData((curr) => ({ ...curr, images: _images }));
  };

  useEffect(() => {
    if (id == "0") {
      setEstateData({
        title: "",
        price: 0,
        address: "",
        rooms: 0,
        poolType: "Outdoor",
        hasPool: true,
        peopleCapacity: 0,
        hasParking: true,
        images: [],
        code: 0,
        serviceType: EstateServiceType.DailyRent,
        areaSize: 0,
        buildingSize: 0,
        hasFireplace: false,
        hasBarbecue: true,
        hasFurniture: true,
        hasGazebo: true,
        instagramPostLink: "",
        tags: [],
        description: "",
      });
    } else {
      GetEstateData();
    }
  }, []);

  if (!EstateData)
    return (
      <Stack alignItems='center'>
        <CircularProgress />
      </Stack>
    );

  return (
    <Container maxWidth='xl'>
      <Stack spacing={1}>
        <Typography variant='h5'>مدیریت ویلا</Typography>

        <Grid container spacing={1.5}>
          <Grid item xs={12} md={3}>
            <TextField
              label='نام ویلا'
              fullWidth
              size='small'
              value={EstateData.title}
              name='title'
              onChange={onInputChanges}
              required
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              label='کد'
              fullWidth
              size='small'
              value={EstateData.code}
              name='code'
              onChange={onInputChanges}
              required
            />
          </Grid>
          <Grid item xs={12} md={7} />
          <Grid item xs={12} md={3}>
            <TextField
              label='قیمت'
              fullWidth
              size='small'
              value={EstateData.price}
              name='price'
              onChange={onInputChanges}
              InputProps={{ inputComponent: NumericTextFeild }}
              dir='ltr'
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Autocomplete
              disablePortal
              openOnFocus
              fullWidth
              options={serviceTypesOptions}
              value={EstateData.serviceTypeTitle}
              onChange={(event, newValue) => {
                setEstateData((curr) => ({
                  ...curr,
                  serviceTypeCode: newValue ? newValue.id : 0,
                }));
                setEstateData((curr) => ({
                  ...curr,
                  serviceTypeTitle: newValue ? newValue.label : "",
                }));
              }}
              renderInput={(params) => (
                <TextField {...params} label='سرویس' size='small' required />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='آدرس'
              fullWidth
              size='small'
              value={EstateData.address}
              name='address'
              onChange={onInputChanges}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant='h6'>مشخصات</Typography>
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              label='ظرفیت'
              fullWidth
              size='small'
              value={EstateData.peopleCapacity}
              name='peopleCapacity'
              onChange={onInputChanges}
              required
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              label='تعداد خواب'
              fullWidth
              size='small'
              value={EstateData.rooms}
              name='rooms'
              onChange={onInputChanges}
              required
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Autocomplete
              disablePortal
              openOnFocus
              fullWidth
              options={[
                {
                  id: "Outdoor",
                  label: "سرباز",
                },
                {
                  id: "Indoor",
                  label: "سرپوشیده",
                },
              ]}
              value={EstateData.poolTypeTitle}
              onChange={(event, newValue) => {
                setEstateData((curr) => ({
                  ...curr,
                  poolType: newValue ? newValue.id : "",
                }));
                setEstateData((curr) => ({
                  ...curr,
                  poolTypeTitle: newValue ? newValue.label : "",
                }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='نوع استخر'
                  size='small'
                  required
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1} direction='row'>
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    name='hasPool'
                    value={EstateData.hasPool}
                    onChange={onInputChanges}
                  />
                }
                label='استخر دارد ؟'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    name='hasParking'
                    value={EstateData.hasParking}
                    onChange={onInputChanges}
                  />
                }
                label='پارکینگ دارد ؟'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name='hasFireplace'
                    value={EstateData.hasFireplace}
                    onChange={onInputChanges}
                  />
                }
                label='آتشکده دارد ؟'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name='hasBarbecue'
                    value={EstateData.hasBarbecue}
                    onChange={onInputChanges}
                  />
                }
                label='باربیکیو دارد ؟'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name='hasFurniture'
                    value={EstateData.hasFurniture}
                    onChange={onInputChanges}
                  />
                }
                label='مبلمان دارد ؟'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name='hasGazebo'
                    value={EstateData.hasGazebo}
                    onChange={onInputChanges}
                  />
                }
                label='آلاچیق دارد ؟'
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label='توضیحات'
              fullWidth
              size='small'
              multiline
              rows={5}
              value={EstateData.description}
              name='description'
              onChange={onInputChanges}
            />
          </Grid>

          <Grid item xs={12}>
            <Stack spacing={1}>
              <Typography variant='body2'>تصاویر</Typography>

              <FileUploader
                handleChange={handleUploadImage}
                name='file'
                types={fileTypes}
                multiple={true}
              />

              {EstateData.images && EstateData.images.length > 0 ? (
                EstateData.images.map((item, index) => (
                  <Typography variant='caption' key={index}>
                    {item}
                  </Typography>
                ))
              ) : (
                <Typography variant='caption'>بدون تصویر</Typography>
              )}
            </Stack>
          </Grid>
        </Grid>

        <Paper variant='outlined' sx={{ p: 1 }}>
          <Stack direction='row' justifyContent='center' spacing={1}>
            <Button
              startIcon={<Save />}
              disableElevation
              variant='contained'
              onClick={SubmitChanges}
            >
              ثبت
            </Button>
            <Button
              startIcon={<ChevronLeft />}
              variant='outlined'
              onClick={() => router.back()}
            >
              بازگشت
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
