export default function getReviews() {
  try {
    const data = [
      {
        id: 1,
        title: "Amazing Service!",
        desc: "The team was very professional and helped me find my dream home quickly.",
        name: "John Doe",
        city: "New York",
        country: "USA",
        rating: 5,
      },
      {
        id: 2,
        title: "Great Experience",
        desc: "Smooth process from start to finish. Highly recommend them!",
        name: "Maria Gonzales",
        city: "Madrid",
        country: "Spain",
        rating: 4,
      },
      {
        id: 3,
        title: "Could Be Better",
        desc: "The property was nice but the communication was a bit slow.",
        name: "Akira Tanaka",
        city: "Tokyo",
        country: "Japan",
        rating: 3,
      },
      {
        id: 4,
        title: "Excellent Support",
        desc: "They understood my needs and found exactly what I was looking for.",
        name: "Sophia Müller",
        city: "Berlin",
        country: "Germany",
        rating: 5,
      },
      {
        id: 5,
        title: "Not Satisfied",
        desc: "Had some issues with paperwork delays. Could improve.",
        name: "Liam Smith",
        city: "London",
        country: "UK",
        rating: 2,
      },
    ];
    return data;
  } catch (error) {
    return error;
  }
}
