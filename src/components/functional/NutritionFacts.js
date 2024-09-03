//react
//thirdParty
import { Box, Divider, Typography } from "@mui/material";
//context
//services
//components

const NutritionFacts = () => {
  const nutritionData = [
    { label: "Calories", value: "200 kcal" },
    { label: "Carbs", value: "30g" },
    { label: "Protein", value: "10g" },
    { label: "Fat", value: "5g" },
    { label: "Fiber", value: "5g" },
    { label: "Sugars", value: "10g" },
    { label: "Sodium", value: "300mg" },
  ];

  return (
    <Box className="bg-gray-100 p-4 rounded-lg">
      <Typography variant="h6" className="text-secondary mb-4 font-bold">
        Besin Değerleri
      </Typography>
      {nutritionData.map((item, index) => (
        <Box key={index} className="flex justify-between mb-2">
          <Typography variant="body1" className="text-foreground">
            {item.label}
          </Typography>
          <Typography variant="body1" className="text-foreground font-bold">
            {item.value}
          </Typography>
        </Box>
      ))}
      <Divider />
    </Box>
  );
};

export default NutritionFacts;
