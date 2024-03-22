import React from 'react'
import Rating from '@mui/material/Rating';

const CommentBox = (review) => {
  return (
    <div>
        {review.map((review)=>(
            <div className='review'>
                <p>{review.user}</p>
                <Rating name="read-only" value={review.rating} readOnly />
                <p>{review.comment}</p>
            </div>
        ))}
        
    </div>
  )
}

export default CommentBox