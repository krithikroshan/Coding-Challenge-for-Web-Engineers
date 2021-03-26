import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom' 
import Header from './components/Header'
import ProductScreen from './screens/ProductScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import ProductAddScreen from './screens/ProductAddScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import { Container } from 'react-bootstrap'

function App() {
  return (
    <Router>
      <Header />
      <main style={{margin: 20}}>
        <Container>
            <Route exact path='/' component={ProductScreen}></Route>
            <Route path='/login/' component={LoginScreen}></Route>
            <Route path='/register/' component={RegisterScreen}></Route>
            <Route exact path='/product/:id/' component={ProductEditScreen}></Route>
            <Route exact path='/products/new/' component={ProductAddScreen}></Route>
        </Container>
      </main>
    </Router>
  );
}

export default App;
