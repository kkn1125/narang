const upperCase = (text: string) => text.toUpperCase();
const splitToUnderBar = (text: string) => text.split(/[\s]/g).join("_");

export { upperCase, splitToUnderBar };
