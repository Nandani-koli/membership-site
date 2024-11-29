'use client'
import Image from "next/image"
import { useEffect, useState } from "react"
import Loading from "../../loading"
import Link from "next/link"

const Media = () => {

    const [images, setimages] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const maxfile_size = 1 * 1024 * 1024;
    const allowed_format = ['image/jpeg', 'image/png', 'image/jpg'];
    const [picture, setpicture] = useState();
    const [error, seterrors] = useState('');
    const [responseMsg,setresponseMsg] = useState('');

    useEffect(() => {
        (async () => {

            let res = await fetch(`/api/imagegallery?page=${currentPage}`);
            let result = await res.json();

            setimages(result.images);
            setTotalPages(result.totalPages)
            setIsLoading(false)

        })();
    }, [currentPage])


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!picture) {
            seterrors('Please select a image.')
        }
        else if (picture.size > maxfile_size) {
            seterrors('Image size exceeds the maximum limit (1MB).');
        }
        else if(!allowed_format.includes(picture.type)) {
            seterrors('Only JPEG, PNG, and JPG formats are allowed.');
            return;
        }
        else{
            setIsLoading(true);

        try {
            seterrors('');  
            const data = new FormData();
            data.set('image', picture); 

            const res = await fetch('/api/imagegallery', {
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

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    return (
        <section className="vh-100 gradient-custom" style={{ backgroundColor: '#e3f2fd' }}>
            <div className="container py-5 h-100">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-9 col-xl-7">
                        <div className="card shadow-2-strong card-registration">
                            <div className="card-body p-4 p-md-5">
                                <h2 className="mb-4 pb-2 pb-md-0 mb-md-5">Create Gallery</h2>

                                {/* image upload form */}
                                <>
                                    {responseMsg && <h4 className="text-success">{responseMsg}</h4>}
                                    {isLoading && <Loading />}
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-outline ">
                                            <label className="form-label">DRAG & DROP IMAGES</label>
                                            <input type="file" name="image" className="form-control form-control-lg"
                                                onChange={(e) => setpicture(e.target.files[0])}
                                            />
                                        </div>

                                        {error && <span className="text-danger">{error}</span>}

                                        <div className="mt-4 pt-2">
                                            <input className="btn btn-primary btn-lg" type="submit" value="upload" />
                                        </div>
                                    </form>
                                </>

                                <Link href={'/member/users'}>Go Back</Link>
                            </div></div>
                        <div className="row text-center mt-5 " >
                            <h1>My Media Section</h1>
                        </div>
                    </div>
                </div>

                {/* Show user images  */}

                {(images.length == 0) ? isLoading ? <Loading /> : <h5 className="m-5 text-center">Please Upload Images</h5> :
                    <>
                        <div className="row row-cols-4">
                            {images.map((data, i) => (

                                <div className=" col" >
                                    <Image
                                        src={data.image} width="300" height="300"
                                    />
                                </div>
                            ))
                            }
                        </div>
                    </>
                }

                <div className="d-flex align-items-center justify-content-center">
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1}>&laquo; Prev</button>
                    <h3 className="m-2">
                        {currentPage}
                    </h3>
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages}>Next &raquo;</button>
                </div>
            </div>
        </section>
    )
}

export default Media