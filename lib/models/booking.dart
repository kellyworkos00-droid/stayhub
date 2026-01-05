import 'property.dart';

enum BookingStatus {
  upcoming,
  completed,
  cancelled,
}

class Booking {
  final String id;
  final Property property;
  final DateTime checkIn;
  final DateTime checkOut;
  final int guests;
  final double totalPrice;
  final BookingStatus status;
  final DateTime bookingDate;

  Booking({
    required this.id,
    required this.property,
    required this.checkIn,
    required this.checkOut,
    required this.guests,
    required this.totalPrice,
    required this.status,
    required this.bookingDate,
  });

  int get numberOfNights => checkOut.difference(checkIn).inDays;
}
