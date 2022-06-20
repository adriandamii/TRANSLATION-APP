import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTranslations } from '../actions/translations';
import { Helmet } from 'react-helmet-async';
import Translation from '../components/Translation';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const Home = () => {
  const dispatch = useDispatch();
  const translationsList = useSelector((state) => state.translationsList);
  const { loading, error, translations } = translationsList;

  useEffect(() => {
    dispatch(getTranslations());
  }, [dispatch]);

  return (
    <div>
      <Helmet>
        <title>Translation App</title>
      </Helmet>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {translations.length === 0 && (
            <MessageBox>No Translation Found</MessageBox>
          )}
          {translations.map((translation) => (
            <Translation key={translation._id} translation={translation} />
          ))}
        </>
      )}
    </div>
  );
};

export default Home;
