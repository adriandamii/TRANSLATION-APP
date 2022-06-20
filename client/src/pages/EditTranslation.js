import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import SuccessBox from '../components/SuccessBox';
import { TRANSLATION_UPDATE_RESET } from '../constants/actionTypes';
import { useNavigate, useParams } from 'react-router-dom';
import { detailsTranslation, updateTranslation } from '../actions/translations';

const EditTranslation = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id: translationId } = params;
  const [name, setName] = useState('');
  const [office, setOffice] = useState('');
  const [pagePrice, setPagePrice] = useState('');
  const [numberOfPages, setNumberOfPages] = useState('');

  const detailedTranslation = useSelector((state) => state.detailedTranslation);
  const { translation } = detailedTranslation;

  const updatedTranslation = useSelector((state) => state.updatedTranslation);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = updatedTranslation;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successUpdate) {
      navigate('/viewList');
    }
    if (!translation || translation._id !== translationId || successUpdate) {
      dispatch({ type: TRANSLATION_UPDATE_RESET });
      dispatch(detailsTranslation(translationId));
    } else {
      setName(translation.name);
      setOffice(translation.office);
      setPagePrice(translation.pagePrice);
      setNumberOfPages(translation.numberOfPages);
    }
  }, [translation, dispatch, translationId, successUpdate, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateTranslation({
        _id: translationId,
        name,
        office,
        pagePrice,
        numberOfPages,
      })
    );
  };
  return (
    <div>
      <div>
        <Helmet>
          <title>Update Translation</title>
        </Helmet>
        <h1>Update Translation</h1>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {successUpdate && (
          <SuccessBox variant="success">
            Successfully translation updated!
          </SuccessBox>
        )}

        <Form onSubmit={handleSubmit} className="form-container">
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              length="20"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="office">
            <Form.Label>Office</Form.Label>
            <Form.Control
              name="office"
              value={office}
              onChange={(e) => setOffice(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="pagePrice">
            <Form.Label>Page price</Form.Label>
            <Form.Control
              name="pagePrice"
              value={pagePrice}
              onChange={(e) => setPagePrice(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="numberOfPages">
            <Form.Label>Number of Pages</Form.Label>
            <Form.Control
              name="numberOfPages"
              value={numberOfPages}
              onChange={(e) => setNumberOfPages(e.target.value)}
              required
            />
          </Form.Group>
          <Button size="large" color="secondary" type="submit">
            Update
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default EditTranslation;
