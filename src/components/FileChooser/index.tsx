import { useState, SyntheticEvent, ChangeEvent } from 'react';
import styles from './FileChooser.module.css';

const FileChooser = () => {
  const [isDrag, setIsDrag] = useState<boolean>(false); // TODO: Вроде так юзСтейт типизировать?
  const [fileList, setFileList] = useState<FileList | null>(null);

  const dragStartHandler = (event: SyntheticEvent) => {
    event.preventDefault();
    setIsDrag(true);
  };

  const dragLeaveHandler = (event: SyntheticEvent) => {
    event.preventDefault();
    setIsDrag(false);
  };

  const dropHandler = (event: any) => {
    event.preventDefault();
    const files = [...event.dataTransfer.files];
    // setFileList(files);

    console.log(files);
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
    // console.log(data);
    // axios.post('url', formData, options)
    /*
    headers: {
        'content-type': file.type,
        'content-length': `${file.size}`, // 👈 Headers need to be a string
      },
    */
    setIsDrag(false);
  };

  // --------------------------

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFileList(e.target.files);
  };

  const handleUploadClick = () => {
    if (!fileList) {
      return;
    }
  };

  return (
    <div>
      {isDrag ? (
        <div
          className={styles.dropArea}
          onDragStart={(event) => dragStartHandler(event)}
          onDragLeave={(event) => dragLeaveHandler(event)}
          onDragOver={(event) => dragStartHandler(event)}
          onDrop={(event) => dropHandler(event)}
        >
          Отпустите файлы, чтобы загрузить их
        </div>
      ) : (
        <div
          className={styles.dropArea}
          onDragStart={(event) => dragStartHandler(event)}
          onDragLeave={(event) => dragLeaveHandler(event)}
          onDragOver={(event) => dragStartHandler(event)}
        >
          Перетащите файлы, чтобы загрузить их
        </div>
      )}

      <hr />

      <div>
        {/* Кастомизировать. Можно, кстати, через МуИ сделать, раз уж всё равно его тут используешь - попрактиковаться */}
        <input
          type="file"
          onChange={handleFileChange}
          multiple
        />

        {/* <ul>
        {files.map((file, i) => (
          <li key={i}>
            {file.name} - {file.type}
          </li>
        ))}
      </ul> */}

        <button onClick={handleUploadClick}>Upload</button>
      </div>
    </div>
  );
};

export default FileChooser;
