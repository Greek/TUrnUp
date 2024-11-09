import { createTRPCRouter } from "~/server/api/trpc";
import { getOrganizations } from "./getOrganizations";

export const orgsRouter = createTRPCRouter({
  getOrganizations,
});
