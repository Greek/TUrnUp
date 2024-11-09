import { z } from "zod";
import { publicProcedure } from "../../trpc";
import { getInvolvedOrgs } from "~/utils/involved-events";
import { transformOrg } from "~/utils/transform-event";

export const getOrganizations = publicProcedure.query(async ({ input }) => {
  const organizations = await getInvolvedOrgs();

  return organizations.map((org) => transformOrg(org));
});
