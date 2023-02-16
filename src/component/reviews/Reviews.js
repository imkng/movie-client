import {useEffect,useState, useRef} from 'react';
import api from '../../api/apiConfig';
import {useParams} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';

import React from 'react'

const Reviews = ({getMovieData,movie,reviews,setReviews}) => {

    const revText = useRef();
    const revRating = useRef();

    let params = useParams();
    const movieId = params.movieId;
    const [reviewCount, setReviewCount] = useState(reviews.length);

    useEffect(()=>{
        getMovieData(movieId);
    },[])

    const addReview = async (e) =>{
        e.preventDefault();

        const rev = revText.current;
        const revR = revRating.current;

        try
        {
            const response = await api.post("/api/v1/reviews",{
                reviewBody:rev.value,
                rating:revR.value,
                imdbId:movieId
            });

            const updatedReviews = [...reviews, {body:rev.value, rating: revR.value}];
            rev.value = "";
            revR.value="";
            setReviews(updatedReviews);
            console.log(updatedReviews);
            console.log(reviewCount);
            setReviewCount(updatedReviews.length);
            console.log(reviewCount);
        }
        catch(err)
        {
            console.error(err);
        }
        



    }

  return (
    <Container>
        <Row>
            <Col><h3>Reviews</h3></Col>
        </Row>
        <Row className="mt-2">
            <Col>
                <img src={movie?.poster} alt="" />
            </Col>
            <Col>
                {
                    <>
                        <Row>
                            <Col>
                                <ReviewForm handleSubmit={addReview} revRating={revRating} revText={revText} labelText = "Write a Review?" />  
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                    </>
                }
                {
                    reviews?.map((r) => {
                        return(
                            <>
                                <Row>
                                    <Col>{r.body}</Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr />
                                    </Col>
                                </Row>                                
                            </>
                        )
                    })
                }
            </Col>
        </Row>
        <Row>
            <Col>
                <hr />
            </Col>
        </Row>        
    </Container>
  )
}

export default Reviews