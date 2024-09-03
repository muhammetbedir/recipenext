import { Box, Divider, Tab, Tabs } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const TabsCustom = ({ children }) => {
  const router = useRouter();

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  const tabLabels = React.Children.map(children, (child, index) => {
    if (!child?.props?.label) return;
    return (
      <Tab label={child?.props?.label} {...a11yProps(index)} key={index} />
    );
  });

  useEffect(() => {
    setTabIndex(0);
  }, [router]);

  return (
    <>
      <Box className="w-full flex items-center justify-center flex-col">
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          variant="scrollable"
          aria-label="basic tabs example"
        >
          {tabLabels}
        </Tabs>
      </Box>
      <Divider className="my-4" />
      {children.length > 0
        ? children
            ?.filter((child) => !!child)
            .map((child, index) => {
              return tabIndex === index && child?.props?.children;
            })
        : children.props.children}
    </>
  );
};

export default TabsCustom;
