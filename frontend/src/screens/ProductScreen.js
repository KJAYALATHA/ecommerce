import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import { Row,Col,Image,ListGroup,Button,Card,Form } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails} from "../actions/productAction";
import Loader from "../components/loader";
import Message from "../components/message";

import Rating from '../components/Rating'


function ProductScreen({match,history}) {

const [qty,setQty] = useState(0)

  const dispatch = useDispatch();
  const producDetail = useSelector((state) => state.producDetail);
  const { error, loading, product } = producDetail;
   

    useEffect(()=>{
        dispatch(listProductDetails(match.params.id))
        },[dispatch,match]
    )

    const addToCartHandler =()=>{
        console.log('add to cart',match.params.id)
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }


    return (
        <div>
             <Link to ='/' className="btn btn-light my-3">Go Back</Link>

{loading ? (
        <Loader/>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
                <Col md={6}>
                <Image src={product.image} alt={product.name} fluid/></Col>
                <Col md={3} >
                    <ListGroup >
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                           <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Price : ${product.price}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Description : {product.description}
                        </ListGroup.Item>
                        </ListGroup></Col>
                <Col md={3} >
                    <Card>
                        <ListGroup>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col><strong>${product.price}</strong></Col>
                                </Row>
                                
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>{product.countInStock>0 ? 'In Stock' :'Out Stock'}</Col>
                                </Row>
                                </ListGroup.Item>
                                {/* doubt */}

                                {product.countInStock>0 &&(
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                            Quantity
                                            </Col>
                                            <Col xs='auto' className = 'my-1'>
                                                <Form.Control as='select'
                                                value = {qty}
                                                onChange = {(e) => setQty(e.target.value)}>
                                                    {
                                                        [...Array(product.countInStock).keys()].map((x)=>(
                                                            <option key ={x+1} value={x+1}>
                                                                {x+1}
                                                            </option>
                                                        ))

                                                    }

                                                </Form.Control>
                                                     {/* doubt */}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}

                                <ListGroup.Item>
                                <Row>
                                    <Button className = 'btn btn-block' type='button' disabled={product.countInStock == 0} onClick={addToCartHandler}>Add To Cart</Button>
                                </Row>
                                
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
      )}    
          </div>
    )
}

export default ProductScreen
