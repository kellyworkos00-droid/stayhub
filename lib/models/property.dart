class Property {
  final String id;
  final String title;
  final String location;
  final String hostName;
  final double pricePerNight;
  final double rating;
  final int reviewCount;
  final List<String> images;
  final String propertyType;
  final int guests;
  final int bedrooms;
  final int beds;
  final int bathrooms;
  final List<String> amenities;
  final String description;
  final bool isSuperhost;
  final bool isFavorite;
  final DateTime? availableFrom;
  final DateTime? availableTo;

  Property({
    required this.id,
    required this.title,
    required this.location,
    required this.hostName,
    required this.pricePerNight,
    required this.rating,
    required this.reviewCount,
    required this.images,
    required this.propertyType,
    required this.guests,
    required this.bedrooms,
    required this.beds,
    required this.bathrooms,
    required this.amenities,
    required this.description,
    this.isSuperhost = false,
    this.isFavorite = false,
    this.availableFrom,
    this.availableTo,
  });

  Property copyWith({
    bool? isFavorite,
  }) {
    return Property(
      id: id,
      title: title,
      location: location,
      hostName: hostName,
      pricePerNight: pricePerNight,
      rating: rating,
      reviewCount: reviewCount,
      images: images,
      propertyType: propertyType,
      guests: guests,
      bedrooms: bedrooms,
      beds: beds,
      bathrooms: bathrooms,
      amenities: amenities,
      description: description,
      isSuperhost: isSuperhost,
      isFavorite: isFavorite ?? this.isFavorite,
      availableFrom: availableFrom,
      availableTo: availableTo,
    );
  }
}
