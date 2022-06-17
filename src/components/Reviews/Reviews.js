import { useState, useEffect } from 'react';
import { requestReviews } from 'services/API';
import { TailSpin } from 'react-loader-spinner';

const Reviews = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState({});
  const [status, setStatus] = useState('');

  useEffect(() => {
    async function MovieReviews() {
      setStatus('pending');
      try {
        const reviews = await requestReviews(movieId);
        console.log(reviews);
        setReviews(reviews);
      } catch (error) {
        setError(error);
        setStatus('rejected');
      }
      setStatus('resolved');
    }
    MovieReviews();
  }, [movieId]);

  if (status === 'pending') {
    return <TailSpin />;
  }

  if (status === 'rejected') {
    return <p>{error.message}</p>;
  }

  return (
    <ul>
      {status === 'resolved' &&
        reviews.map(review => {
          return (
            <li key={review.id}>
              <h3>Author:{review.author}</h3>
              <p>{review.content}</p>
            </li>
          );
        })}
      {reviews.length === 0 && (
        <div>We don't have any reviews for this film</div>
      )}
    </ul>
  );
};

export default Reviews;
