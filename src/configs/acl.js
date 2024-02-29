import { actions } from "src/constants/aclConstants";
import { pages } from "src/constants/pages";
import { Ability, AbilityBuilder } from "@casl/ability";

export const AppAbility = Ability;

function defineAbility(role) {
  const { can, rules, cannot } = new AbilityBuilder(AppAbility);
  if (role === "admin") {
    can("manage", "all");
  } else if (role === "standard") {
    can(actions.read, pages.roles);
    can(actions.read, pages.users);
    can(actions.read, pages.homePage);
    cannot("read", pages.login);
    can(actions.read, pages.changePassword);
    can(actions.update, pages.changePassword);
  } else {
    can(actions.read, pages.homePage);
    can(actions.read, pages.login);
    cannot(actions.read, pages.profile);
  }

  return rules;
}

export default defineAbility;
