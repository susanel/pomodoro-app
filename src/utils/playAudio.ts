export const playAudio = (sound) => {
  // type?
  const audio = new Audio(sound);
  audio.play();
};
