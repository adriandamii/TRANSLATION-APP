import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getTranslations, getOffices } from '../actions/translations';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Translation from '../components/Translation';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, ListGroup, Overlay } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { months } from '../utils';
import { TRANSLATION_DELETE_RESET } from '../constants/actionTypes';

export default function Home() {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const [arrPrices, setArrPrices] = useState([]);
  const [, setTranslations] = useState([]);
  let res = '';
  const navigate = useNavigate();
  const { 
    name = 'all', 
    office = 'all', 
    translated = 'all',
    month = 'all',
  } = useParams();
  const dispatch = useDispatch();
  const translationsList = useSelector((state) => state.translationsList);
  const { loading, error, translations, count } = translationsList;

  const translationsOfficeList = useSelector(
    (state) => state.translationsOfficeList
  );

  const {
    loading: loadingOffices,
    error: errorOffices,
    offices,
  } = translationsOfficeList;

  const deletedTranslation = useSelector((state) => state.deletedTranslation);
  const { error: errorDelete, success: successDelete } = deletedTranslation;
  
  useEffect(() => {
    if (loading === false) {
      setTranslations(translations);
      for (let i = 0; i < translations.length; ++i) {
        setArrPrices((oldArray) => [...oldArray, translations[i].pagePrice]);
      }
    }
  }, [loading]);
  
  useEffect(() => {
    if (successDelete) {
      dispatch({ type: TRANSLATION_DELETE_RESET });
      handleSumReset();
    }
    dispatch(getOffices());
    dispatch(
      getTranslations({
        name: name !== 'all' ? name : '',
        office: office !== 'all' ? office : '',
        translated: translated !== 'all' ? translated : '',
        month: month !== 'all' ? month : '',
      })
    );
  }, [dispatch, name, office, translated, month, successDelete]);

  const getFilterUrl = (filter) => {
    const filterOffice = filter.office || office;
    const filterTranslated = filter.translated || translated;
    const filterName = filter.name || name;
    const filterMonth = filter.month || month;
    return `/search/office/${filterOffice}/name/${filterName}/translated/${filterTranslated}/month/${filterMonth}`;
  };

  if (arrPrices.length !== 0) {
    const totalSelectedPrice = 0;
    res = arrPrices.reduce(
      (previousValue, currentValue) =>
        parseInt(previousValue) + parseInt(currentValue),
      totalSelectedPrice
    );
  }
  function handleSumReset() {
    setArrPrices([]);
  }
  
  return (
    <div className="main-container">
      <Helmet>
        <title>Search Translations</title>
      </Helmet>
      <Row className="main-row">
        <Col md={3}>
          <div className="d-flex">
            <h3>Filters</h3>{' '}
            <Button
              className="ms-6"
              variant="primary"
              ref={target}
              onClick={() => setShow(!show)}
            >
              Check sum
            </Button>
          </div>
          <Overlay target={target.current} show={show} placement="right">
            {({ placement, arrowProps, show: _show, popper, ...props }) => (
              <div
                {...props}
                style={{
                  position: 'absolute',
                  backgroundColor: 'rgba(255, 100, 100, 0.85)',
                  padding: '2px 10px',
                  color: 'white',
                  borderRadius: 3,
                  ...props.style,
                }}
              >
                {res === '' ? 0 : res}
              </div>
            )}
          </Overlay>
          <div>
            {loadingOffices ? (
              <LoadingBox></LoadingBox>
            ) : errorOffices ? (
              <MessageBox variant="danger">{errorOffices}</MessageBox>
            ) : (
              <ul className="office-list">
                <li className="list-filter">
                  <Link
                    className={'all' === office ? 'txt' : ''}
                    to={getFilterUrl({ office: 'all' })}
                    style={{ textDecoration: 'none' }}
                    onClick={handleSumReset}
                  >
                    All
                  </Link>
                </li>
                {offices.map((c) => (
                  <li className="list-filter" key={c}>
                    <Link
                      className={c === office ? 'txt' : ''}
                      to={getFilterUrl({ office: c })}
                      style={{ textDecoration: 'none' }}
                      onClick={handleSumReset}
                    >
                      {c}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            <ul>
              <li className="list-filter">
                <Link
                  className={'all' === translated ? 'txt' : ''}
                  to={getFilterUrl({ translated: 'all' })}
                  style={{ textDecoration: 'none' }}
                  onClick={handleSumReset}
                >
                  All
                </Link>
              </li>
              <li className="list-filter">
                <Link
                  className={'true' === translated ? 'txt' : ''}
                  to={getFilterUrl({ translated: 'true' })}
                  style={{ textDecoration: 'none' }}
                  onClick={handleSumReset}
                >
                  Translated
                </Link>
              </li>
              <li className="list-filter">
                <Link
                  className={'false' === translated ? 'txt' : ''}
                  to={getFilterUrl({ translated: 'false' })}
                  style={{ textDecoration: 'none' }}
                  onClick={handleSumReset}
                >
                  Not translated
                </Link>
              </li>
            </ul>
            <ul>
              <li className="list-filter">
                <Link
                  className={'all' === month ? 'txt' : ''}
                  to={getFilterUrl({ month: 'all' })}
                  style={{ textDecoration: 'none' }}
                  onClick={handleSumReset}
                >
                  All
                </Link>
              </li>
              {months.map((m) => (
                <li key={m.nr} className="list-filter">
                  <Link
                    className={m.nr === parseInt(month) ? 'txt' : ''}
                    to={getFilterUrl({ month: m.nr })}
                    style={{ textDecoration: 'none' }}
                    onClick={handleSumReset}
                  >
                    {m.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Col>
        <Col md={9}>
          <div className="col-8">
            {loading ? (
              <LoadingBox></LoadingBox>
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              <>
                <Row className="justify-content-between mb-3">
                  <Col md={6}>
                    <div>
                      {count === 0 ? 'No' : count} Results
                      {name !== 'all' && ' : ' + name}
                      {office !== 'all' && ' : ' + office}
                      {name !== 'all' || office !== 'all' ? (
                        <Button
                          variant="light"
                          onClick={() => navigate('/')}
                        >
                          <i className="fas fa-times-circle"></i>
                        </Button>
                      ) : null}
                    </div>
                  </Col>
                </Row>
                {translations.length === 0 && (
                  <MessageBox>No Translation Found</MessageBox>
                )}
                <Col md={12}>
                  <ListGroup variant="flush">
                    {translations.map((translation) => (
                      <Translation
                        key={translation._id}
                        translation={translation}
                        setTranslations={setTranslations}
                      />
                    ))}
                  </ListGroup>
                </Col>
              </>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}
