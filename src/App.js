import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ProductsListPage from './pages/ProductsListPage/ProductsListPage';
import ProductEditPage from './pages/ProductEditPage/ProductEditPage';
import ProductAddPage from './pages/ProductAddPage/ProductAdd';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/product/:id/edit' component={ProductEditPage} />
          <Route path='/product/:id/add' component={ProductAddPage} />
          <Route exact path='/' component={ProductsListPage} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
