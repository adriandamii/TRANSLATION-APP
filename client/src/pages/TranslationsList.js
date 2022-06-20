import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteTranslation, getTranslations } from '../actions/translations';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { TRANSLATION_DELETE_RESET } from '../constants/actionTypes';

const TranslationsList = () => {
  const navigate = useNavigate();
  const translationsList = useSelector((state) => state.translationsList);
  const { loading, error, translations } = translationsList;

  const deletedTranslation = useSelector((state) => state.deletedTranslation);
  const {
    error: errorDelete,
    success: successDelete,
  } = deletedTranslation;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: TRANSLATION_DELETE_RESET });
    }
    dispatch(getTranslations());
  }, [dispatch, successDelete, errorDelete]);

  const deleteHandler = (translation) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteTranslation(translation._id));
    }
  };

  return (
    <div>
      <Helmet>
        <title>Translations List</title>
      </Helmet>
      <div className="row">
        <h1>Translations</h1>
      </div>

      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>NAME</th>
                <th>OFFICE</th>
                <th>PAGES</th>
                <th>PRICE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {translations.map((translation) => (
                <tr key={translation._id}>
                  <td>{translation.name}</td>
                  <td>{translation.office}</td>
                  <td>{translation.numberOfPages}</td>
                  <td>{translation.pagePrice}</td>
                  <td>
                    <Button
                      type="button"
                      className="small"
                      onClick={() => navigate(`/${translation._id}/edit`)}
                    >
                      Edit
                    </Button>{' '}
                    <Button
                      type="button"
                      className="small"
                      onClick={() => deleteHandler(translation)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default TranslationsList;
