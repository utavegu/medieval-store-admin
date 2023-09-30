import { ChangeEvent } from 'react';
import { validateUploadFiles } from '../../utils/validateUploadFiles';

const ChooseFileInput = ({ addUploadedFiles, imageUploaderConfig }: any) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList: FileList | null = e.target.files;
    const images = validateUploadFiles(
      Array.prototype.slice.call(fileList),
      imageUploaderConfig.maxFileSizeInBytes,
      imageUploaderConfig.acceptFileTypes
    );
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
