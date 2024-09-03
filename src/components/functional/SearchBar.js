import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { searchRecipe } from "@/services/recipeService";
import { Button } from "@mui/material";

const SearchBar = ({ isLogin }) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null); // Ref for the search bar container

  const { data, error, isLoading } = useQuery({
    queryKey: ["search" + query],
    queryFn: () =>
      searchRecipe(
        `{\"from\":0,\"size\":10,\"query\":{\"bool\":{\"should\":[{\"prefix\":{\"ingredients\":{\"value\":\"${query}\"}}},{\"wildcard\":{\"ingredients\":{\"value\":\"*${query}*\"}}},{\"fuzzy\":{\"ingredients\":{\"value\":\"${query}\",\"fuzziness\":\"AUTO\"}}}],\"minimum_should_match\":1}}`
      ).then((res) => res.data),
    enabled: !!query, // Sadece query boş değilse sorguyu çalıştır
  });

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  const handleResultClick = (link) => {
    router.push(link);
    setQuery("");
    setIsOpen(false);
  };

  const toggleSearchBar = () => {
    setIsOpen((prev) => !prev);
    if (isOpen) {
      setQuery("");
    }
  };

  const handleSearchButtonClick = () => {
    router.push({
      pathname: "/arama", // Arama sonuçlarını göstereceğiniz sayfa
      query: {
        query,
        // Diğer filtreler burada eklenebilir
      },
    });
    setIsOpen(false);
  };

  // Close search bar if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
        setQuery(""); // Optionally clear the query as well
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Box
      sx={{
        position: "absolute",
        width: "300px",
        mx: 5,
        right: !!isLogin ? 120 : 220,
      }}
      ref={searchRef} // Attach the ref to the container
    >
      <IconButton
        onClick={toggleSearchBar}
        sx={{ position: "absolute", top: -20, right: -50 }}
      >
        {isOpen ? <CloseIcon /> : <SearchIcon />}
      </IconButton>
      {isOpen && (
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            zIndex: 10,
            top: -30,
          }}
        >
          <TextField
            fullWidth
            value={query}
            onChange={handleSearch}
            placeholder="Tarif Ara..."
            variant="outlined"
            className="bg-secondary-background"
            sx={{ background: "white", borderRadius: 1 }}
          />
          {isLoading && (
            <CircularProgress
              size={24}
              sx={{ position: "absolute", right: 10, top: 10 }}
            />
          )}
          {!isLoading && (
            <Button
              sx={{ position: "absolute", right: 10, top: 10 }}
              onClick={handleSearchButtonClick}
            >
              Ara
            </Button>
          )}
          {data && (
            <List
              sx={{
                position: "absolute",
                zIndex: 10,
                background: "white",
                width: "100%",
                borderRadius: 1,
              }}
            >
              {data?.map((result) => (
                <ListItem
                  button
                  key={result.visibleId}
                  onClick={() =>
                    handleResultClick(
                      `/tarif-detay/${result.visibleId}/${result.title}`
                    )
                  }
                >
                  <ListItemText primary={result.title} />
                </ListItem>
              ))}
            </List>
          )}
          {error && <Box>Hata!!</Box>}
        </Box>
      )}
    </Box>
  );
};

export default SearchBar;
