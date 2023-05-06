import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ImageUpload = ({
    onChange,
    value
}) => {
    const [file, setFile] = useState(null);
    const [ imageUrl, setImageUrl ] = useState('');

    const handleFileInputChange = (event) => {
        const uploadedFile = event.target.files[0];
        setFile(uploadedFile);
    }

    const handleFileUpload = async () => {
        if (!file) {
            console.log('No file selected');
            return;
        }
        // get secure url from our server
        const res = await axios.get(`http://localhost:8800/api/s3/getUrl`, { withCredentials: true, } );
        const url = res.data.url;

        await axios.put(url, file, { headers: { 'Content-Type': file.type } });

        setImageUrl(url.split('?')[0]);
        
        
    }
    useEffect(() => {
        onChange(imageUrl);
        console.log(imageUrl)
    },[imageUrl]);
  return (
    <div className='flex flex-col gap-3'>
      <div className="bg-gray-300 border-dashed p-3">
        <input type='file' onChange={handleFileInputChange} />
        <button onClick={handleFileUpload}>Upload</button>
      </div>
      {value && <img className='w-full object-contain' src={value} />}
    </div>
  )
}

export default ImageUpload
