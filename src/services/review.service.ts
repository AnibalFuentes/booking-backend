import { Review } from '../types';

export class ReviewService {
  private reviews: Review[] = [];

  getAllReviews(): Review[] {
    return this.reviews;
  }

  getReviewsByService(serviceId: string): Review[] {
    return this.reviews.filter(r => r.serviceId === serviceId);
  }

  addReview(review: Omit<Review, 'id' | 'date'>): Review {
    const newReview: Review = {
      ...review,
      id: (this.reviews.length + 1).toString(),
      date: new Date().toISOString()
    };
    this.reviews.push(newReview);
    return newReview;
  }

  getAverageRating(serviceId: string): number {
    const serviceReviews = this.getReviewsByService(serviceId);
    if (serviceReviews.length === 0) return 0;
    
    const sum = serviceReviews.reduce((acc, review) => acc + review.rating, 0);
    return Number((sum / serviceReviews.length).toFixed(1));
  }
}