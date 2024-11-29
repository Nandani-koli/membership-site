'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '../../loading';

const FileUpload = () => {

  const router = useRouter();

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [error,seterrors] = useState('');
  const [responseMsg,setresponseMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const files = e.target.files;
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleRemoveFile = (fileIndex) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, index) => index !== fileIndex));
  };

  const handleSubmit = async(e) => {            
    e.preventDefault();

    const data = new FormData();

    selectedFiles.forEach((file) => {
      data.append('files', file);
    });

    if(error != '') 
    {
      return;
    }

    if (selectedFiles.length === 0) {
      seterrors('Please select at least one file to upload.');
      return;
    }

    setIsLoading(true)
    try {
      let res = await fetch('/api/userdetail',{
        method : 'POST',
        body : data,
      });

      let responsedata = await res.json();
      setIsLoading(false)
      
      setresponseMsg(responsedata.message);

      setTimeout(() => {
        setresponseMsg('');
        router.push('/member/users');
      }, 2000);


    } catch (error) {
      throw new Error(error);
    }
  }

  return (
    <section className="vh-100 gradient-custom" style={{ backgroundColor: '#e3f2fd' }}>
    <div className="container py-5 h-100">
        <div className="row justify-content-center align-items-center h-100">
            <div className="col-12 col-lg-9 col-xl-7">
            <div className="card shadow-2-strong card-registration">
                            <div className="card-body p-4 p-md-5">
      <h2 className="mb-4 pb-2 pb-md-0 mb-md-5">Upload Documents</h2>

      {responseMsg && <h4 className="text-success">{responseMsg}</h4>}

      {isLoading && <><Loading /></> }

      <form onSubmit={handleSubmit}>
      <input type="file" name='file' multiple accept=".pdf" onChange={handleFileChange} />
      <div>
        <h4>Selected Files:</h4>
        <ul>
          {selectedFiles.map((file, index) => (
            <li key={index}>
              {file.name}{' '}
              <button type="button" onClick={() => handleRemoveFile(index)}>
                Remove
              </button>
            </li>
          ))}
           {error && <span className="text-danger">{error}</span>}
        </ul>
      </div>

      <div className="mt-4 pt-2">
                <input className="btn btn-primary btn-lg" type="submit" value="upload" />
        </div>
      </form>
      </div>
      </div></div>
                </div>
            </div>

        </section>
  );
};

export default FileUpload;
