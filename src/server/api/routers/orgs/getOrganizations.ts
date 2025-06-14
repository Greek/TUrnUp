import { publicProcedure } from "../../trpc";
import { getInvolvedOrgs } from "~/utils/involved-events";
import { transformOrg } from "~/utils/transform-event";

export const getOrganizations = publicProcedure.query(async ({}) => {
  const organizations = await getInvolvedOrgs();

  return organizations.map((org) => transformOrg(org));
});
