import { useState } from 'react'
import './App.css'

function App() {

  const [imageForUpload, setImageForUpload] = useState(null)

  const urlFileUpload = 'https://mvpspace.sfo3.digitaloceanspaces.com/PRIVATE/angel.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=XBGAXNHJ3EDVMKSHMZYR%2F20221003%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20221003T203223Z&X-Amz-Expires=14400&X-Amz-Signature=06ec805ce30929105695fdbfd09c41e98084eef7a814efcac482428f23cdbcd5&X-Amz-SignedHeaders=host&x-id=PutObject'

  const handleUpload = async () => {
    let binary = atob(imageForUpload.split(',')[1])
    let array = []
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i))
    }
    let blobData = new Blob([new Uint8Array(array)], { type: 'image/jpeg' })
    let headersList = {
      'x-amz-acl': 'public-read',
    }
    console.log(urlFileUpload)
    const result = await fetch(urlFileUpload, {
      method: 'PUT',
      headers: headersList,
      body: blobData,
    })
    console.log('result: ', result)
  }

  const handleRemoveImage = () => {
    setImageForUpload(null)
  }

  const handleFileChange = (e) => {
    let files = e.target.files || e.dataTransfer.files
    if (!files.length) return
    createImage(files[0])
  }

  const createImage = (file) => {
    let reader = new FileReader()
    reader.onload = (e) => {
      setImageForUpload(e.target.result)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="App">
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <h1>Test upload files</h1>
        {imageForUpload && <div><img src={imageForUpload} alt="imageForUpload" /> <br /></div>}
        <input type={'file'} onChange={handleFileChange} accept="image/jpg" />
        <br></br><br></br>
        <div style={{
          display: 'inline-flex',
          flexWrap: 'wrap',
          gap: '10px',
        }}>
          <button onClick={handleUpload}>Upload image bitch</button><br></br>
          <button onClick={handleRemoveImage}>Remove image</button>
        </div>
      </div>
    </div>
  )
}

export default App
