import { Container } from "react-bootstrap";

import Header from "./components/header.js";
import Footer from "./components/footer";
import HomeScreen from "./screens/HomeScreen";
import  ProductScreen  from "./screens/ProductScreen";
import  ProfileScreen  from "./screens/ProfileScreen";
import  CartScreen  from "./screens/CartScreen";
import  LoginScreen  from "./screens/LoginScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";
import RegisterScreen from "./screens/RegisterScreen.js";

function App() { 
  return (
  
    <Router>
      <Header />
      <main className="py-3">
        <Container>
         <Route path='/' component={HomeScreen} exact/>
         <Route path='/login' component={LoginScreen} exact/>
         <Route path='/register' component={RegisterScreen} exact/>
         <Route path='/profile' component={ProfileScreen} exact/>
         <Route path='/products/:id' component={ProductScreen} exact/>
         <Route path='/cart/:id?' component={CartScreen} exact/>
        </Container>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
