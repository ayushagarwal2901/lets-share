import { useState, useEffect, useRef } from 'react';
import './App.css';
import { uploadFile } from './service/api';
import fileIcon from './file.svg';
import copyIcon from './copy-icon.svg';

function App() {
  const [file, setFile] = useState('');
  const [result, setResult] = useState('');

  const fileInputRef = useRef();

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await uploadFile(data);
        setResult(response.path);
      }
    }
    getImage();
  }, [file])

  const onUploadClick = () => {
    fileInputRef.current.click();
  }

  const copyURLToClipboard = () => {
    const fileURLInput = document.getElementById('fileURL');
    if (fileURLInput) {
      const fileURL = fileURLInput.value;
      navigator.clipboard.writeText(fileURL)
        .then(() => {
          // Show a toast or provide a visual feedback that the URL has been copied
          console.log('URL copied to clipboard:', fileURL);
        })
        .catch((error) => {
          console.error('Error copying URL to clipboard:', error);
        });
    }
  }

  return (
    <div>
      <section className="upload-container">
        <form>
          <div className="drop-zone">
            <div className="icon-container">
              <img src={fileIcon} draggable="false" className="center" alt="File Icon" />
              <img src={fileIcon} draggable="false" className="left" alt="File Icon" />
              <img src={fileIcon} draggable="false" className="right" alt="File Icon" />
            </div>
            <div className="title">
              Drop your Files here or,{' '}
              <span id="browseBtn" onClick={() => onUploadClick()} >
                browse
              </span>
              <input type="file" id="fileInput" ref={fileInputRef} onChange={(e)=> setFile(e.target.files[0])} />
            </div>
          </div>
        </form>
        <div className="progress-container">
          <div className="bg-progress"></div>

          <div className="sharing-container">
            <div className="input-container">
            {result && (
              <div className="input-container">
                <input type="text" id="fileURL" readOnly value={result} />
                <img src={copyIcon} id="copyURLBtn" alt="copy to clipboard icon" onClick={copyURLToClipboard} />
              </div>
            )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
