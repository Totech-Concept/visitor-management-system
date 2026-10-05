import API_URL from "../../client/src/config/api";

export async function getCurrentStaff() {
    const token = localStorage.getItem("token");

    if (!token) {
        return null;
    }

    try {
        const response = await fetch(
            `${API_URL}/staff/profile`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
            localStorage.removeItem("token");
            localStorage.removeItem("staff");

            return null;
        }

        return result.data;

    } catch (error) {
        console.error("Authentication check failed:", error);
        return null;
    }
}