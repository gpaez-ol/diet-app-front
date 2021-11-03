import { Container } from "@mui/material";
import { useState } from "react";
import Search from "../search/components/Search";
import Explore from "../explore/components/Explore";

export default function Browse() {
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleSearchActivation = (searchStatus: boolean) => {
    setIsSearchActive(searchStatus);
  };

  return (
    <Container maxWidth="xl">
      <h1>Browse Diets</h1>
      <Search {...{isSearchActive, handleSearchActivation}} />
      {
        !isSearchActive && <Explore />
      }
    </Container>
  );
}
