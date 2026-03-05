import { Router } from 'express';
import { 
  getReviews, 
  getReviewsByService, 
  createReview,
  getAverageRating 
} from '../controllers/reviews.controller';

const router = Router();

router.get('/', getReviews);
router.get('/service/:serviceId', getReviewsByService);
router.get('/service/:serviceId/average', getAverageRating);
router.post('/', createReview);

export { router as reviewsRouter };