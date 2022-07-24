const upperCase = (text: string) => text.toUpperCase();
const splitToUnderBar = (text: string) => text.split(/[\s]/g).join("_");
const capitalize = (text: string): string =>
  text
    .split(/\s|_|-|\./g)
    .map((_) => _[0].toUpperCase().concat(_.slice(1)))
    .join(" ");

export { upperCase, splitToUnderBar, capitalize };
