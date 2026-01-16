import axios from "axios";

export default async function getPropertys() {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/property/detail`);

    // Axios throws an error for non-2xx status codes, so no need for res.ok check here.
    // If an error occurs, it will be caught by the catch block.

    const data = res.data;

    // Map backend fields to frontend expectations
    const mappedData = data.map((item) => ({
      _id: item._id,
      title: item.Name,
      description: item.Desc,
      buy_price: item.buy_price,
      rent_price_3_months: item.rent_price_3_months,
      rent_price_6_months: item.rent_price_6_months,
      rent_price_annual: item.rent_price_annual,
      type: item.type,
      no_of_bathroom: item.Bathroom,
      no_of_bedroom: item.Rooms,
      location: item.Location,
      size: item.Area,
      images: item.images, // Array of { name, data }
      availabilityStatus: item.availabilityStatus || "Available",
      availableDate: item.availableDate,
      rentDuration: item.rentDuration,
      // Default or missing fields
      buildYear: 2024, // Backend doesn't have this yet, placeholder
    }));

    return mappedData;
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
}
