import axios from "axios";
import { publicProcedure } from "../../trpc";
import z from "zod";

export const getEvent = publicProcedure
  .input(z.string())
  .query(async ({ ctx, input }) => {
    const { data } = await axios.get<{data: {start: Date}}>(
      `https://events.towson.edu/api/2/events/${input}`,
    );

    return data;
  });
