import { Servings } from "@/helpers/enums";
import { getCategories } from "@/services/categoryService";
import { Box, FormControl, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const SearchForm = ({ filters, setFilters }) => {
  const [categories, setCategories] = useState([]);

  const handleChange = (field, value) => {
    setFilters({
      ...filters,
      [field]: value,
    });
  };

  useEffect(() => {
    getCategories().then((res) => setCategories(res?.data));
  }, []);

  return (
    <Box>
      <TextField
        fullWidth
        value={filters.includes}
        onChange={(e) => handleChange("includes", e.target.value)}
        placeholder="Tarif bu malzemeleri içersin"
        variant="outlined"
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        value={filters.excludes}
        onChange={(e) => handleChange("excludes", e.target.value)}
        placeholder="Tarif bu malzemeleri içermesin"
        variant="outlined"
        sx={{ mb: 2 }}
      />
      <FormControl fullWidth sx={{ mb: 2 }}>
        <TextField
          multiple
          select
          SelectProps={{
            MenuProps: {
              PaperProps: {
                style: {
                  maxHeight: 150,
                  marginTop: 5,
                },
              },
            },
          }}
          label="Kategoriler"
          value={filters.categories}
          onChange={(e) => handleChange("categories", e.target.value)}
          renderValue={(selected) => selected.join(", ")}
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <TextField
          multiple
          select
          SelectProps={{
            MenuProps: {
              PaperProps: {
                style: {
                  maxHeight: 150,
                  marginTop: 5,
                },
              },
            },
          }}
          label="Porsiyon"
          value={filters.servings}
          onChange={(e) => handleChange("servings", e.target.value)}
          renderValue={(selected) => selected.join(", ")}
        >
          {/* Replace with actual servings */}
          {Servings.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <TextField
          multiple
          select
          SelectProps={{
            MenuProps: {
              PaperProps: {
                style: {
                  maxHeight: 150,
                  marginTop: 5,
                },
              },
            },
          }}
          label="Pişirme Süresi"
          value={filters.cookingTime}
          onChange={(e) => handleChange("cookingTime", e.target.value)}
        >
          <MenuItem value="30">Az vaktim var (30dk)</MenuItem>
          <MenuItem value="90">En fazla 1,5 saatim var</MenuItem>
          <MenuItem value="120">Vaktim var</MenuItem>
        </TextField>
      </FormControl>
    </Box>
  );
};

export default SearchForm;
