import { ChangeEvent } from 'react';

const ChooseFileInput = ({ addUploadedFiles }: any) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList: FileList | null = e.target.files;
    if (fileList?.length) {
      addUploadedFiles(Array.from(fileList));
    }
  };

  return (
    <label style={{ cursor: 'pointer' }}>
      Загрузить файлы
      <input
        style={{ display: 'none' }}
        type="file"
        onChange={handleFileChange}
        accept="image/png, image/jpeg" // acceptFileTypes
        multiple
      />
    </label>
  );
};

export default ChooseFileInput;
