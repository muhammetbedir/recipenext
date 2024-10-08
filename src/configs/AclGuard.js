import { actions } from "src/constants/aclConstants";
import { pages } from "src/constants/pages";
import { useAuth } from "src/contexts/authContext";
import { Ability } from "@casl/ability";
import { useEffect, useState } from "react";
import { AbilityContext } from "src/contexts/createContextualCan";
import defineAbility from "src/configs/acl";
import { useRouter } from "next/router";
import CustomSpinner from "@/components/functional/CustomSpinner";

const AclGuard = ({ children, acl }) => {
  const auth = useAuth();
  const router = useRouter();
  const [hasRole, setHasRole] = useState(auth.role);
  const [loading, setLoading] = useState(true);

  const rules = defineAbility(auth.role);
  const ability = new Ability();
  ability.update(rules);

  useEffect(() => {
    if (auth.user && (auth.role == undefined || auth.role == null)) {
      return;
    }
    if (!auth.role && router.route.indexOf("profile") !== -1) {
      router.push("/login");
    } else if (acl.subject === pages.login && auth.role !== null) {
      router.push("/");
    } else if (!ability.can(acl.action, acl.subject)) {
      router.push("/giris-yap");
    }
  }, [auth.role, router]);

  return (
    <>
      <AbilityContext.Provider value={ability}>
        {children}
      </AbilityContext.Provider>
    </>
  );
};

export default AclGuard;
