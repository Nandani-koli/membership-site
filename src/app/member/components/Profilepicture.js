'use client'
import { useState } from "react";
import Loading from "../loading";

const Profilepicture = (props) => {

    const maxfile_size = 1 * 1024 * 1024;
    const allowed_format = ['image/jpeg', 'image/png', 'image/jpg'];
    const id = props.userid;
    const [profilepicture, setprofilepicture] = useState();
    const [error, seterrors] = useState('');
    const [responseMsg,setresponseMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!profilepicture) {
            seterrors('Please select a image.')
        }
        else if (profilepicture.size > maxfile_size) {
            seterrors('Image size exceeds the maximum limit (1MB).');
        }
        else if(!allowed_format.includes(profilepicture.type)) {
            seterrors('Only JPEG, PNG, and JPG formats are allowed.');
            return;
        }
        else{
            setIsLoading(true);

        try {
            seterrors('');  
            const data = new FormData();
            data.set('file', profilepicture); 

            const res = await fetch(`/api/update/?id=${id}`, {
              method: 'POST',
              body: data,
            });
  
            let responsedata = await res.json();
            setIsLoading(false);
              if (responsedata.success) {
                  setresponseMsg(responsedata.message);
                  setTimeout(() => {
                    setresponseMsg('')
                  }, 2000);
              }
              else {
                  setresponseMsg(responsedata.message);
                  throw new Error("Failed to upload");
              }
          } catch (e) {
            throw new Error(e);
          }
    }
      };

    return (
        <>
        {responseMsg && <h4 className="text-success">{responseMsg}</h4>}
        {isLoading && <Loading />   }
        <form onSubmit={handleSubmit}>
            <div className="form-outline ">
                <label className="form-label">DRAG & DROP IMAGES</label>
                <input type="file" name="image" className="form-control form-control-lg"
                    onChange={(e) => setprofilepicture(e.target.files[0])}
                />
            </div>
            
            {error && <span className="text-danger">{error}</span>}
            
            <div className="mt-4 pt-2">
                <input className="btn btn-primary btn-lg" type="submit" value="upload" />
            </div>
        </form>
        </>
    )
}

export default Profilepicture