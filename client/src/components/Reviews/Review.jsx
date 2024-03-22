import React, { useState } from 'react';
import './Review.css';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { toast } from 'react-toastify';

const Review = ({ userID, productID,handleCloseReviewModal}) => {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0); // Assuming initial rating is 2.5

    const handleRatingChange = (event, newValue) => {
        setRating(newValue);
    };
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (parseFloat(rating) === 0) {
            // alert("Please give a rating before submitting.");
            toast.warn("Please give a rating before submitting.", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
                });
            return;
        }
        try {
            const response = await axios.post(`http://localhost:3001/review/${userID}/${productID}`, {
                comment,
                rating
            });
            console.log(response.data); // Log response for debugging
            // alert(response.data.message);
            toast.success(response.data.message, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
                });
            handleCloseReviewModal();
        } catch (err) {
            alert(err.message); // Log error for debugging
            // alert('An error occurred while posting the review.');
        }
    }

    return (
        <div className="review-container">
            <div className="review-card">
                <div className="review-input">
                    <h3>Write a Review</h3>
                    <form className='review-form' onSubmit={handleSubmit}>
                        <textarea
                            type="text"
                            placeholder="Write a review..."
                            className='my-4'
                            onChange={(e) => { setComment(e.target.value) }}
                        />
                        <Stack spacing={1}>
                            <Rating name="half-rating" value={parseFloat(rating)} onChange={handleRatingChange} precision={0.5} />
                        </Stack>
                        <button type="submit">Post</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Review;
