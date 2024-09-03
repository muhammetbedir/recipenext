import { actions } from "src/constants/aclConstants";
import { pages } from "src/constants/pages";
import { Ability, AbilityBuilder } from "@casl/ability";

export const AppAbility = Ability;

function defineAbility(role) {
  const { can, rules, cannot } = new AbilityBuilder(AppAbility);
  if (role === "admin") {
    can("manage", "all");
  } else if (role === "standard") {
    can(actions.read, pages.homePage);
    cannot(actions.read, pages.login);
    can(actions.read, pages.changePassword);
    can(actions.read, pages.recipeDetail);
    can(actions.read, pages.category);
    can(actions.read, pages.newRecipes);
    can(actions.read, pages.profile);
    can(actions.read, pages.amendRecipe);
    can(actions.read, pages.recipes);
  } else {
    can(actions.read, pages.homePage);
    can(actions.read, pages.login);
    can(actions.read, pages.signIn);
    can(actions.read, pages.category);
    can(actions.read, pages.newRecipes);
    can(actions.read, pages.recipeDetail);
    can(actions.read, pages.profile);
    cannot(actions.read, pages.amendRecipe);
    can(actions.read, pages.recipes);
  }

  return rules;
}

export default defineAbility;
