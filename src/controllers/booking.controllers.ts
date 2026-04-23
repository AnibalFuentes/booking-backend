import { Request, Response } from "express";
import { BookingService } from "../services/booking.service";

const bookingService = new BookingService();

export const getBookings = (req: Request, res: Response) => {
  const bookings = bookingService.getAllBookings();
  res.json(bookings);
};

export const getBooking = (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const booking = bookingService.getBookingById(id);
  if (booking) {
    res.json(booking);
  } else {
    res.status(404).json({ message: "Booking not found" });
  }
};

export const createBooking = async (req: Request, res: Response) => {
  const newBooking = await bookingService.createBooking(req.body);
  res.status(201).json(newBooking);
};

export const updateBookingStatus = (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const { status } = req.body;
  const updatedBooking = bookingService.updateBookingStatus(id, status);

  if (updatedBooking) {
    res.json(updatedBooking);
  } else {
    res.status(404).json({ message: "Booking not found" });
  }
};

export const getBookingsByEmail = (req: Request, res: Response) => {
  const email = Array.isArray(req.params.email)
    ? req.params.email[0]
    : req.params.email;
  const bookings = bookingService.getBookingsByEmail(email);
  res.json(bookings);
};
