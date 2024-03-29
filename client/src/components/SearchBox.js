import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const infoSearch = () => toast(
  <div>
    <span className='info-icon'>
      <i className="fas fa-info-circle"></i>
    </span> {' '}
    Type something in the search box!
  </div>
);

export default function SearchBox() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    if (name === '') {
      infoSearch();
    } else {
      navigate(`/search/name/${name}`);
    }
  };

  return (
    <Form className="d-flex me-auto" onSubmit={submitHandler}>
      <InputGroup>
        <FormControl
          type="text"
          name="name"
          id="name"
          onChange={(e) => setName(e.target.value)}
          placeholder="search translations..."
          aria-label="Search Translations"
          aria-describedby="button-search"
        ></FormControl>
        <Button variant="outline-primary" type="submit" id="button-search">
          <i className="fas fa-search"></i>
        </Button>
      </InputGroup>
    </Form>
  );
}
