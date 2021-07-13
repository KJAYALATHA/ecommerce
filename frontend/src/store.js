import { createStore,combineReducers,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer,productDetailsReducer } from './reducers/productReducer'
import { cartReducer } from './reducers/cartReducers'
import { userLoginReducer,userRegisterReducer,userDetailReducer,userUpdateProfileReducer } from './reducers/userReducer'

const reducer = combineReducers({
    productList : productListReducer,
    producDetail : productDetailsReducer,
    cart:cartReducer,
    userLogin:userLoginReducer ,//userLogin is the name given to the initial state
    userRegister :userRegisterReducer,
    userDetail : userDetailReducer,
    userUpdateProfile:userUpdateProfileReducer,


})

const cartItemsFromStorage = localStorage.getItem('cartItem')? JSON.parse(localStorage.getItem('cartItem')):[]

const userInfoFromStorage = localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')):null

const initialState = {
    cart:{cartItems:cartItemsFromStorage},
    userLogin:{userInfo:userInfoFromStorage} //userInfo is a name given in reducer
}

const middleware = [thunk]

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default  store