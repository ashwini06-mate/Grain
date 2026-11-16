const crop = (id, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;

const pex = (id, w = 1400) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

/** Every photo is uncooked rice or wheat grain. No fields, people, meals, or other food. */
export const photos = {
  hero: pex(4110255, 2000),
  rice: crop("photo-1586201375761-83865001e31c", 1400),
  riceBright: pex(4110251, 1400),
  riceWarm: pex(4110252, 1400),
  riceWhite: pex(4110254, 1400),
  ricePiles: pex(4110250, 1600),
  riceMix: pex(4110255, 1400),
  wheat: crop("photo-1574323347407-f5e1ad6d020b", 1400),
  wheatEar: crop("photo-1574323347407-f5e1ad6d020b", 1200),
  wheatHead: crop("photo-1574323347407-f5e1ad6d020b", 1600),
};
