import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const EditTransactionPage = () => {
    const { id } = useParams()
    const [title, setTitle] = useState('')
    const [mandate, setMandate] = useState('')
    const [geography, setGeography] = useState('')
    const [industry, setIndustry] = useState('')
    const [description, setDescription] = useState('')
    const [imageSrc, setImageSrc] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        const fetchTransaction = async () => {
            const response = await axios(`/api/transactions/admin/${id}`)
            const transaction = response.data
            setTitle(transaction.title)
            setMandate(transaction.mandate)
            setGeography(transaction.geography)
            setIndustry(transaction.industry)
            setDescription(transaction.description)
            setImageSrc(transaction.imageSrc)
        }
        fetchTransaction()
    }, [])

    const submitHandler = async (e) => {
      e.preventDefault();
      try {
        await axios.put(`/api/transactions/admin/${id}`, {
          title,
          mandate,
          geography,
          industry,
          description,
          imageSrc,
        });
        alert('Transaction updated');

        navigate('/admin/transactions');
      } catch (err) {
        alert(err?.data?.message || err.error);
      }
    };

    const uploadFileHandler = async (e) => {
      const file = e.target.files[0]
      const formData = new FormData()
      formData.set('image', file)
      try {
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        const { data } = await axios.post('/api/upload', formData, config)
        setImageSrc(data.image)
        alert(data.message)

      } catch (error) {
        console.error(error)
      }

    }



  return (
    <section>
      <div className="container-xxl">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h1 className="text-center my-6">Edit Transaction</h1>
            <form onSubmit={submitHandler}>
              <div className="form-group">
                
                <label>Title</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="Enter title"
                />

                <label>Mandate</label>
                <input
                  value={mandate}
                  onChange={(e) => setMandate(e.target.value)}
                  type="text"
                  className="form-control"
                  id="mandate"
                  placeholder="Enter mandate"
                />

                <label>Geography</label>
                <input
                  value={geography}
                  onChange={(e) => setGeography(e.target.value)}
                  type="text"
                  className="form-control"
                  id="geography"
                  placeholder="Enter Geography"
                />

                <label>Industry</label>
                <input
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  type="text"
                  className="form-control"
                  id="industry"
                  placeholder="Enter Industry"
                />

                <label>Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                  className="form-control"
                  id="description"
                  placeholder="Enter Description"
                  rows="3"
                />

                <label>Image</label>
                <input
                  value={imageSrc}
                  onChange={(e) => setImageSrc(e.target.value)}
                  type="text"
                  className="form-control"
                  id="imageSrc"
                  placeholder="Enter imageSrc"
                />

                <input
                label='Choose File'
                className='form-control-file mt-5'
                onChange={uploadFileHandler}
                type='file'
                />

              </div>
              <button type="submit" className="btn btn-primary mt-6">
                Update
              </button>
            </form>  
          </div>
        </div>
      </div>
    </section>
  )
}

export default EditTransactionPage