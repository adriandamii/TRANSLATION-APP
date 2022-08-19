import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createTranslation, getOffices } from '../actions/translations';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import SuccessBox from '../components/SuccessBox';
import { TRANSLATION_CREATE_RESET } from '../constants/actionTypes';
import toast from 'react-hot-toast';

const createToastSuccess = () => toast.success('Translation successfully created!');
const createToastFail = () => toast.error('Sorry! Translation unsuccessfully created!');

export default function CreateTranslations() {
  const [inputReadOnly, setInputReadOnly] = useState(true);
  const navigate = useNavigate();
  const [translationData, setTranslationData] = useState({
    name: '',
    office: '',
    pagePrice: '',
    numberOfPages: '',
  });
  
  const translationsOfficeList = useSelector(
    (state) => state.translationsOfficeList
  );
  
  const {
    loading: loadingOffices,
    error: errorOffices,
    offices,
  } = translationsOfficeList;
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOffices());
  }, [dispatch]);
  
  const createdTranslation = useSelector((state) => state.createdTranslation);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    translations,
  } = createdTranslation;

  const clear = () => {
    setTranslationData({ 
      name: '', 
      office: '', 
      pagePrice: '', 
      numberOfPages: '', 
    });
  };

  function handleChange(e) {
    setTranslationData({
      ...translationData,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    if (translations) {
      setTranslationData(translations);
    }
    if (successCreate) {
      dispatch({ type: TRANSLATION_CREATE_RESET });
      navigate('/');
      createToastSuccess();
    }
    if (errorCreate) {
      createToastFail();
    }
  }, [translations, successCreate, errorCreate]);

  const handleSubmit = async (e) => {
    dispatch(createTranslation(translationData));
    e.preventDefault();
    clear();
  };
  
  if (loadingOffices === false && offices[0] !== '') {
    offices.unshift('');
  }
  
  function handleCreateSelect() {
    setInputReadOnly(!inputReadOnly);
    setTranslationData({ ...translationData, office: '' });
  }
  
  return (
    <div className="form-container">
      <Helmet>
        <title>Create Translation</title>
      </Helmet>
      <center>
        <h1>Create Translation</h1>
      </center>
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
            value={translationData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Label>Create / Select the Office</Form.Label>
        {loadingOffices ? (
          <LoadingBox></LoadingBox>
        ) : errorOffices ? (
          <MessageBox variant="danger">{errorOffices}</MessageBox>
        ) : (
          <InputGroup className="mb-3" controlid="office">
          <Button onClick={handleCreateSelect}>
              {inputReadOnly ? 'Create' : 'Select'} Office
            </Button>
            <Form.Control
              name="office"
              value={translationData.office}
              required
              placeholder={
                !inputReadOnly
                  ? 'Please type an office'
                  : 'Please select an office'
              }
              onChange={!inputReadOnly ? handleChange : null}
              disabled={inputReadOnly ? true : false}
            />
            <select
              name="offices"
              title="create or select"
              onChange={(e) =>
                setTranslationData({ 
                  ...translationData, 
                  office: e.target.value 
                })
              }
              onClick={() => setInputReadOnly(true)}
            >
              {offices.map((office) => (
                <option key={office} value={office}>
                  {office}
                </option>
              ))}
            </select>
          </InputGroup>
        )}
        <Form.Group className="mb-3" controlId="pagePrice">
          <Form.Label>Page price</Form.Label>
          <Form.Control
            name="pagePrice"
            value={translationData.pagePrice}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="numberOfPages">
          <Form.Label>Number of Pages</Form.Label>
          <Form.Control
            name="numberOfPages"
            value={translationData.numberOfPages}
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
