import {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Form, Button } from 'react-bootstrap';
import { decimalToRoman, romanToDecimal, resetErrors, } from '../features/convertSlice';

function FormConverter() {
  const [optionA, setOptionA] = useState('romanos');
  const [optionB, setOptionB] = useState('decimal');
  const [payload, setPayload] = useState('');
  const result = useSelector(state => state.convert.value);
  const { error, errorDecimal } = useSelector(state => state.convert);
  const dispatch = useDispatch();

  const changeOption = (e) => {
    const option = e.target.value;
    const targetId = e.target.id;
    if(targetId === 'a' && option === 'decimal' && optionB === 'decimal'){
      setOptionA('decimal');
      setOptionB('romanos');
    }else if(
      targetId === 'a' && 
      option === 'romanos' && 
      optionB === 'romanos'){
      setOptionA('romanos');
      setOptionB('decimal');
    }else if(
      targetId === 'b' && 
      option === 'decimal' && 
      optionA === 'decimal'
    ){
      setOptionA('romanos');
      setOptionB('decimal');
    }else{
      setOptionA('decimal');
      setOptionB('romanos');
    }
  };

  const convert = (e) => {
    e.preventDefault();
    
    if(optionB === 'romanos'){
      dispatch(decimalToRoman(payload));
    }else{
      dispatch(romanToDecimal(payload));
    }
  }

  useEffect(() => {
    dispatch(resetErrors());
  }, [ optionA, dispatch ])


  return (
    <Col>
      <h1 className="p-4 mt-3">Convertidor Numeros Romanos</h1>
      <Form onSubmit={e => convert(e)}>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>De</Form.Label>
              <Form.Select value={optionA} onChange={changeOption} id='a'>
                <option value='romanos'>Romans</option>
                <option value='decimal'>Decimal</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>A</Form.Label>
              <Form.Select id='b' value={optionB} onChange={changeOption}>
                <option value='romanos'>Romanos</option>
                <option value='decimal'>Decimal</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>
            {optionA === 'romanos' ? 'ROMANOS' : 'DECIMAL'}
          </Form.Label>
          <Form.Control 
            type="text" 
            onChange={e => setPayload(e.target.value)} 
            isInvalid={ optionA === 'romanos' ? error : errorDecimal }
          />
          <Form.Control.Feedback type="invalid">
            {optionA === 'romanos' 
            ? '¡Por favor ingrese solo un número romano válido!' 
            : '¡Ingrese solo números decimales y números menores de 4000!'}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>
            {optionB === 'decimal' ? 'DECIMAL' : 'ROMANS'}
          </Form.Label>
          <Form.Control type="text" value={result} disabled />
        </Form.Group>
      
        <Button variant="primary" type="submit">
          Convertir
        </Button>
      </Form>
    </Col>
  );
}

export default FormConverter;
