import { createTRPCRouter } from "~/server/api/trpc";
import { getOrganizations } from "./getOrganizations";
import { getOrganization } from "./getOrganization";

const orgsRouter = createTRPCRouter({
  getOrganization,
  getOrganizations,
});

export default orgsRouter;
