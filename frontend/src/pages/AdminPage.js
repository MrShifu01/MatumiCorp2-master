import { Table, Button, Form } from "react-bootstrap"
import { FaEdit, FaTrash } from 'react-icons/fa'
import Loader from "../components/Loader"
import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const AdminPage = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [transactions, setTransactions] = useState([])
    const [search, setSearch] = useState('')
    console.log(search)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                setLoading(true)
                const { data } = await axios.get('/api/transactions')
                setTransactions(data.transactions)
                setLoading(false)
            } catch (error) {
                setError(error.message)
                setLoading(false)
            }
        }
        fetchTransactions()
    }, [])

    const handleAdd = async () => {
        try {
          setLoading(true);
          const { data } = await axios.post('/api/transactions');
          setTransactions((prevTransactions) => [...prevTransactions, data]);
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      };

    const handleEdit = async (id) => {
        navigate(`/admin/transactions/edit/${id}`)
    }
    
    const handleDelete = async (id) => {
        window.confirm('Are you sure you want to delete this transaction?')
        await axios.delete(`/api/transactions/admin/${id}`)
        setTransactions((prevTransactions) => prevTransactions.filter((transaction) => transaction._id !== id))
    }

    const navHome = () => {
        navigate('/')
    }

    const navTransactions = () => {
        navigate('/transactions')
    }

  return (
    <div className="container-xxl">
        <h1 className="my-6 text-center">Transactions</h1>
        <div className="d-flex justify-content-between">
            <div className="d-flex flex-column">
                <div className="d-flex">
                    <Button className="mb-3" variant="secondary" onClick={navHome}>Home Page</Button>
                </div>
                <div className="d-flex">
                    <Button className="" variant="secondary" onClick={navTransactions}>Transaction Page</Button>
                </div>
            </div>
            <div className="d-flex justify-content-end me-8">
                <Button className="my-6" onClick={handleAdd}>Add Transaction</Button>
            </div>
        </div>

        <h2 className="ms-3">Search</h2>
                  <Form className="d-flex">
                    <Form.Control
                      type="text"
                      value={search}
                      onChange={(ev) => setSearch(ev.target.value)}
                      placeholder="Search Transactions..."
                      className="mr-sm-2 ml-sm-5 ps w-25 bg-transparent border-top-0 border-start-0 border-end-0 rounded-0 border-muted"
                    ></Form.Control>
                  </Form>

        {loading ? (
            <Loader />
        ) : error ? (
            <p>{error}</p>
        ) : (
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Mandate</th>
                        <th>Geography</th>
                        <th>Industry</th>
                        <th>Description</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {transactions?.filter((item) => {
                        return search.toLowerCase() === '' || 
                        item.title.toLowerCase().includes(search.toLowerCase()) || 
                        item.mandate.toLowerCase().includes(search.toLowerCase()) || 
                        item.geography.toLowerCase().includes(search.toLowerCase()) || 
                        item.industry.toLowerCase().includes(search.toLowerCase()) || 
                        item.description.toLowerCase().includes(search.toLowerCase());
                    }).map((transaction) => (
                        <tr key={transaction._id}>
                            <td>{transaction.title}</td>
                            <td>{transaction.mandate}</td>
                            <td>{transaction.geography}</td>
                            <td>{transaction.industry}</td>
                            <td>{transaction.description}</td>
                            <td className="d-flex gap-2">
                                <Button variant='primary' className='btn-sm' onClick={() => handleEdit(transaction._id)}>
                                    <FaEdit />
                                </Button>
                                <Button variant='danger' className='btn-sm' onClick={() => handleDelete(transaction._id)}>
                                    <FaTrash />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )}
    </div>
  )
}

export default AdminPage