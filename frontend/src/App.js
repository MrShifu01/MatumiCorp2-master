import './App.css';
import './custom.scss';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import axios from 'axios'

axios.defaults.baseURL = "http://localhost:8000"
// axios.defaults.baseURL = "https://matumi-server.onrender.com"

function App() {
  return (
    <div className="App">
        <HomePage/>
        <Footer/>
    </div>
  );
}

export default App;
