import 'package:flutter/material.dart';
import '../models/property.dart';
import '../services/data_service.dart';
import '../widgets/property_card.dart';

class FavoritesScreen extends StatefulWidget {
  const FavoritesScreen({super.key});

  @override
  State<FavoritesScreen> createState() => _FavoritesScreenState();
}

class _FavoritesScreenState extends State<FavoritesScreen> {
  List<Property> favoriteProperties = [];

  @override
  void initState() {
    super.initState();
    _loadFavorites();
  }

  void _loadFavorites() {
    final allProperties = DataService.getSampleProperties();
    favoriteProperties = allProperties.take(2).map((p) => p.copyWith(isFavorite: true)).toList();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Favorites'),
      ),
      body: favoriteProperties.isEmpty
          ? Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.favorite_border,
                    size: 64,
                    color: Colors.grey[400],
                  ),
                  const SizedBox(height: 16),
                  Text(
                    'No favorites yet',
                    style: TextStyle(
                      fontSize: 18,
                      color: Colors.grey[600],
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Start exploring and save your favorite stays!',
                    style: TextStyle(
                      fontSize: 14,
                      color: Colors.grey[500],
                    ),
                  ),
                ],
              ),
            )
          : GridView.builder(
              padding: const EdgeInsets.all(16),
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 1,
                childAspectRatio: 0.75,
                mainAxisSpacing: 24,
              ),
              itemCount: favoriteProperties.length,
              itemBuilder: (context, index) {
                return PropertyCard(
                  property: favoriteProperties[index],
                  onFavoriteToggle: () {
                    setState(() {
                      favoriteProperties.removeAt(index);
                    });
                  },
                );
              },
            ),
    );
  }
}
