import { ChangeEvent } from 'react';
import { validateUploadFiles } from '../../utils/validateUploadFiles';

const ChooseFileInput = ({ uploadedFiles, addUploadedFiles, imageUploaderConfig }: any) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList: FileList | null = e.target.files;
    const images = validateUploadFiles(Array.prototype.slice.call(fileList), imageUploaderConfig, uploadedFiles);
    if (images?.length) {
      addUploadedFiles(images);
    }
  };

  return (
    <label style={{ cursor: 'pointer' }}>
      Загрузить файлы
      <input
        style={{ display: 'none' }}
        type="file"
        onChange={handleFileChange}
        accept={imageUploaderConfig.acceptFileTypes.join(', ')}
        multiple
      />
    </label>
  );
};

export default ChooseFileInput;
