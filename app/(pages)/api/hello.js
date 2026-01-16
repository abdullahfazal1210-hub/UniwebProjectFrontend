import axios from "axios";

// Simple test API
export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
}

// Form submission
export const userForm = async (obj) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/message`, obj, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("Error sending form:", error);
    throw error;
  }
};

// Property upload
export const uploadProperty = async (formData) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addProperty`, formData, {
      withCredentials: true,
      headers: {
        // "Content-Type": "multipart/form-data" // Don't set this manually with axios + FormData
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error uploading property:", error);
    throw error;
  }
};

// Fetch properties
export const getProperty = async () => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/property/detail`);
    return res.data; // sirf data return
  } catch (error) {
    console.error("Error fetching properties:", error);
    return []; // fallback empty array
  }
};

// Delete Property
export const deleteProperty = async (id) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/property/delete`, { id }, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("Error deleting property:", error);
    throw error;
  }
};

// Update Property
export const updateProperty = async (id, formData) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/property/update`, formData, {
      withCredentials: true,
      headers: {
        // "Content-Type": "multipart/form-data" 
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error updating property:", error);
    throw error;
  }
};

// Submit Client Need
export const submitClientNeed = async (data) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/client-need`, data, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("Error submitting Client Need:", error);
    throw error;
  }
};
