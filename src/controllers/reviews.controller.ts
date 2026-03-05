import { Request, Response } from 'express';
import { ReviewService } from '../services/review.service';

const reviewService = new ReviewService();

export const getReviews = (req: Request, res: Response) => {
  const reviews = reviewService.getAllReviews();
  res.json(reviews);
};

export const getReviewsByService = (req: Request, res: Response) => {
  const reviews = reviewService.getReviewsByService(req.params.serviceId);
  res.json(reviews);
};

export const createReview = (req: Request, res: Response) => {
  const newReview = reviewService.addReview(req.body);
  res.status(201).json(newReview);
};

export const getAverageRating = (req: Request, res: Response) => {
  const average = reviewService.getAverageRating(req.params.serviceId);
  res.json({ serviceId: req.params.serviceId, average });
};