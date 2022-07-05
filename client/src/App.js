import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Nav, ToastContainer } from 'react-bootstrap';
import Home from './pages/Home';
import CreateTranslations from './pages/CreateTranslations';
import TranslationsList from './pages/TranslationsList';
import EditTranslation from './pages/EditTranslation';
import TranslationPage from './pages/TranslationPage';
import SearchBox from './components/SearchBox';
import { useDispatch, useSelector } from 'react-redux';
import { getOffices } from './actions/translations';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import SearchPage from './pages/SearchPage';
import { Link } from 'react-router-dom';

const App = () => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
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
  
  return (
    <BrowserRouter>
      <div
        className={
          sidebarIsOpen
            ? 'd-flex flex-column site-container active-cont'
            : 'd-flex flex-column site-container'
        }
      >
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <Button
                variant="dark"
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <i className="fas fa-bars"></i>
              </Button>
              <LinkContainer to="/">
                <Navbar.Brand>Translation App</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <SearchBox />
                <Nav className="me-auto  w-100  justify-content-end">
                  <Nav.Link href="/create">Create Translation</Nav.Link>
                  <Nav.Link href="/viewList">View Translations</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <div
          className={
            sidebarIsOpen
              ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
              : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
          }
        >
          <Nav className="flex-column text-white w-100 p-2">
            <Nav.Item>
              <strong>Offices</strong>
            </Nav.Item>
            {loadingOffices ? (
              <LoadingBox></LoadingBox>
            ) : errorOffices ? (
              <MessageBox variant="danger">{errorOffices}</MessageBox>
            ) : (
              offices.map((office) => (
                <Nav.Item key={office}>
                  <Link
                    to={`/search/office/${office}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    {office}
                  </Link>
                </Nav.Item>
              ))
            )}
          </Nav>
        </div>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateTranslations />} />
            <Route path="/viewList" element={<TranslationsList />} />
            <Route path="/viewList/pageNumber/:pageNumber" element={<TranslationsList />} />
            <Route path="/:id/edit" element={<EditTranslation />} />
            <Route path="/:id" element={<TranslationPage />} />
            
            <Route path="/search/name" exact element={<SearchPage />}/>
            <Route path="/search/name/:name" exact element={<SearchPage />} />
            <Route path="/search/office/:office" exact element={<SearchPage />} />
            <Route path="/search/office/:office/name/:name" exact element={<SearchPage />} />
            <Route path="/search/office/:office/name/:name/pageNumber/:pageNumber" exact element={<SearchPage />} />
          </Routes>
        </main>
        <footer></footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
