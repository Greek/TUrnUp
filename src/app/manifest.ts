import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TUrn UP",
    short_name: "TUrn UP",
    description: "find all the on-campus events near you",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        purpose: "maskable",
        sizes: "512x512",
        src: "icon512_maskable.png",
        type: "image/png",
      },
      {
        purpose: "any",
        sizes: "512x512",
        src: "icon512_rounded.png",
        type: "image/png",
      },
    ],
  };
}
