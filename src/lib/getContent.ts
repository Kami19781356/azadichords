import { content } from "./content";
import type { Locale } from "./content.types";

export function getContent(locale: Locale) {
  return content[locale];
}
