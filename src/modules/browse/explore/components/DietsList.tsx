import { Container } from "@mui/material";
import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import Slider from "../../../general/components/Slider";
import DietCategory from "../../types/DietCategory";
import DietCard from "../../../general/components/DietCard";
import Diet from "../../../general/interfaces/Diet";
import DietInfoCard from "../../../general/components/DietInfoCard";
import { URLs } from "../../../general/utils/urls";

export default function DietsList(props: DietCategory) {
  const SliderProps = {
    zoomFactor: 30, // How much the image should zoom on hover in percent
    slideMargin: 10, // Margin on each side of slides
    maxVisibleSlides: 5,
    pageTransition: 500, // Transition when flipping pages
  };

  const [diets, setDiets] = useState<Diet[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeDiet, setActiveDiet] = useState<Diet>({} as Diet);

  const handleDialogOpen = (diet: Diet) => {
    setIsDialogOpen(true);
    setActiveDiet(diet);
  };

  useEffect(() => {
    async function fetchAPI() {
      let response = await fetch(
        URLs.diet + `?Page=1&PageSize=100&categoryIds=${props.id}`
      );
      let data = await response.json();
      let list: Diet[] = [];
      for (const short_diet of data.pagination) {
        const response = await fetch(URLs.diet + `/${short_diet.id}`);
        const data = await response.json();
        data.id = short_diet.id;
        list.push(data);
      }
      setDiets(list);
    }
    fetchAPI();
  }, []);

  return (
    <Container maxWidth="xl">
      <h2>{props.name}</h2>
      <Dialog onClose={() => setIsDialogOpen(false)} open={isDialogOpen}>
        <DietInfoCard {...activeDiet} />
      </Dialog>
      <Slider {...SliderProps}>
        {diets.map((diet) => (
          <div key={diet.id} onClick={() => handleDialogOpen(diet)}>
            <DietCard {...diet} />
          </div>
        ))}
      </Slider>
    </Container>
  );
}
