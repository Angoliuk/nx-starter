export const range = (value: number, from: number, to: number) => {
  return Math.max(from, Math.min(to, value));
};
