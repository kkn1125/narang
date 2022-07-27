import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import PsychologyIcon from "@mui/icons-material/Psychology";
import ShareIcon from "@mui/icons-material/Share";
import DynamicSection from "../components/organisms/DynamicSection";
import { dark } from "@mui/material/styles/createPalette";

const firstSection = [
  {
    icon: <BorderColorIcon sx={{ fontSize: 60 }} />,
    title: "THE BEST LUXURY HOTELS",
    content:
      "From the latest trendy boutique hotel to the iconic palace with XXL pool, go for a mini-vacation just a few subway stops away from your home.",
  },
  {
    icon: <PsychologyIcon sx={{ fontSize: 60 }} />,
    title: "NEW EXPERIENCES",
    content:
      "Privatize a pool, take a Japanese bath or wake up in 900m2 of garden… your Sundays will not be alike.",
  },
  {
    icon: <ShareIcon sx={{ fontSize: 60 }} />,
    title: "EXCLUSIVE RATES",
    content:
      "By registering, you will access specially negotiated rates that you will not find anywhere else.",
  },
];

const secondsSection = [
  {
    index: 1,
    icon: <BorderColorIcon sx={{ fontSize: 60 }} />,
    content: "Appointment every Wednesday 9am.",
  },
  {
    index: 2,
    icon: <PsychologyIcon sx={{ fontSize: 60 }} />,
    content:
      "First come, first served. Our offers are in limited quantities, so be quick.",
  },
  {
    index: 3,
    icon: <ShareIcon sx={{ fontSize: 60 }} />,
    content:
      "New offers every week. New experiences, new surprises. Your Sundays will no longer be alike.",
  },
];

function Home() {
  return (
    <Box>
      <DynamicSection
        main
        title='UPGRADE YOUR SUNDAYS'
        titleSize='l'
        img='https://cdn.pixabay.com/photo/2020/05/24/11/14/sea-5213746_1280.jpg'
        slot={
          <Stack alignItems='center' gap={3}>
            <Typography variant='body1'>
              Enjoy secret offers up to -70% off the best luxury hotels every
              Sunday.
            </Typography>
            <Button size='large' variant='contained' color='error'>
              register
            </Button>
            <Typography variant='body2'>Discover the experience</Typography>
          </Stack>
        }
      />
      <DynamicSection background icons={firstSection} />
      <DynamicSection
        title='HOW IT WORKS'
        titleSize='m'
        icons={secondsSection}
      />
      <DynamicSection
        background
        slot={
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "100%",
            }}>
            <Box
              sx={{
                display: { xs: "none", md: "block" },
                position: "absolute",
                width: 550,
                height: 350,
                top: "40%",
                left: "calc(50% + 10vw)",
                zIndex: 0,
                transform: "translate(-50%,-50%)",
                backgroundImage:
                  "url('https://cdn.pixabay.com/photo/2022/04/13/11/02/dots-7130062_1280.png')",
                backgroundPosition: "left center",
                backgroundColor: "transparent",
                filter: "opacity(0.5)",
              }}
            />
            <Box
              sx={{
                display: { xs: "none", md: "block" },
                position: "absolute",
                width: 550,
                height: 350,
                top: "45%",
                left: "calc(55% + 10vw)",
                zIndex: 1,
                transform: "translate(-50%,-50%)",
                background:
                  "url('https://images.unsplash.com/photo-1527853787696-f7be74f2e39a?auto=format&fit=crop&w=750')",
              }}
            />
            <Stack
              component={Paper}
              elevation={15}
              gap={3}
              sx={{
                position: {
                  xs: "static",
                  md: "absolute",
                },
                width: {
                  xs: "100%",
                  md: 550,
                },
                height: 350,
                top: "60%",
                left: "calc(25% + 10vw)",
                zIndex: 2,
                backgroundColor: "#ffc071",
                transform: {
                  xs: "none",
                  md: "translate(-50%,-50%)",
                },
                px: 7,
                py: 5,
              }}>
              <Typography variant='h3' sx={{ fontWeight: 700 }}>
                CONTACT
              </Typography>
              <Typography variant='h6' sx={{ fontWeight: 300 }}>
                Taste the holidays of the everyday close to home.
              </Typography>
              <TextField
                variant='outlined'
                fullWidth
                sx={{ "& fieldset": { backgroundColor: "#ffffff" } }}
              />
              <Button
                fullWidth
                size='large'
                variant='contained'
                sx={{
                  backgroundColor: "black",
                  color: "white",
                }}>
                Submit
              </Button>
            </Stack>
          </Box>
        }
      />
    </Box>
  );
}

export default Home;
