import { AclButtonType, actions } from "src/constants/aclConstants";

const userHasWriteAccess = (ability, subject) => {
  return ability.can(actions.update, subject);
};

const userHasCreateAccess = (ability, subject) => {
  return ability.can(actions.create, subject);
};

const userHasDeleteAccess = (ability, subject) => {
  return ability.can(actions.delete, subject);
};

const userHasReadAccess = (ability, subject) => {
  return ability.can(actions.read, subject);
};

const userHasButtonAccess = (ability, pageName, aclButtonType) => {
  let hasAccess = false;
  if (ability.can("manage", actions.all)) {
    return !hasAccess;
  }

  switch (aclButtonType) {
    case AclButtonType.read:
      hasAccess = ability.can(actions.read, pageName) ?? false;
      break;
    case AclButtonType.create:
      hasAccess = ability.can(actions.create, pageName) ?? false;
      break;
    case AclButtonType.update:
      hasAccess = ability.can(actions.update, pageName) ?? false;
      break;
    case AclButtonType.delete:
      hasAccess = ability.can(actions.delete, pageName) ?? false;
      break;
  }
  return hasAccess;
};

export {
  userHasWriteAccess,
  userHasCreateAccess,
  userHasDeleteAccess,
  userHasButtonAccess,
  userHasReadAccess,
};
