import { Container, Typography } from "@mui/material";
import React from "react";
import DietCard from './DietCard';

export interface Diet {
  title: string,
  text: string,
  img: string
}

export default function Dashboard() {

  let diets: Diet[] = [
    {title: "nose", text: "text", img: "none"},
    {title: "nose1", text: "text", img: "none"},
    {title: "nose2", text: "text", img: "none"},
    {title: "nose3", text: "text", img: "none"},
    {title: "nose4", text: "text", img: "none"},
    {title: "nose5", text: "text", img: "none"},
    {title: "nose6", text: "text", img: "none"}
  ];

  return (
    <Container maxWidth="lg" style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
      <Typography variant="h2" style={{margin: '10px'}}> Dashboard </Typography>
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
        {
          diets.map(diet => {
            return <DietCard {...diet} />
          })
        }
      </div>
    </Container>
  );
}
