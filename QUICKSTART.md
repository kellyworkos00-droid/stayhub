# StayHub - Quick Start Guide

## ✅ Your App is Ready!

Your Flutter Airbnb-inspired app "StayHub" is successfully created and running!

## 🎉 What You Have

### Complete Features:
1. **Home/Explore Screen**
   - Browse 6 sample properties
   - Category filters (All, Beach, Mountain, City, Luxury, Cabin)
   - Search functionality with modal
   - Filter by price, property type, and amenities
   - Favorite properties

2. **Property Details Screen**
   - Image carousel with indicators
   - Host information with Superhost badges
   - Property specs (guests, bedrooms, bathrooms)
   - Full amenities list
   - Reviews with ratings
   - Book Now functionality

3. **Booking System**
   - Date range picker
   - Guest counter
   - Price breakdown (subtotal + service fee)
   - Booking confirmation

4. **My Bookings Screen**
   - Upcoming bookings tab
   - Past bookings tab
   - Booking details with actions

5. **Favorites Screen**
   - Saved properties list
   - Quick access to liked properties

6. **Profile Screen**
   - User information
   - Settings and preferences
   - Help and support links

## 🚀 How to Run

### Currently Running:
The app is already running in Chrome! Check your browser.

### To Run Again:
```bash
# In terminal:
cd "c:\Users\zachn\OneDrive\Desktop\bnb"
flutter run -d chrome
```

### Or use VS Code:
1. Press `F5` or click "Run and Debug"
2. Select "StayHub (Chrome)" or "StayHub (Edge)"

## 📱 Testing the App

### Navigation:
- **Bottom Nav Bar**: Switch between Explore, Favorites, Bookings, and Profile

### Try These Actions:
1. **Browse Properties**: Scroll through the property grid
2. **Filter by Category**: Tap category chips (Beach, Mountain, etc.)
3. **View Details**: Tap any property card
4. **View Images**: Swipe through property photos
5. **Add to Favorites**: Tap the heart icon
6. **Book Property**: 
   - Tap "Reserve" button
   - Select check-in/out dates
   - Choose number of guests
   - View booking summary
   - Confirm booking
7. **View Bookings**: Check "Bookings" tab for your reservations
8. **Filter Properties**: Tap filter icon to set price, type, amenities

## 🎨 Customization

### Change App Name:
Edit `pubspec.yaml`:
```yaml
name: your_app_name
```

### Change Primary Color:
Edit `lib/main.dart` line 17-20:
```dart
colorScheme: ColorScheme.fromSeed(
  seedColor: const Color(0xFFFF385C), // Your color here
  primary: const Color(0xFFFF385C),
),
```

### Add More Properties:
Edit `lib/services/data_service.dart` and add to `getSampleProperties()` method

### Change Fonts:
Edit `lib/main.dart` line 28:
```dart
textTheme: GoogleFonts.poppinsTextTheme(), // Change font here
```

## 🔧 Common Commands

```bash
# Install dependencies
flutter pub get

# Run on Chrome
flutter run -d chrome

# Run on Edge
flutter run -d edge

# Hot reload (while app is running)
Press 'r' in terminal

# Hot restart
Press 'R' in terminal

# Check for issues
flutter doctor

# Build for web
flutter build web

# Clean build
flutter clean
```

## 📂 Project Structure

```
lib/
├── main.dart                    # App entry point
├── models/                      # Data models
│   ├── property.dart
│   ├── booking.dart
│   └── review.dart
├── screens/                     # App screens
│   ├── main_screen.dart         # Navigation container
│   ├── explore_screen.dart      # Home with properties
│   ├── property_detail_screen.dart
│   ├── booking_confirmation_screen.dart
│   ├── bookings_screen.dart
│   ├── favorites_screen.dart
│   └── profile_screen.dart
├── widgets/                     # Reusable widgets
│   ├── property_card.dart
│   ├── search_bar_widget.dart
│   ├── category_chips.dart
│   └── image_carousel.dart
└── services/
    └── data_service.dart        # Sample data
```

## 🐛 Troubleshooting

### App not loading?
```bash
flutter clean
flutter pub get
flutter run -d chrome
```

### Images not showing?
The app uses online images from Unsplash. Check your internet connection.

### Hot reload not working?
- Press 'R' for full hot restart
- Or stop and restart the app

### Port already in use?
```bash
# Kill any running Flutter processes
taskkill /F /IM dart.exe
```

## 🎯 Next Steps

### Add More Features:
1. User authentication (Firebase)
2. Real backend API integration
3. Google Maps for locations
4. Payment processing (Stripe)
5. Push notifications
6. Host dashboard
7. Messaging system
8. Multi-language support

### Backend Integration:
Replace `data_service.dart` with API calls:
```dart
// Example:
Future<List<Property>> fetchProperties() async {
  final response = await http.get('your-api.com/properties');
  // Parse and return properties
}
```

### Deploy to Web:
```bash
flutter build web
# Upload the 'build/web' folder to your hosting
```

## 📦 Installed Packages

- `google_fonts` - Beautiful typography
- `flutter_rating_bar` - Star ratings
- `intl` - Date formatting
- `cached_network_image` - Optimized images
- `smooth_page_indicator` - Carousel dots
- `flutter_staggered_grid_view` - Grid layouts

## 💡 Tips

- **Hot Reload**: Save files to instantly see changes
- **DevTools**: Press 'p' in terminal to open Flutter DevTools
- **Widgets**: All screens use MaterialApp widgets
- **State**: Currently using StatefulWidget (can upgrade to Provider/Bloc)
- **Responsive**: Works on mobile, tablet, and desktop web

## 🎨 Design Highlights

- **Color Scheme**: Airbnb-inspired pink (#FF385C)
- **Font**: Google Fonts Poppins
- **Layout**: Material Design 3
- **Icons**: Material Icons
- **Spacing**: Consistent 8px grid system

## 📞 Support

If you need help:
1. Check Flutter docs: https://docs.flutter.dev
2. Run: `flutter doctor` to diagnose issues
3. Check README.md for detailed documentation

---

**Enjoy building with StayHub! 🏠✨**
