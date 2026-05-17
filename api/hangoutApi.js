
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
    throw error;
  }
};

export const fetchDashboardData = async (userId) => {
  try {
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
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create hangout");
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating hangout:", error);
    throw error;
  }
};

export const deleteHangout = async (id) => {
  const response = await fetch(`${BASE_URL}/hangouts/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to delete hangout');
  }

  return await response.json();
};

