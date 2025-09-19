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
      },
      {
        _id: "2",
        title: "Luxury Apartment",
        description: "Stylish apartment with a great city view and top-notch amenities.",
        price: 180000,
        type: "Apartment",
        no_of_bathroom: 2,
        no_of_bedroom: 3,
      },
      {
        _id: "3",
        title: "Cozy Cottage",
        description: "A small, cozy cottage in a peaceful countryside location.",
        price: 120000,
        type: "Cottage",
        no_of_bathroom: 1,
        no_of_bedroom: 2,
      },
      {
        _id: "4",
        title: "Beachfront Villa",
        description: "Luxury villa located right on the beach with stunning ocean views.",
        price: 500000,
        type: "Villa",
        no_of_bathroom: 4,
        no_of_bedroom: 5,
      },{
        _id: "5",
        title: "Modern Family House",
        description: "A spacious family house located in the city center with modern design.",
        price: 250000,
        type: "House",
        no_of_bathroom: 3,
        no_of_bedroom: 4,
      },
      {
        _id: "6",
        title: "Luxury Apartment",
        description: "Stylish apartment with a great city view and top-notch amenities.",
        price: 180000,
        type: "Apartment",
        no_of_bathroom: 2,
        no_of_bedroom: 3,
      },
      {
        _id: "7",
        title: "Cozy Cottage",
        description: "A small, cozy cottage in a peaceful countryside location.",
        price: 120000,
        type: "Cottage",
        no_of_bathroom: 1,
        no_of_bedroom: 2,
      },
      {
        _id: "8",
        title: "Beachfront Villa",
        description: "Luxury villa located right on the beach with stunning ocean views.",
        price: 500000,
        type: "Villa",
        no_of_bathroom: 4,
        no_of_bedroom: 5,
      },
    ];
    return data;
  } catch (error) {
    return error;
  }
}
