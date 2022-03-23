import React from 'react';

export default function UploadForm(){
    
    // const [count, setCount] = useState(0);

    return (
        <form action="http://127.0.0.1:3001/upload" method='post' encType="multipart/form-data">
            <input multiple type="file" name="files_upload" />
            <input type="submit" value="Enviar" />
        </form>
      );
}