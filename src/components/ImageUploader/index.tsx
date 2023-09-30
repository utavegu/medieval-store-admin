import { FC, useState } from 'react';

import FileDropArea from './FileDropArea';
import ChooseFileInput from './ChooseFileInput';

const imageUploaderConfig: { maxFileSizeInBytes: number; acceptFileTypes: string[] } = {
  // TODO: Синхронизируй с бэком - там понизь до 2х мб, а тут типы расширь до 5 вариантов
  maxFileSizeInBytes: 2000000,
  acceptFileTypes: ['image/jpeg', 'image/png'],
};

type PropTypes = {
  view: 'area' | 'input' | 'both'; // TODO: enum
};

const ImageUploader: FC<PropTypes> = ({ view }) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[] | null>(null);

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
        - Возможность удаления загруженных файлов (крестик с тултипом напротив каждого загруженного файла. Псевдо?)
        - при загрузке новых - не затирать, а добавлять (?) - слишком муторный функционал, может и не буду... однако тп могут буксануть, которые только по 1 файлу умеют за раз добавлять... так что возможно стоит проверять количество в uploadedFiles и исходя из этого менять лимит в валидаторе
        - И ещё бы превьюшки маленькие им отрисовывать - посмотри как в идеке сделал контейнер для логотипа из админки, такие ж свойства и превьюшкам (их контейнерам). Сама коробка для превьюшек - флекс
      */}
      <div>
        {!!uploadedFiles?.length && (
          <>
            <ul>
              {uploadedFiles.map((file, i) => (
                <li key={i}>
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                  />
                </li>
              ))}
            </ul>
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
