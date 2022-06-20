import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, ToastContainer } from 'react-bootstrap';
import Home from './pages/Home';
import CreateTranslations from './pages/CreateTranslations';
import TranslationsList from './pages/TranslationsList';
import EditTranslation from './pages/EditTranslation';
import TranslationPage from './pages/TranslationPage';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>Translation App</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto  w-100  justify-content-end">
                  <Nav.Link href="/create">Create Translation</Nav.Link>
                  <Nav.Link href="/viewList">View Translations</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateTranslations />} />
            <Route path="/viewList" element={<TranslationsList />} />
            <Route path="/:id/edit" element={<EditTranslation />} />
            <Route path="/:id" element={<TranslationPage />} />
          </Routes>
        </main>
        <footer></footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
