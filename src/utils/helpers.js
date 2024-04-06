export const formatFavorites = (favorites) => {
  if (favorites >= 1e6) {
    return (favorites / 1e6).toFixed(1) + "m";
  } else if (favorites >= 1e3) {
    return (favorites / 1e3).toFixed(1) + "k";
  } else {
    return favorites.toString();
  }
};

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const handleShareButtonClick = async () => {
  try {
    if (navigator.share) {
      await navigator.share({
        title: document.title,
        text: "Check out this awesome title.",
        url: window.location.href,
      });
    } else {
      throw new Error("Web Share API not supported in this browser");
    }
  } catch (error) {
    console.error("Error sharing:", error.message);
  }
};

export const handleClickTitle = (url) => {
  window.open(url);
};

export const openInMangadex = (query) => {
  window.open(`https://mangadex.org/search?q=${query}`);
};
