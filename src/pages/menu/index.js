import { actions } from "@/constants/aclConstants";
import { pages } from "@/constants/pages";
import React from "react";

const index = () => {
  return <div>Yakında...</div>;
};
index.acl = {
  action: actions.read,
  subject: pages.recipes,
};
export default index;
