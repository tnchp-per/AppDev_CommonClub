const BASE_URL = "http://localhost:5001/api";

export const fetchAllHangouts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/hangouts`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching hangouts:", error);
    throw error; // Let the screen handle the error
  }
};

export const fetchDashboardData = async (userId) => {
  try {
    // We send the userId so the backend knows WHO is asking
    const response = await fetch(`${BASE_URL}/hangouts/dashboard/${userId}`);
    return await response.json(); 
  } catch (error) {
    console.error("Dashboard fetch error:", error);
    throw error;
  }
};

export const createHangout = async (hangoutData) => {
  try {
    const response = await fetch(`${BASE_URL}/hangouts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hangoutData),
    });
    if (!response.ok) throw new Error("Failed to create hangout");
    return await response.json();
  } catch (error) {
    console.error("Create Hangout Error:", error);
    throw error;
  }
};