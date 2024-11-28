const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  map_url: { type: String, required: true },
  image_url: { type: String, required: true },
  ratings: { type: Number, required: true }
});

const TouristSpotSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  map_url: { type: String, required: true },
  image_url: { type: String, required: true },
  ratings: { type: Number, required: true }
});

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  map_url: { type: String, required: true },
  image_url: { type: String, required: true },
  ratings: { type: Number, required: true }
});

const MarketplaceSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  map_url: { type: String, required: true },
  image_url: { type: String, required: true },
  ratings: { type: Number, required: true }
});

const ItinerarySchema = new mongoose.Schema({
  location: { type: String, required: true, trim: true },
  hotels: [HotelSchema],
  tourist_spots: [TouristSpotSchema],
  restaurants: [RestaurantSchema],
  market_places: [MarketplaceSchema],
  createdAt: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now }
});

// Create text index for location to enable efficient search
ItinerarySchema.index({ location: 'text' });

module.exports = mongoose.model('Itinerary', ItinerarySchema); 