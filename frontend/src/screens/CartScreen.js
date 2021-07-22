// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../actions/cartAction";
// import {
//   Row,
//   Col,
//   ListGroup,
//   Image,
//   Form,
//   Button,
//   Card,
// } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import Message from "../components/message";

// function CartScreen({ match, location, history }) {
//   const dispatch = useDispatch();
//   const cart = useSelector((state) => state.cart);
//   const { cartItems } = cart;
//   console.log('cartitems',cartItems.length);

//   const qty = location.search ? Number(location.search.split("=")[1]) : 1;
//   console.log("qty", qty);

//   useEffect(() => {
//     if (match.params.id) {
//       dispatch(addToCart(match.params.id, qty));
//     }
//   }, [dispatch, match.params.id, qty]);
//   return (
      
//     <Row>
//       <Col md={8}>
//         <h1>Shopping Cart</h1>
//         <h1>{cartItems.length}</h1>
//         {cartItems.length === 0 ? (
//           <Message variant="info">
//             Your Cart is empty <Link to="/"> Go Back </Link>
//           </Message>
//         ) : (
//           <ListGroup variant="flush">
//               {cartItems.map(item =>(
//                   <ListGroup.item key ={item.product}>
//                       <Row>
//                           <Col md={2}>
//                               <Image src = {item.image} alt = {item.name} fluid rounder></Image>
//                           </Col>
//                           <Col md={3}>
//                               <Link to={`/product/${item.product}`}>{item.name}</Link>
//                           </Col>
//                           <Col md ={2}>${item.price}</Col>
//                       </Row>
//                   </ListGroup.item>
//               ))}
//           </ListGroup>
//         )}
//       </Col>
//       <Col md={4}></Col>
//     </Row>
//   );
// }

// export default CartScreen;

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/message";
import { addToCart ,removeFromcart    } from '../actions/cartAction'

function CartScreen({ match, location, history }) {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log("cartItems: ", cartItems);

  console.log("qty:", qty);
  console.log(productId);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    console.log("removeId:", id);
    dispatch(removeFromcart(id))
  };

  const checkoutHandler = () =>{
      history.push('/login?redirect=shipping')
      console.log('shipping in cartScreen');
  }

  return (
    <Row>
    <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant="info">
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product} style={{ margin: "10px" }}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>

                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>

                  <Col md={2}>${item.price}</Col>

                  <Col md={3}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item.product, Number(e.target.value)))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control> 
                  </Col>
                  <Col md={1}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
     <Col md={4}>
         <Card>
             <ListGroup variant = 'flush'>
                 <ListGroup.Item>                                                                                                                                                                                            
                     <h2>SubTotal({cartItems.reduce((acc,item)=>acc+item.qty,0)})</h2>
                     ${cartItems.reduce((acc,item)=>acc+item.qty * item.price,0).toFixed(2)}
                 </ListGroup.Item>

             </ListGroup>
             <ListGroup.Item>
                 <Button  type = 'button' className= 'btn-block' disabled = {cartItems.length === 0} onClick={checkoutHandler}>
                    Procced To Pay
                 </Button>
             </ListGroup.Item>
         </Card>
     </Col>
   
   
   
    </Row>
  );
}

export default CartScreen;
