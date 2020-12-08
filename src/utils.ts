export const getIdFromUrl = (url: string) => {
  return url.split("/")[url.split("/").length - 2];
};
