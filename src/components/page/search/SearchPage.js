import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";
import { Grid } from "@mui/material";

const SearchPage = () => {
  const router = useRouter();
  const { query, includes, excludes, categories, servings, cookingTime } =
    router.query;

  const [searchQuery, setSearchQuery] = useState(query || "");
  const [filters, setFilters] = useState({
    includes: includes || "",
    excludes: excludes || "",
    categories: categories ? categories.split(",") : [],
    servings: servings ? servings.split(",") : [],
    cookingTime: cookingTime || "",
    query: query || "",
  });
  const handleSearch = () => {
    router.push({
      pathname: "/arama", // Arama sonuçlarını göstereceğiniz sayfa
      query: {
        query: searchQuery,
        includes: filters.includes,
        excludes: filters.excludes,
        categories: filters.categories,
        servings: filters.servings,
        cookingTime: filters.cookingTime,
      },
    });
  };

  useEffect(() => {
    // Update state with query parameters when router.query changes
    setFilters({
      includes: includes || "",
      excludes: excludes || "",
      categories: categories ? categories : [],
      servings: servings ?? [],
      cookingTime: cookingTime || "",
      query: searchQuery,
    });
  }, [query, includes, excludes, categories, servings, cookingTime]);

  return (
    <Grid container>
      <Grid item xs={2} className="px-4">
        <TextField
          fullWidth
          label="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          variant="outlined"
          margin="normal"
        />
        <SearchForm filters={filters} setFilters={setFilters} />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSearch}
        >
          Search
        </Button>
      </Grid>

      <Grid item xs={10} className="px-12">
        <SearchResults query={filters.query} filters={filters} />
      </Grid>
    </Grid>
  );
};

export default SearchPage;
