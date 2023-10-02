import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Table, // Import the Table component
  Button,
  InputGroup,
  FormControl,
  Image,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../slices/cartSlice";

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Your Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty<Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <Table striped bordered responsive>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id}>
                  <td>
                    <Image src={item.image} alt={item.name} fluid rounded style={{ width: "50px", height: "50px" }}/>
                  </td>
                  <td>
                    <Link
                      to={`/product/${item._id}`}
                      className='text-decoration-none'
                    >
                      {item.name}
                    </Link>
                  </td>
                  <td>${item.price}</td>
                  <td>
                    <InputGroup>
                      <Button
                        variant='outline-secondary'
                        onClick={() => addToCartHandler(item, item.qty - 1)}
                        disabled={item.qty <= 1}
                      >
                        -
                      </Button>
                      <FormControl
                        type='number'
                        min='1'
                        value={item.qty}
                        onChange={(e) =>
                          addToCartHandler(item, Number(e.target.value))
                        }
                      />
                      <Button
                        variant='outline-secondary'
                        onClick={() => addToCartHandler(item, item.qty + 1)}
                        disabled={item.qty >= item.countInStock}
                      >
                        +
                      </Button>
                    </InputGroup>
                  </td>
                  <td>
                    <Button
                      type='button'
                      variant='danger'
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
      <Col md={4}>
        <div className='cart-summary'>
          <h2>Cart Summary</h2>
          <p>
            Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}{" "}
            items)
          </p>
          <p>
            $
            {cartItems
              .reduce((acc, item) => acc + item.qty * item.price, 0)
              .toFixed(2)}
          </p>
          <Button
            type='button'
            className='btn-block'
            disabled={cartItems.length === 0}
            onClick={() => checkoutHandler()}
          >
            Proceed to Checkout
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default CartPage;
