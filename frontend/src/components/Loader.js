import { Spinner } from "react-bootstrap"

const Loader = () => {
  return (
    <Spinner
    animation="border"
    role="status"
    style={{
        width: "70px",
        height: "70px",
        margin: "300px auto",
        display: "block",
    }}
    ></Spinner>
  )
}

export default Loader