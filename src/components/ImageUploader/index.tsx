import { FC, useState } from 'react';
import FileDropArea from './FileDropArea';
import ChooseFileInput from './ChooseFileInput';
import styles from './ImageUploader.module.css';

const imageUploaderConfig: { maxFileSizeInBytes: number; acceptFileTypes: string[] } = {
  // TODO: Синхронизируй с бэком - там понизь до 2х мб, а тут типы расширь до 5 вариантов
  maxFileSizeInBytes: 2000000,
  acceptFileTypes: ['image/jpeg', 'image/png'],
};

type PropTypes = {
  view: 'area' | 'input' | 'both'; // TODO: enum
  isShowPreviews: boolean;
};

const ImageUploader: FC<PropTypes> = ({ view, isShowPreviews }) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[] | null>(null);

  const deleteImageHandler = (fileName: string) => {
    const editedUploadedFiles = uploadedFiles?.filter((file) => file.name !== fileName);
    // TODO: А если режим редактирования, то ещё и на бэк делать запрос на удаление
    if (editedUploadedFiles) {
      setUploadedFiles(editedUploadedFiles);
    } else {
      setUploadedFiles(null);
    }
  };

  return (
    <div>
      {(view === 'area' || view === 'both') && (
        <FileDropArea
          addUploadedFiles={setUploadedFiles}
          imageUploaderConfig={imageUploaderConfig}
        />
      )}
      {(view === 'input' || view === 'both') && (
        <ChooseFileInput
          addUploadedFiles={setUploadedFiles}
          imageUploaderConfig={imageUploaderConfig}
        />
      )}
      {/*
        TODOs:
        - при загрузке новых - не затирать, а добавлять (?) - слишком муторный функционал, может и не буду... однако тп могут буксануть, которые только по 1 файлу умеют за раз добавлять... так что возможно стоит проверять количество в uploadedFiles и исходя из этого менять лимит в валидаторе
      */}
      <div>
        {!!uploadedFiles?.length && (
          <>
            {isShowPreviews ? (
              <ul className={styles.previewsContainer}>
                {uploadedFiles.map((file, i) => (
                  <li
                    key={i}
                    className={styles.imageContainer}
                  >
                    {
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                      />
                    }
                    <button
                      className={styles.removeImageButton}
                      onClick={() => deleteImageHandler(file.name)}
                    >
                      х
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <ul>
                {uploadedFiles.map((file, i) => (
                  <li key={i}>
                    {file.name}
                    <button onClick={() => deleteImageHandler(file.name)}>х</button>
                  </li>
                ))}
              </ul>
            )}
            <b>Загружено файлов: {uploadedFiles?.length}</b>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;

/*
Наброски для отправки формы
 const data = new FormData();
files.forEach((file, i) => {
  // TODO: Пропускать только картинки по type (если файл тайп равен какому-либо значению из массива, выполнить аппенд, иначе континуе)
  data.append(`image-${i}`, file, file.name);
});
data.append('title', 'Заголовок товара');
data.append('description', 'Описание товара');
files.forEach((file, i) => {
  data.append(`file-${i}`, file, file.name);
});
console.log(data);
  axios.post('url', formData, options)
  headers: {
      'content-type': file.type,
      'content-length': `${file.size}`, // 👈 Headers need to be a string СУММА ФАЙЛСАЙЗОВ
    },
*/
