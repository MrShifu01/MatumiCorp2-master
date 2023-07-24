import { Table, Button } from "react-bootstrap"
import { FaEdit, FaTrash } from 'react-icons/fa'
import Loader from "../components/Loader"
import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const AdminPage = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [transactions, setTransactions] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                setLoading(true)
                const { data } = await axios.get('/api/transactions')
                setTransactions(data)
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
        await axios.delete(`/api/transactions/${id}`)
        setTransactions((prevTransactions) => prevTransactions.filter((transaction) => transaction._id !== id))
    }


  return (
    <div className="container-xxl">
        <h1 className="my-6 text-center">Transactions</h1>
        <div className="d-flex justify-content-end me-8">
            <Button className="my-6" onClick={handleAdd}>Add Transaction</Button>
        </div>
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
                    {transactions.map((transaction) => (
                        <tr key={transaction._id}>
                            <td>{transaction.title}</td>
                            <td>{transaction.mandate}</td>
                            <td>{transaction.geography}</td>
                            <td>{transaction.industry}</td>
                            <td>{transaction.description}</td>
                            <td>
                                <Button variant='light' className='btn-sm' onClick={() => handleEdit(transaction._id)}>
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