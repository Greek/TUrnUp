"use client"
import { api } from "~/trpc/react";

export default function Home() {
  const hello = api.post.hello.useQuery({text: "world"})

  return (
      <h1>{hello && hello.data?.greeting}</h1>
  );
}
