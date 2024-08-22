import React, { useEffect, useState } from "react";
import { getHomePage } from "../api";
import { Box, Typography, useTheme } from "@mui/material";
import Header from "../components/Header";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import image1 from "../assets/TagProduct-Icone-Logo2.png";
import image2 from "../assets/cropped-Logo-ART-Industrie.png";
import image4 from "../assets/logo-marceau-footer.png";
import image5 from "../assets/logo-matrelec-header.png";
import image6 from "../assets/technimodern-logo-1.jpg";
import image7 from "../assets/temiq-logo-v2.png";
import image8 from "../assets/promalyon-logo-header.png";
import image9 from "../assets/Logo-icone-removebg-preview1.png";

const HomePage = () => {
  const [message, setMessage] = useState("");
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getHomePage();
      if (data.success) {
        setMessage(data.message);
      } else {
        setMessage("Hello, World !");
      }
    };

    fetchData();
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      width="100vw"
      sx={{
        background:
          "linear-gradient(150deg, #FFFFFF 5%, #EEC3A3 27%, #EAA56D 86%, #E56B01 99%)",
        overflow: "hidden",
      }}
    >
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: { lg: "250px", xs: "0" },
          padding: "20px",
          textAlign: "center",
          [theme.breakpoints.down("lg")]: {
            marginLeft: 0,
          },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: theme.typography.black.fontFamily,
            marginBottom: "20px",
          }}
        >
          Bienvenue sur votre portail !
        </Typography>

        <Box
          sx={{
            width: "90%",
            maxWidth: "1200px",
            boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.4)",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <Carousel
            showArrows={true}
            autoPlay={true}
            infiniteLoop={true}
            interval={3000}
            showThumbs={false}
            showStatus={false}
          >
            <div
              style={{
                padding: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <img
                src={image1}
                alt="Image 1"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <div
              style={{
                padding: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              {" "}
              <img
                src={image9}
                alt="Image 7"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <div
              style={{
                padding: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              {" "}
              <img
                src={image2}
                alt="Image 2"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <div
              style={{
                padding: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              {" "}
              <img
                src={image4}
                alt="Image 4"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <div
              style={{
                padding: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              {" "}
              <img
                src={image5}
                alt="Image 5"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <div
              style={{
                padding: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              {" "}
              <img
                src={image6}
                alt="Image 6"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <div
              style={{
                padding: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              {" "}
              <img
                src={image7}
                alt="Image 7"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <div
              style={{
                padding: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              {" "}
              <img
                src={image8}
                alt="Image 7"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </Carousel>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
