import { useEffect, useState } from "react";
import SearchProps from "../interfaces/SearchProps";
import { DietCategory } from "../../types/DietCategory";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

export default function Search(props: SearchProps) {
  const [dietNameSearch, setDietNameSearch] = useState<string>("");
  const [dietCategoriesSearch, setDietCategoriesSearch] = useState<
    DietCategory[]
  >([]);

  const updateDietNameSearch = (newDietNameSearch: string) => {
    setDietNameSearch(newDietNameSearch);
  };

  const updateDietCategoriesSearch = (
    newDietCategoriesSearch: DietCategory[]
  ) => {
    setDietCategoriesSearch(newDietCategoriesSearch);
  };

  useEffect(() => {
    props.handleSearchActivation(
      dietNameSearch.length > 0 || dietCategoriesSearch?.length > 0
    );
  });

  return (
    <>
      <h2>Search for a Diet</h2>
      <SearchBar {...{ updateDietNameSearch, updateDietCategoriesSearch }} />
      {props.isSearchActive && (
        <SearchResults {...{ dietNameSearch, dietCategoriesSearch }} />
      )}
    </>
  );
}
