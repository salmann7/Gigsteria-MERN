import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ImageUpload = ({ onChange, value ,id,
  register,
  required,
  errors,
disabled
}) => {
  console.log(value);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(value || '');

  const handleFileInputChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };

  const handleFileUpload = async () => {
    if (!file) {
      console.log('No file selected');
      return;
    }
    // get secure url from our server
    const res = await axios.get(`http://localhost:8800/api/s3/getUrl`, { withCredentials: true });
    const url = res.data.url;

    await axios.put(url, file, { headers: { 'Content-Type': file.type } });

    setImageUrl(url.split('?')[0]);
  };

  useEffect(() => {
    onChange(imageUrl);
  }, [imageUrl]);

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const uploadedFile = event.dataTransfer.files[0];
    setFile(uploadedFile);
  };

  return (
    <div className="flex flex-col gap-3">
      {value 
      ? (
          <img className="w-full object-contain" src={value} alt="uploaded" />
        ) 
      : (
          <div
            className="border-[1px] border-dashed bg-neutral-200 border-neutral-500 w-full flex flex-col items-center justify-center h-60 rounded-lg"
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}>
              {file 
              ? (
                  <>
                    <p>{file.name}</p>
                  </>
                ) 
              : (
                  <>
                    <p className="mb-4">Drag and drop images here or choose files</p>
                    <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer" onClick={() => document.getElementById(id).click()}>Choose Files</div>
                    <input {...register(id, {required})} disabled={disabled} id={id} type="file" className="hidden" onChange={handleFileInputChange} />
                  </>
                )
              }
          </div>
        )
      }
      {file && (
        <>
          {!value && <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleFileUpload}>Upload</button>}
        </>
      )}
    </div>
  );
};

export default ImageUpload;

