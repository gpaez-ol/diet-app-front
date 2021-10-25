import { Container } from "@mui/material";
import { useState } from "react";
import Search from "../search/components/Search";
import Explore from "../explore/components/Explore";

export default function Browse() {
  const [isSearchActive, setIsSeachActive] = useState(false);

  return (
    <Container maxWidth="xl">
      <h1>Browse Diets</h1>
      <Search />
      <Explore />
    </Container>
  );
}
