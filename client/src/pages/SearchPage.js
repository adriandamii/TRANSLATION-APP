import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getTranslations, getOffices } from '../actions/translations';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Translation from '../components/Translation';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Helmet } from 'react-helmet-async';

export default function SearchPage() {
  const [, setTranslations] = useState([]);
  const navigate = useNavigate();
  const { 
    name = 'all', 
    office = 'all', 
    pageNumber = 1, 
    translated = 'all' 
  } = useParams();
  const dispatch = useDispatch();
  const translationsList = useSelector((state) => state.translationsList);
  const { loading, error, translations, page, pages, count } = translationsList;

  const translationsOfficeList = useSelector(
    (state) => state.translationsOfficeList
  );

  const {
    loading: loadingOffices,
    error: errorOffices,
    offices,
  } = translationsOfficeList;

  useEffect(() => {
    if (loading === false) {
      setTranslations(translations);
    }
  }, [loading]);
  
  useEffect(() => {
    dispatch(getOffices());
    dispatch(
      getTranslations({
        pageNumber,
        name: name !== 'all' ? name : '',
        office: office !== 'all' ? office : '',
        translated: translated !== 'all' ? translated : '',
      })
    );
  }, [dispatch, name, office, pageNumber, translated]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || 1;
    const filterOffice = filter.office || office;
    const filterTranslated = filter.translated || translated;
    const filterName = filter.name || name;
    return `/search/office/${filterOffice}/name/${filterName}/translated/${filterTranslated}/pageNumber/${filterPage}`;
  };

  return (
    <div>
      <Helmet>
        <title>Search Translations</title>
      </Helmet>
      <Row>
        <Col md={3}>
          <h3>Filters</h3>
          <div>
            {loadingOffices ? (
              <LoadingBox></LoadingBox>
            ) : errorOffices ? (
              <MessageBox variant="danger">{errorOffices}</MessageBox>
            ) : (
              <ul>
                <li>
                  <Link
                    className={'all' === office ? 'text-bold' : ''}
                    to={getFilterUrl({ office: 'all' })}
                    style={{ textDecoration: 'none' }}
                  >
                    All
                  </Link>
                </li>
                {offices.map((c) => (
                  <li key={c}>
                    <Link
                      className={c === office ? 'text-bold' : ''}
                      to={getFilterUrl({ office: c })}
                      style={{ textDecoration: 'none' }}
                    >
                      {c}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            <ul>
              <li>
                <Link
                  className={'all' === translated ? 'text-bold' : ''}
                  to={getFilterUrl({ translated: 'all' })}
                  style={{ textDecoration: 'none' }}
                >
                  All
                </Link>
              </li>
              <li>
                <Link
                  className={'true' === translated ? 'text-bold' : ''}
                  to={getFilterUrl({ translated: 'true' })}
                  style={{ textDecoration: 'none' }}
                >
                  Translated
                </Link>
              </li>
              <li>
                <Link
                  className={'false' === translated ? 'text-bold' : ''}
                  to={getFilterUrl({ translated: 'false' })}
                  style={{ textDecoration: 'none' }}
                >
                  Not translated
                </Link>
              </li>
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
                          onClick={() => navigate('/search/name/')}
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
                  {translations.map((translation) => (
                    <Translation
                      key={translation._id}
                      translation={translation}
                      setTranslations={setTranslations}
                    ></Translation>
                  ))}
                </Col>

                <div>
                  {[...Array(pages).keys()].map((x) => (
                    <LinkContainer
                      key={x + 1}
                      className="mx-1"
                      to={getFilterUrl({ page: x + 1 })}
                    >
                      <Button
                        className={Number(page) === x + 1 ? 'text-bold' : ''}
                        variant="light"
                      >
                        {x + 1}
                      </Button>
                    </LinkContainer>
                  ))}
                </div>
              </>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}
