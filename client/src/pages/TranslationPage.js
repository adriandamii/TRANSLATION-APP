import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { detailsTranslation } from '../actions/translations';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const TranslationPage = () => {
  const params = useParams();
  const { id: translationId } = params;

  const detailedTranslation = useSelector((state) => state.detailedTranslation);
  const { loading, error, translation } = detailedTranslation;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsTranslation(translationId));
  }, [dispatch, translationId]);

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Helmet>
            <title>{translation.name}</title>
          </Helmet>
          <h1>{translation.name}</h1>
        </div>
      )}
    </div>
  );
};

export default TranslationPage;
