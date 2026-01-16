export default function getFilter() {
  try {
    const data = {
      locations: [
        "Karachi",
        "Lahore",
        "Islamabad",
        "Rawalpindi",
        "Faisalabad",
        "Multan",
        "Peshawar",
        "Quetta",
        "Hyderabad",
        "Sialkot",
        "Gujranwala",
      ],
      types: ["Apartment", "House", "Condo", "Villa", "Townhouse"],
      prices: [
        "500,000",
        "600,000",
        "650,000",
        "700,000",
        "750,000",
        "800,000",
        "1,200,000",
        "1,500,000",
        "1,800,000",
        "2,000,000",
      ],
      sizes: [
        "950",
        "1100",
        "1200",
        "1300",
        "1350",
        "1400",
        "2200",
        "2500",
        "3200",
        "3500",
      ],
      purposes: ["Buy", "Rent 3 Months", "Rent 6 Months", "Rent Annual"],
    };
    return data;
  } catch (error) {
    return error;
  }
}
