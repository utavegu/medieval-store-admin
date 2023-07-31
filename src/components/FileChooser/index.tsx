import { useEffect, useState } from 'react';

import FileDropArea from './FileDropArea';
import ChooseFileInput from './ChooseFileInput';

// TODO: По итогу ты будешь "имэйдж аплодер" (имя компонента). 2 пропса для отображения "ареи" и "инпута" - если тру, отображается
// TODO: Пробрасывать допустимые для загрузки типы файлов через пропсы (acceptFileTypes)
const FileChooser = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[] | null>(null);

  // const [test, setTest] = useState<string>('');

  // const img = new Image();
  // console.log(img);
  // <img src={`data:${props.images[0].mimetype};base64,${Buffer.from(props.images[0].file.data).toString('base64')}`} />

  /*
  useEffect(() => {
    if (!!uploadedFiles?.length) {
      setTest(URL.createObjectURL(uploadedFiles[0]));
    }
  }, [test, uploadedFiles])
  */

  if (!!uploadedFiles?.length) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(uploadedFiles[0]);
    fileReader.onload = function (e) {
      console.log(fileReader.result);
    };
    // img.src = fileReader.result; преобразовать
  }

  return (
    <div>
      <FileDropArea addUploadedFiles={setUploadedFiles} />
      <ChooseFileInput addUploadedFiles={setUploadedFiles} />
      {/*
        TODOs:
        - Возможность удаления загруженных файлов (крестик с тултипом напротив каждого загруженного файла)
        - Ограничение на количество загруженных файлов
        - И ещё бы превьюшки маленькие им отрисовывать
      */}
      <div>
        {!!uploadedFiles?.length && (
          <>
            <ul>
              {uploadedFiles.map((file, i) => (
                <li key={i}>{file.name}</li>
              ))}
            </ul>
            <b>Загружено файлов: {uploadedFiles?.length}</b>
          </>
        )}
      </div>

      {/* <img src={test} alt='тестовая картинка' /> */}
    </div>
  );
};

export default FileChooser;

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
