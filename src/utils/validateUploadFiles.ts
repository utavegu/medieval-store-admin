import { findDuplicatesInArray } from './findDuplicatesInArray';

export const validateUploadFiles = (
  files: File[],
  imageUploaderConfig: {
    maxFileSizeInBytes: number;
    acceptFileTypes: string[];
    maxPhotosQuantity: number;
  },
  uploadedFiles: File[]
): File[] | undefined => {
  const { maxFileSizeInBytes, acceptFileTypes, maxPhotosQuantity } = imageUploaderConfig;
  if (files.length > maxPhotosQuantity) {
    alert(`Можно загрузить не более ${maxPhotosQuantity} фотографий!`); // TODO: кастомный из муи
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
  const totalImages = [...uploadedFiles, ...images];
  const photosNames = totalImages.map((file) => file.name);
  const duplicates = findDuplicatesInArray(photosNames);
  if (!!duplicates.length) {
    alert('Нельзя загружать файлы с одинаковым именем! (убедитесь, что вы не загружаете одинаковые фотографии)'); // TODO: кастомный из муи
    return;
  }
  if (totalImages.length > maxPhotosQuantity) {
    alert(`Можно загрузить не более ${maxPhotosQuantity} фотографий!`); // TODO: кастомный из муи
    return;
  }
  return totalImages;
};
