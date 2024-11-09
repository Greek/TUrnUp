import { createTRPCRouter } from "~/server/api/trpc";
import { getOrganizations } from "./getOrganizations";
import { getOrganization } from "./getOrganization";

export const orgsRouter = createTRPCRouter({
  getOrganization,
  getOrganizations,
});
