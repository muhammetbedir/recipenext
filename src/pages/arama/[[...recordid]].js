import SearchPage from "@/components/page/search/SearchPage";
import { actions } from "@/constants/aclConstants";
import { pages } from "@/constants/pages";
import React from "react";

const Index = () => {
  return <SearchPage />;
};

Index.acl = {
  action: actions.read,
  subject: pages.category,
};
export default Index;
