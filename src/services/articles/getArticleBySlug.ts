// Libs
import axios from "axios";
import * as qs from "qs";
// Types
import { Locale } from "@appTypes/app";
import { ParsedUrlQuery } from "querystring";
import { ApiArticleArticle } from "@appTypes/contentTypes";

export const getArticleBySlug = async (slug: string | string[] | undefined, locale = Locale["es-MX"], clientQuery: ParsedUrlQuery) => {
  if (clientQuery?.slug) delete clientQuery.slug
  if (!slug) throw new Error("Slug is required");

  const query = qs.stringify(clientQuery);

  const data = await axios.get<{ data: ApiArticleArticle }>(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/articles/slug/${slug}?locale=${locale}&${query}`);

  return data
};