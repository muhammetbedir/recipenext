import { useInfiniteQuery } from "@tanstack/react-query";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { searchRecipe } from "@/services/recipeService";
import { Box, Grid } from "@mui/material";
import RecipeCard from "@/components/functional/RecipeCard";
import { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/router";

const SearchResults = ({ query, filters }) => {
  const router = useRouter();
  const observerElem = useRef(null);

  const cookingTimeFilter = filters.cookingTime
    ? filters.cookingTime === "30"
      ? [{ range: { cookingTime: { lt: 30 } } }]
      : filters.cookingTime === "90"
      ? [{ range: { cookingTime: { lt: 90 } } }]
      : []
    : [];
  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["search", query],
    queryFn: ({ pageParam = 0 }) =>
      searchRecipe(
        JSON.stringify({
          from: pageParam,
          size: 10,
          query: {
            bool: {
              must: [
                { match: { title: query } },
                ...(filters.includes
                  ? [{ match: { ingredients: filters.includes } }]
                  : []),
                ...(filters.excludes
                  ? [
                      {
                        bool: {
                          must_not: [
                            { match: { ingredients: filters.excludes } },
                          ],
                        },
                      },
                    ]
                  : []),
                ...(filters.categories.length
                  ? [{ terms: { categoryId: filters.categories } }]
                  : []),
                ...(filters.servings.length
                  ? [{ terms: { servings: filters.servings } }]
                  : []),
                ...cookingTimeFilter,
              ],
            },
          },
        })
      ).then((res) => res.data),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 10) {
        return pages.length * 10;
      } else {
        return undefined;
      }
    },
    enabled: !!query,
    gcTime: 0,
  });

  const lastRecipeRef = useCallback(
    (node) => {
      if (isLoading || isFetchingNextPage) return;
      if (observerElem.current) observerElem.current.disconnect();
      observerElem.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observerElem.current.observe(node);
    },
    [isLoading, isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  useEffect(() => {
    refetch();
  }, [router.query]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching results</div>;

  return (
    <Grid container spacing={2}>
      {data?.pages?.map((page, pageIndex) =>
        page.map((recipe, index) => {
          if (
            pageIndex === data.pages.length - 1 &&
            index === page.length - 1
          ) {
            return (
              <Grid item xs={12} sm={4} key={recipe.id} ref={lastRecipeRef}>
                <RecipeCard {...recipe} refetch={refetch} />
              </Grid>
            );
          } else {
            return (
              <Grid item xs={12} sm={4} key={recipe.id}>
                <RecipeCard {...recipe} refetch={refetch} />
              </Grid>
            );
          }
        })
      )}
      {isFetchingNextPage && <div>Loading more...</div>}
    </Grid>
  );
};

export default SearchResults;
