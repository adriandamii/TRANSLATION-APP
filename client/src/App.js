import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Nav } from 'react-bootstrap';
import CreateTranslations from './pages/CreateTranslations';
import EditTranslation from './pages/EditTranslation';
import SearchBox from './components/SearchBox';
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast';

const App = () => {  
  return (
    <BrowserRouter>
      <Toaster />
      <div>
        <header>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand className="title">Translation App</Navbar.Brand>
              </LinkContainer>
              <SearchBox />
              <Nav className="justify-content-end">
                <Nav.Link href="/create">
                  <Button>
                    <i className="fas fa-plus"></i>
                  </Button>
                </Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/create" element={<CreateTranslations />} />
            <Route path="/:id/edit" element={<EditTranslation />} />
            <Route path="/search/name/:name" exact element={<Home />} />
            <Route 
              path="/search/office/:office/name/:name/translated/:translated/month/:month" 
              exact 
              element={<Home />} 
             />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
