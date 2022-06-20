import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createTranslation } from '../actions/translations';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import SuccessBox from '../components/SuccessBox';
import { TRANSLATION_CREATE_RESET } from '../constants/actionTypes';

export default function CreateTranslations() {
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    name: '',
    office: '',
    pagePrice: '',
    numberOfPages: '',
  });

  const dispatch = useDispatch();
  const createdTranslation = useSelector((state) => state.createdTranslation);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    translations,
  } = createdTranslation;

  const clear = () => {
    setPostData({ name: '', office: '', pagePrice: '', numberOfPages: '' });
  };

  function handleChange(e) {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    if (translations) {
      setPostData(translations);
    }
    if (successCreate) {
      dispatch({ type: TRANSLATION_CREATE_RESET });
      navigate('/');
    }
  }, [translations, successCreate]);

  const handleSubmit = async (e) => {
    dispatch(createTranslation(postData));
    e.preventDefault();
    clear();
  };
  return (
    <div>
      <Helmet>
        <title>Create Translation</title>
      </Helmet>
      <h1>Create Translation</h1>
      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {successCreate && (
        <SuccessBox variant="success">Successfully created!</SuccessBox>
      )}

      <Form onSubmit={handleSubmit} className="form-container">
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            value={postData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="office">
          <Form.Label>Office</Form.Label>
          <Form.Control
            name="office"
            value={postData.office}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="pagePrice">
          <Form.Label>Page price</Form.Label>
          <Form.Control
            name="pagePrice"
            value={postData.pagePrice}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="numberOfPages">
          <Form.Label>Number of Pages</Form.Label>
          <Form.Control
            name="numberOfPages"
            value={postData.numberOfPages}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button size="large" color="secondary" type="submit">
          Create
        </Button>
      </Form>
    </div>
  );
}
