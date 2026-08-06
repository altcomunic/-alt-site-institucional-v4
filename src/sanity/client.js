import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanityClient = createClient({ projectId: "5ljn4m88", dataset: "production", apiVersion: "2026-08-06", useCdn: true, perspective: "published" });
const builder = imageUrlBuilder(sanityClient);
export function imageUrl(source, width = 1600, height) {
  if (!source) return "";
  let image = builder.image(source).width(width).auto("format").quality(86);
  if (height) image = image.height(height).fit("crop");
  return image.url();
}
