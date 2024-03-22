import React from 'react'
import Carousel from 'react-bootstrap/Carousel';

const Caroussel = () => {
    return (
        <Carousel>
          <Carousel.Item interval={1000}>
            <img className='cr-img' src='https://9to5toys.com/wp-content/uploads/sites/5/2020/01/Nike-Renew-Running-Shoes.jpg?quality=82&strip=all' text="First slide" />
          </Carousel.Item>
          <Carousel.Item interval={500}>
            <img className='cr-img' src='https://png.pngtree.com/template/20211025/ourmid/pngtree-summer-e-commerce-promotion-shoes-banner-image_663586.jpg' text="Second slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className='cr-img' src="https://png.pngtree.com/background/20210709/original/pngtree-mens-shoes-ingenuity-hand-made-tool-picture-image_910851.jpg" />
          </Carousel.Item>
        </Carousel>
      );
    }

export default Caroussel