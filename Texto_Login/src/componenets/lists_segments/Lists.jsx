import React,{useState,useEffect} from 'react'
import axios from 'axios';
import Header from '../header/Header';
import { Button } from 'react-bootstrap';
import "./Lists.css";
import Footer from '../footer/Footer';



const Lists = () => {
  // const [file, setFile] = useState(null);


  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0]);
  // };

  // const handleUpload = async () => {
  //   const formData = new FormData();
  //   formData.append("file", file);

  //   await axios.post("http://localhost:5000/upload", formData, {
  //     headers: { "Content-Type": "multipart/form-data" },
  //   });

    
  // };

  const [file, setFile] = useState(null);
  const [filesData, setFilesData] = useState([]);

  const fetchFiles = async () => {
    const res = await axios.get("http://localhost:5000/files");
    setFilesData(res.data);
  };

  useEffect(() => {
    fetchFiles();
  });

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    await axios.post("http://localhost:5000/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setFile(null);
    fetchFiles(); // refresh after upload
  };

  return (
    <>
    <Header/>
    <div className="upload-container">
      <h2 className='header'>Lists And Segments</h2>
      <input type="file" onChange={handleFileChange} />
      <button className='btn' onClick={handleUpload}>Upload</button>

      <h3 className='header'>Uploaded Files</h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Profiles</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {filesData.map((f) => (
            <tr key={f.id}>
              <td>{f.name}</td>
              <td>{f.type}</td>
              <td>{f.profiles}</td>
              <td>{new Date(f.created_at).toLocaleString()}</td>
              <td>{new Date(f.updated_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Footer/>
    </>
  );
}
export default Lists