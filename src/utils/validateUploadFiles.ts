export const validateUploadFiles = (
  files: File[],
  maxFileSizeInBytes: number,
  acceptFileTypes: string[]
): File[] | undefined => {
  if (files.length > 5) {
    alert('Можно загрузить не более 5 фотографий!'); // TODO: кастомный из муи
    return;
  }
  const images: File[] = [];
  files.forEach((file) => {
    const isCorrectFileType = !!acceptFileTypes.find((acceptableFileType) => acceptableFileType === file.type);
    if (!isCorrectFileType) {
      alert(`Можно загрузить только изображения в формате ${acceptFileTypes.join(', ')}`); // TODO: кастомный из муи
      return;
    } else if (file.size > maxFileSizeInBytes) {
      alert('Размер изображения не должен превышать 2 мегабайт!'); // TODO: кастомный из муи
      return;
    } else {
      images.push(file);
    }
  });
  return images;
};
