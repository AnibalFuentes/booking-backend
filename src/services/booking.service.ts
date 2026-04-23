import { Booking } from '../types';
import { invokeLambda } from './lambda.service';

export class BookingService {
  private bookings: Booking[] = [];

  getAllBookings(): Booking[] {
    return this.bookings;
  }

  getBookingById(id: string): Booking | undefined {
    return this.bookings.find(b => b.id === id);
  }

  async createBooking(booking: Omit<Booking, 'id' | 'status'>): Promise<Booking> {
    const newBooking: Booking = {
      ...booking,
      id: (this.bookings.length + 1).toString(),
      status: 'pending'
    };
    this.bookings.push(newBooking);

    // 👇 Invocar Lambda async
    await invokeLambda({
      bookingId: newBooking.id,
      clientName: newBooking.clientName,
      clientEmail: newBooking.clientEmail,
      serviceId: newBooking.serviceId,
      date: newBooking.date,
      time: newBooking.time,
    });

    return newBooking;
  }

  updateBookingStatus(id: string, status: Booking['status']): Booking | null {
    const booking = this.bookings.find(b => b.id === id);
    if (booking) {
      booking.status = status;
      return booking;
    }
    return null;
  }

  getBookingsByEmail(email: string): Booking[] {
    return this.bookings.filter(b => b.clientEmail === email);
  }
}