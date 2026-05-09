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
// Later, you can easily add more functions here!
// export const createHangout = async (hangoutData) => { ... }
// export const joinHangout = async (hangoutId, userId) => { ... }