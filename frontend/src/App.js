import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container  className="blocked-content">
          <h1 className="intro text-center">Welcome to Newcastle Auto Spare Parts</h1>
          <Outlet></Outlet>
        </Container>
      </main>
      <Footer></Footer>
      <ToastContainer></ToastContainer>
    </>
  );
};

export default App;
