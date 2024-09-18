export const sliceUrlFilmsPeople = (url) => {
  const match = url.match(/people\/\d+\//);
  return match ? match[0] : "";
};

export const sliceUrlFilmsPlanets = (url) => {
  const match = url.match(/planets\/\d+\//);
  return match ? match[0] : "";
};
