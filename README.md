# StayHub 🏠

A modern property rental application built with Flutter, inspired by Airbnb. Discover and book unique stays worldwide with an intuitive and beautiful user interface.

## Features ✨

### Core Functionality
- **Browse Properties**: Explore a curated selection of properties with stunning images
- **Search & Filter**: Advanced search with location, dates, guests, price range, and amenities
- **Property Details**: View comprehensive property information including:
  - High-quality image carousels
  - Host information with Superhost badges
  - Detailed amenities list
  - Guest reviews and ratings
  - Pricing breakdown
- **Booking System**: Seamless booking flow with date selection and guest management
- **Favorites**: Save your favorite properties for quick access
- **Bookings Management**: Track upcoming and past bookings
- **User Profile**: Manage your account and preferences

### UI/UX Highlights
- **Modern Design**: Clean, intuitive interface with Material Design 3
- **Smooth Animations**: Engaging transitions and interactions
- **Category Navigation**: Filter properties by Beach, Mountain, City, Luxury, and more
- **Bottom Navigation**: Easy access to Explore, Favorites, Bookings, and Profile
- **Responsive Layout**: Optimized for various screen sizes
- **Custom Theme**: Airbnb-inspired color scheme with pink accent (#FF385C)

## Tech Stack 🛠️

- **Framework**: Flutter 3.0+
- **Language**: Dart
- **UI Components**: Material Design 3
- **Typography**: Google Fonts (Poppins)
- **State Management**: StatefulWidget
- **Date Handling**: intl package
- **Image Loading**: cached_network_image
- **Carousels**: smooth_page_indicator
- **Ratings**: flutter_rating_bar

## Project Structure 📁

```
lib/
├── main.dart                          # App entry point
├── models/
│   ├── property.dart                  # Property data model
│   ├── booking.dart                   # Booking data model
│   └── review.dart                    # Review data model
├── screens/
│   ├── main_screen.dart               # Bottom navigation container
│   ├── explore_screen.dart            # Home screen with property listings
│   ├── property_detail_screen.dart    # Detailed property view
│   ├── booking_confirmation_screen.dart # Booking confirmation
│   ├── bookings_screen.dart           # User's bookings list
│   ├── favorites_screen.dart          # Saved properties
│   └── profile_screen.dart            # User profile
├── widgets/
│   ├── property_card.dart             # Property listing card
│   ├── search_bar_widget.dart         # Search interface
│   ├── category_chips.dart            # Category filter chips
│   └── image_carousel.dart            # Image slideshow
└── services/
    └── data_service.dart              # Sample data provider
```

## Getting Started 🚀

### Prerequisites
- Flutter SDK (3.0 or higher)
- Dart SDK
- An IDE (VS Code, Android Studio, or IntelliJ)
- Android/iOS emulator or physical device

### Installation

1. **Clone or navigate to the project directory**:
   ```bash
   cd c:\Users\zachn\OneDrive\Desktop\bnb
   ```

2. **Install dependencies**:
   ```bash
   flutter pub get
   ```

3. **Run the app**:
   ```bash
   flutter run
   ```

   Or press `F5` in VS Code to launch with debugging.

### Build for Production

**Android**:
```bash
flutter build apk --release
```

**iOS**:
```bash
flutter build ios --release
```

**Web**:
```bash
flutter build web
```

## Key Features Implementation 🎯

### Property Browsing
- Grid layout with property cards showing images, ratings, and pricing
- Real-time favorite toggling
- Smooth navigation to property details

### Advanced Search
- Location search with autocomplete (ready for integration)
- Date range picker for check-in/check-out
- Guest counter with increment/decrement controls
- Filter modal with price range slider, property types, and amenities

### Booking Flow
1. Select dates and guests from property detail screen
2. Review booking summary with price breakdown
3. Confirm booking with payment (ready for payment gateway integration)
4. Track booking in "My Bookings" section

### Reviews & Ratings
- Star ratings with visual indicators
- User reviews with avatars and timestamps
- Average rating display across the app

## Customization 🎨

### Theme Colors
Edit the theme in `lib/main.dart`:
```dart
colorScheme: ColorScheme.fromSeed(
  seedColor: const Color(0xFFFF385C), // Change primary color here
  primary: const Color(0xFFFF385C),
),
```

### Sample Data
Modify property listings in `lib/services/data_service.dart` to add/edit properties.

## Future Enhancements 🔮

- [ ] Backend integration with REST API
- [ ] User authentication (Firebase, OAuth)
- [ ] Real payment processing (Stripe, PayPal)
- [ ] Google Maps integration for property locations
- [ ] Push notifications for booking updates
- [ ] Chat system between guests and hosts
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Property owner dashboard
- [ ] Advanced analytics and insights

## Dependencies 📦

```yaml
dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^1.0.6
  google_fonts: ^6.1.0
  flutter_rating_bar: ^4.0.1
  intl: ^0.19.0
  cached_network_image: ^3.3.1
  smooth_page_indicator: ^1.1.0
  flutter_staggered_grid_view: ^0.7.0
```

## Screenshots 📱

The app includes:
- **Explore Screen**: Browse properties with categories and search
- **Property Details**: Full property information with image carousel
- **Booking Confirmation**: Review and confirm reservations
- **My Bookings**: Manage upcoming and past trips
- **Favorites**: Quick access to saved properties
- **Profile**: User account management

## Contributing 🤝

This is a demonstration project. Feel free to fork and customize for your needs!

## License 📄

This project is created for educational and demonstration purposes.

## Contact 📧

For questions or feedback about StayHub, feel free to reach out!

---

**Built with ❤️ using Flutter**
