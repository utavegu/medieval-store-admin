export const findDuplicatesInArray = (array: string[]) => {
  return array.filter((element, index, arr) => {
    return arr.indexOf(element) !== index;
  });
};
