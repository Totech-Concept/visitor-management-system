const pool = require("../config/db");

const getReportAnalytics = async (req, res) => {
    try {
        // 1. Total visitors this month
        const [totalRows] = await pool.query (`
            SELECT COUNT(*) AS total FROM visitors
            WHERE YEAR(created_at) = YEAR(CURDATE())
            AND MONTH(created_at) = MONTH(CURDATE())
        `);

        // 2. Average daily visitors this month
        const [averageRows] = await pool.query(`
            SELECT ROUND(
                COUNT(*) / DAY(CURDATE()), 1
                ) AS average FROM visitors WHERE YEAR(created_at) = YEAR(CURDATE())
                 AND MONTH(created_at) = MONTH(CURDATE())
        `);

        // 3. Peak hour
        const [peakHourRows] = await pool.query(`
            SELECT HOUR(check_in_time) AS hour, COUNT(*) AS count
            FROM visitors WHERE check_in_time IS NOT NULL
            GROUP BY HOUR(check_in_time) ORDER BY count DESC LIMIT 1
        `);

        // 4. Cancelled appointments
        const [cancellationRows] = await pool.query(`
            SELECT COUNT(*) AS count FROM appointments WHERE status = 'cancelled'
        `);

        // 5. Monthly visitor trend
        const [monthlyRows] = await pool.query(`
            SELECT MONTH(created_at) AS month_number, COUNT(*) AS visits
            FROM visitors WHERE YEAR(created_at) = YEAR(CURDATE())
            GROUP BY MONTH(created_at) ORDER BY MONTH(created_at)
        `);

        // 6. Visit purpose distribution
        const [purposeRows] = await pool.query(`
            SELECT purpose AS name, COUNT(*) AS value
            FROM visitors GROUP BY purpose ORDER BY value DESC
        `);

        // 7. Daily visitor trend
        const [dailyRows] = await pool.query(`
            SELECT DATE(check_in_time) AS visit_date, COUNT(*) AS visitors
            FROM visitors WHERE check_in_time IS NOT NULL
            AND check_in_time >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
            GROUP BY DATE(check_in_time) ORDER BY visit_date
        `);

        // 8. Top visit purposes
        const [topPurposeRows] = await pool.query(`
            SELECT purpose, COUNT(*) AS count
            FROM visitors GROUP BY purpose ORDER BY count DESC LIMIT 5
        `);

        const totalVisitors = Number(totalRows[0].total) || 0;
        const purposeTotal = purposeRows.reduce(
            (sum, item) => sum + Number(item.value), 0
        );

        const visitPurposeDistribution = purposeRows.map((item, index) => ({
            name: item.name,
            value: purposeTotal
                ? Math.round((Number(item.value) / purposeTotal) * 100)
                : 0,
            color: [
                "#2563eb",
                "#9333ea",
                "#059669",
                "#f59e0b",
                "#ef4444",
                "#0891b2",
                "#7c3aed",
            ][index % 7]
        }));

        const monthNames = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        const monthlyVisits = monthNames.map((month, index) => {
            const found = monthlyRows.find(
                row => Number(row.month_number) === index + 1
            );
            return {
                month,
                visits: found ? Number(found.visits) : 0
            };
        });

        const dailyVisitorTrend = dailyRows.map(row => ({
            day: new Date(row.visit_date).toLocaleDateString("en-US", {
                weekday: "short"
            }),
            visitors: Number(row.visitors)
        }));

        const peakHour = peakHourRows.length
            ? Number(peakHourRows[0].hour)
            : null;

        let peakHourLabel = "N/A";

        if (peakHour !== null) {
            const startHour = peakHour;
            const endHour = peakHour + 1;

            const formatHour = (hour) => {
                const suffix = hour >= 12 ? "PM" : "AM";
                const formatted = hour % 12 || 12;
                return `${formatted} ${suffix}`;
            };
            peakHourLabel = `${formatHour(startHour)}-${formatHour(endHour)}`;
        }

        const topVisitPurposes = topPurposeRows.map(item => ({
            purpose: item.purpose,
            count: Number(item.count),
            share: purposeTotal
                ? Math.round((Number(item.count) / purposeTotal) * 100)
                : 0,
            avgDuration: "N/A",
            trend: "flat"
        }));

        res.status(200).json({
            stats: {
                totalThisMonth: totalVisitors,
                avgDailyVisitors: Number(averageRows[0]?.average) || 0,
                peakHour: peakHourLabel,
                cancellation: Number(cancellationRows[0]?.count) || 0
            },
            monthlyVisits,
            visitPurposeDistribution,
            dailyVisitorTrend,
            topVisitPurposes
        });
    } catch (error) {
        console.error("Report analytics error:", error);

        res.status(500).json({
            message: "Failed to fetch report analytics"
        });
    }
};

module.exports = {getReportAnalytics};