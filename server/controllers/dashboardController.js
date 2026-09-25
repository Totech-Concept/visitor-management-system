const pool = require("../config/db");

const getDashboardStats = async (req, res) => {
    try {
        // 1. Visitor status statistics
        const [statusRows] = await pool.query(`
            SELECT
                COUNT(*) AS totalVisitors,
                SUM(status = 'Scheduled') AS scheduled,
                SUM(status = 'Checked In') AS checkedIn,
                SUM(status = 'Checked Out') AS checkedOut,
                SUM(status = 'Cancelled') AS cancelled
            FROM visitors
        `);

        // 2. Appointments scheduled for today
        const [todayRows] = await pool.query(`
            SELECT COUNT(*) AS count FROM appointments WHERE appointment_date = CURDATE()
            AND status = 'confirmed'
        `);

        // 3. Monthly visitor trend for current year
        const [monthlyRows] = await pool.query(`
            SELECT MONTH(created_at) AS month_number,
                COUNT(*) AS visitors
            FROM visitors WHERE YEAR(created_at) = YEAR(CURDATE())
            GROUP BY MONTH(created_at) ORDER BY month_number
        `);

        // 4. Visitor purposes
        const [purposeRows] = await pool.query(`
            SELECT purpose AS name, COUNT(*) AS value
            FROM visitors GROUP BY purpose
            ORDER BY value DESC
        `);

        // 5. Recent visitors
        const [recentRows] = await pool.query(`
            SELECT id, visitor_reference, full_name, company, purpose, status, created_at
            FROM visitors ORDER BY created_at DESC LIMIT 8
        `);

        // Convert monthly database result into Jan-Dec
        const monthNames = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        const purposeColors = [
            "#2563eb",
            "#9333ea",
            "#059669",
            "#f59e0b",
            "#ef4444",
            "#0891b2",
            "#db2777",
        ];

        const monthlyTrend = monthNames.map((month, index) => {
            const found = monthlyRows.find(
                (row) => Number(row.month_number) === index + 1
            );
            return {
                month,
                visitors: found ? Number(found.visitors) : 0 
            };
        });

        // Convert purpose counts into percentages
        const totalPurposeCount = purposeRows.reduce(
            (total, item) => total + Number(item.value), 0
        );

        const visitPurposes = purposeRows.map((item, index) => ({
            name: item.name,
            value: totalPurposeCount
                ? Math.round((Number(item.value) / totalPurposeCount) * 100)
                : 0,
            color: purposeColors[index % purposeColors.length]
        }));

        const stats = statusRows[0];

        res.status(200).json({
            totalVisitors: Number(stats.totalVisitors || 0),
            scheduled: Number(stats.scheduled || 0),
            checkedIn: Number(stats.checkedIn || 0),
            checkedOut: Number(stats.checkedOut || 0),
            cancelled: Number(stats.cancelled || 0),
            todayScheduled: Number(todayRows[0].count || 0),
            monthlyTrend,
            visitPurposes,
            recentVisitors: recentRows
        });

    } catch (error) {
        console.error("Error fetching dashboard statistics:", error);

        res.status(500).json({
            message: "Failed to fetch dashboard statistics"
        });
    }
};

module.exports = {getDashboardStats};