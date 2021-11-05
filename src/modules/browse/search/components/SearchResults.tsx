import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import DietCard from "../../../general/components/DietCard";
import Diet from "../../../general/interfaces/Diet";
import DietInfoCard from "../../components/DietInfoCard";
import SearchResultProps from "../interfaces/SearchResultProps";
import { URLs } from "../../../general/utils/urls";

export default function SearchResults(props: SearchResultProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeDiet, setActiveDiet] = useState<Diet>({} as Diet);

  const handleDialogOpen = (diet: Diet) => {
    setIsDialogOpen(true);
    setActiveDiet(diet);
  };

  const [searchResults, setSearchResults] = useState<Diet[]>([]);
  const [isFetchExecuting, setIsFetchExecuting] = useState(false);

  useEffect(() => {
    let executeQuery = false;
    let queryString = URLs.diet + "?Page=1&PageSize=100";
    if (props.dietCategoriesSearch.length > 0) {
      executeQuery = true;
      props.dietCategoriesSearch.forEach((category) => {
        queryString += `&categoryIds=${category.id}`;
      });
    }
    if (props.dietNameSearch.length > 0) {
      executeQuery = true;
      queryString += `&searchText=${encodeURIComponent(props.dietNameSearch)}`;
    }

    async function fetchAPI() {
      let response = await fetch(queryString);
      let data = await response.json();
      let list: Diet[] = [];
      for (const short_diet of data.pagination) {
        const response = await fetch(URLs.diet + `/${short_diet.id}`);
        const data = await response.json();
        data.id = short_diet.id;
        list.push(data);
      }
      setSearchResults(list);
      setIsFetchExecuting(false);
    }

    if (executeQuery) {
      setIsFetchExecuting(true);
      fetchAPI();
    }
  }, [props.dietNameSearch, props.dietCategoriesSearch]);

  return (
    <>
      {isFetchExecuting ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </div>
      ) : searchResults.length > 0 ? (
        <>
          <Dialog onClose={() => setIsDialogOpen(false)} open={isDialogOpen}>
            <DietInfoCard {...activeDiet} />
          </Dialog>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container>
                {searchResults.map((diet) => {
                  return (
                    <Grid key={diet.id} item xs={12} sm={4} md={3}>
                      <div onClick={() => handleDialogOpen(diet)}>
                        <DietCard {...diet} />
                      </div>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </div>
        </>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <p>No results matched the search criteria...</p>
        </div>
      )}
    </>
  );
}
