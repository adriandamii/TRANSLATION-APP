import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTranslations, getOffices } from '../actions/translations';
import { Helmet } from 'react-helmet-async';
import Translation from '../components/Translation';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Col, Row } from 'react-bootstrap';

const Home = () => {
  const dispatch = useDispatch();
  const translationsList = useSelector((state) => state.translationsList);
  const { loading, error, translations } = translationsList;

  useEffect(() => {
    dispatch(getTranslations({}));
    dispatch(getOffices());
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
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              {translations.length === 0 && (
                <MessageBox>No Translation Found</MessageBox>
              )}
              {translations.map((translation) => (
                <Translation key={translation._id} translation={translation} />
              ))}
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default Home;
