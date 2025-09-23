export default function getPropertys() {
  try {
    const data = [
      {
        _id: "1",
        title: "Modern Family House",
        description: "A spacious family house located in the city center with modern design.",
        price: 250000,
        type: "House",
        no_of_bathroom: 3,
        no_of_bedroom: 4,
        location: "New York",
        size: 2200, // in sq ft
        buildYear: 2018,
      },
      {
        _id: "2",
        title: "Luxury Apartment",
        description: "Stylish apartment with a great city view and top-notch amenities.",
        price: 180000,
        type: "Apartment",
        no_of_bathroom: 2,
        no_of_bedroom: 3,
        location: "Los Angeles",
        size: 1200,
        buildYear: 2020,
      },
      {
        _id: "3",
        title: "Cozy Cottage",
        description: "A small, cozy cottage in a peaceful countryside location.",
        price: 120000,
        type: "Cottage",
        no_of_bathroom: 1,
        no_of_bedroom: 2,
        location: "Texas",
        size: 900,
        buildYear: 2015,
      },
      {
        _id: "4",
        title: "Beachfront Villa",
        description: "Luxury villa located right on the beach with stunning ocean views.",
        price: 500000,
        type: "Villa",
        no_of_bathroom: 4,
        no_of_bedroom: 5,
        location: "Miami",
        size: 3500,
        buildYear: 2022,
      },
      {
        _id: "5",
        title: "Downtown Loft",
        description: "Trendy loft in the heart of the city with open-plan living.",
        price: 300000,
        type: "Loft",
        no_of_bathroom: 2,
        no_of_bedroom: 2,
        location: "Chicago",
        size: 1500,
        buildYear: 2017,
      },
    ];
    return data;
  } catch (error) {
    return error;
  }
}
