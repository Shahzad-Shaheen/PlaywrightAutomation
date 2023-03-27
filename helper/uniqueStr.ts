export function generateEmail(s: string) {
  const now = new Date().getTime();
  return `${s}` + `+` + `${now}` + `@gmail.com`;
}

export function getSpecialString(name: string) {
  const now = new Date().getTime();
  return `${name}` + `+` + `${now}`;
}
