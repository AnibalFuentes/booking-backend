import express from "express";
import cors from "cors";
import { bookingRouter } from './routes/booking.routes';
import { servicesRouter } from './routes/services.routes';
import { reviewsRouter } from './routes/reviews.routes';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Booking API is running" });
});

app.use('/api/bookings', bookingRouter);
app.use('/api/services', servicesRouter);
app.use('/api/reviews', reviewsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
