import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useCart } from 'react-use-cart';
import { BsCartPlus } from 'react-icons/bs';
import { useThemeHook } from '../GlobalComponents/ThemeProvider';

const BestSellers = () => {
  const [jewelries, setJewelries] = useState([]);
  const { addItem } = useCart();
  const [theme] = useThemeHook();

  useEffect(() => {
    const fetchJewelries = async () => {
      const res = await fetch('https://fakestoreapi.com/products/category/jewelery');
      const data = await res.json();

      const shuffledJewelries = data.sort(() => 0.5 - Math.random());
      const selectedJewelries = shuffledJewelries.slice(0, 8);

      setJewelries(selectedJewelries);
    };

    fetchJewelries();
  }, []);

  return (
    <Container className="py-5 ">
      <h2 className={`${theme? 'text-light': 'text-light-primary'} my-5 text-center`}>
        Best Sellers - Jewelries
      </h2>

      <Row className="justify-content-center mt-5">
        {jewelries.map((jewelry) => (
          <Col key={jewelry.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ overflow: 'hidden', height: '200px' }}>
                <Card.Img
                  variant="top"
                  src={jewelry.image}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <Card.Body 
                style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                <Card.Title style={{ height: '20px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                  {jewelry.title}
                </Card.Title>
                <b className="text-light-primary h4 mt-3 d-block" style={{alignSelf: 'center'}}>$ {jewelry.price}</b>
                <Button
                  onClick={() => addItem(jewelry)}
                  style={{ borderRadius: '0', border: 0, alignSelf: 'center' }}
                >
                  <BsCartPlus size="1.8rem" />
                  Add to cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BestSellers;
