import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer"

function App() {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <h1>Welcome to Newcastle</h1>
        </Container>
      </main>
      <Footer></Footer>
    </>
  );
}

export default App;
