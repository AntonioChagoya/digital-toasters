// Libs
import axios from "axios";
// Types
import { Locale } from "@appTypes/app";

export const getArticleBySlug = async (slug: string | string[] | undefined, locale = Locale["es-MX"]) => {
  if (!slug) throw new Error("Slug is required");

  const defaultQuery = "populate=*"
  const data = await axios.get<{ data: IProduct }>(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/articles/slug/${slug}?locale=${locale}&${defaultQuery}`);

  return data
};