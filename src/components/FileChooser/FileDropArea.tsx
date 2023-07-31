import { useState, SyntheticEvent } from 'react';
import styles from './FileChooser.module.css';

const FileDropArea = ({ addUploadedFiles }: any) => {
  const [isDrag, setIsDrag] = useState<boolean>(false); // TODO: Вроде так юзСтейт типизировать?

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
    const files: File[] = [...event.dataTransfer.files];
    const images = files.filter((file) => file.type === 'image/jpeg' || file.type === 'image/png'); // acceptFileTypes
    addUploadedFiles(images);
    setIsDrag(false);
  };

  return (
    <>
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
    </>
  );
};

export default FileDropArea;
