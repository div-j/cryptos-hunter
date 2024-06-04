import { Container, Typography, makeStyles } from "@material-ui/core";
import React from "react";
import Carousel from "./Carousel";

const useStyles = makeStyles({
  banner: {
    backgroundImage: "url(./banner2.jpg)",
  },
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
  tagline:{
    display:'flex',
    height:'40%',
    textAlign:'center',
    flexDirection:'column',
    justifyContent:'center'
  }
});

function Banner() {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>

        <Typography
          variant="h2"
          style={{
              fontWeight: "bold",
              marginBottom: 25,
              fontFamily: "montserrat",
            }}
            >
          Crypto Hunter
        </Typography>
        <Typography
          variant="subtitle2"
          style={{
              color: "darkgray",
              textTransform:'uppercase',
              fontFamily: "montserrat",
            }}
            >
          Get all the Info regard your favorite Crypto Currency
        </Typography>
        
            </div>
            <Carousel/>

      </Container>
    </div>
  );
}

export default Banner;
