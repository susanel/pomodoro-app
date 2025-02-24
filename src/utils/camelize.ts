export const camelize = (str: string) => {
  return str
    .toLowerCase()
    .replace(/(?:\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/[\s-]+/g, '');
};
