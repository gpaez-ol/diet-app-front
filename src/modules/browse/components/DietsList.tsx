import { Container } from "@mui/material";
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import Slider from "./Slider";
import DietCategory from "../types/DietCategory";
import DietCard from "../../general/components/DietCard";
import Diet from "../../general/interfaces/Diet";
import DietInfoCard from "./DietInfoCard";

export default function DietsList(props: DietCategory) {
  const SliderProps = {
    zoomFactor: 30, // How much the image should zoom on hover in percent
    slideMargin: 10, // Margin on each side of slides
    maxVisibleSlides: 5,
    pageTransition: 500, // Transition when flipping pages
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeDiet, setActiveDiet] = useState<Diet>({} as Diet);

  const handleDialogOpen = (diet: Diet) => {
    setIsDialogOpen(true);
    setActiveDiet(diet);
  };

  const diets: Diet[] = [
    {
      name: "diet1",
      description: "Some nice description for a diet. blah blah banana banana",
    },
    {
      name: "diet2",
      description: "Some nice description for a diet. blah blah banana banana",
    },
    {
      name: "diet3",
      description: "Some nice description for a diet. blah blah banana banana",
    },
    {
      name: "diet4",
      description: "Some nice description for a diet. blah blah banana banana",
    },
    {
      name: "diet5",
      description: "Some nice description for a diet. blah blah banana banana",
    },
    {
      name: "diet6",
      description: "Some nice description for a diet. blah blah banana banana",
    },
    {
      name: "diet7",
      description: "Some nice description for a diet. blah blah banana banana",
    },
    {
      name: "diet8",
      description: "Some nice description for a diet. blah blah banana banana",
    },
    {
      name: "diet9",
      description: "Some nice description for a diet. blah blah banana banana",
    },
    {
      name: "diet10",
      description: "Some nice description for a diet. blah blah banana banana",
    },
  ];

  return (
    <Container maxWidth="xl">
      <h2>{props.name}</h2>
      <Dialog onClose={() => setIsDialogOpen(false)} open={isDialogOpen}>
        <DietInfoCard {...activeDiet} />
      </Dialog>
      <Slider {...SliderProps}>
        {diets.map((diet) => (
          <div onClick={() => handleDialogOpen(diet)}>
            <DietCard {...diet} />
          </div>
        ))}
      </Slider>
    </Container>
  );
}
