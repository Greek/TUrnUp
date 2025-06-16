import { createTRPCRouter } from "~/server/api/trpc";
import { getAllEvents } from "./getAllEvents";
import { getEvent } from "./getEvent";

const eventsRouter = createTRPCRouter({
  getAllEvents,
  getEvent,
});

export default eventsRouter;
