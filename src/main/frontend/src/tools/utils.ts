import { ModelValue } from "../models/IModel";

const upperCase = (text: string) => text.toUpperCase();
const splitToUnderBar = (text: string) => text.split(/[\s]/g).join("_");
const capitalize = (text: string): string =>
  text
    .split(/\s|_|-|\./g)
    .map((_) => _[0].toUpperCase().concat(_.slice(1)))
    .join(" ");

const mapToQuery = (maps: Map<string, ModelValue>): string => {
  const mapped = maps.entries();
  let stringBuilder = [];
  while (true) {
    const {
      value: [key, value],
    } = mapped.next();
    stringBuilder.push(`${key}=${value}`);
    if (mapped.next().done) break;
  }

  return stringBuilder.join("&");
};

export { upperCase, splitToUnderBar, capitalize, mapToQuery };
