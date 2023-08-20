import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <h1>Welcome to Newcastle</h1>
          <HomePage></HomePage>
        </Container>
      </main>
      <Footer></Footer>
    </>
  );
}

export default App;
