import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Image } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const Brands = () => {
  return (
    <div className='shoe-brands'>
        
        <Container>
      {/* Stack the columns on mobile by making one full-width and the other half-width */}
      <Row>
        <Col xs={12} md={6} lg={3} xl={3}>
            <Link to={'/addidas'}><img width='100px' height='100px' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0OvFIkUK-D3DWUnJWkBRIE0cSbb5zUvA0OprWVcLhJg&s"></img></Link>
        </Col>
        <Col xs={12} md={6} lg={3} xl={3}>
          <Link to={'/jordans'}><img width='100px' height='100px' src='https://logowik.com/content/uploads/images/685_jordanair.jpg'></img></Link>
        </Col>
        <Col xs={12} md={6} lg={3} xl={3}>
          <Link to={'/nike'}><img width='100px' height='100px' src='https://logowik.com/content/uploads/images/697_nike.jpg'></img></Link>
        </Col>
        <Col xs={12} md={6} lg={3} xl={3}>
            <Link to={'/puma'}><img width='100px' height='100px' src='https://logowik.com/content/uploads/images/puma5869.logowik.com.webp'></img></Link>
        </Col>
      </Row>
    </Container>

    </div>
  )
}

export default Brands