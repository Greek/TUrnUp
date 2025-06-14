import { z } from "zod";
import { publicProcedure } from "../../trpc";
import { getInvolvedOrg } from "~/utils/involved-events";
import { transformOrg } from "~/utils/transform-event";

export const getOrganization = publicProcedure
  .input(z.number())
  .query(async ({ input }) => {
    const organization = await getInvolvedOrg(input);

    return transformOrg(organization);
  });
