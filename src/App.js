import { Container, Row, Col } from 'react-bootstrap';
import Form from './components/form';
import './App.css';

function App() {
  return (
    <div className="App">
      <Container>
        <Row>
          <Col />
          <Form />
          <Col />
        </Row>
      </Container>
    </div>
  );
}

export default App;
