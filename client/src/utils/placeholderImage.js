const images = {
  airpods: "airpods.png",
  bicycle: "bicycle.png",
  headphones: "headphones.png",
  "hot pockets": "hotpockets.png",
  ipad: "ipad.png",
  kindle: "kindle.png",
  lantern: "lantern.png",
  laptop: "laptop.png",
  lunchables: "lunchables.png",
  monitor: "monitor.png",
  watch: "watch.png",
  placeholder: "placeholder.png",
};

export const placeholderImage = (title) => {
  let imageFile = "placeholder.png";
  for (const [key, image] of Object.entries(images)) {
    if (title.toLowerCase().includes(key)) {
      imageFile = image;
      break;
    }
  }
  return `images/${imageFile}`;
};
