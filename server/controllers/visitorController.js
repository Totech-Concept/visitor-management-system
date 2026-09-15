const pool = require("../config/db");
// const visitors = require("../data/visitors");


const getVisitorCount = async (req, res) => {
  try {
    const [result] = await pool.query(
      'SELECT COUNT(*) AS count FROM visitors'
    );

    res.json({
      count: result[0].count
    });

  } catch (error) {
    console.error("Get visitor count error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get visitor count"
    });
  }

};

// Generate visitor reference
// function generateVisitorReference(id) {
//   return `VIS-${String(id).padStart(3, "0")}`;
// }

// GET ALL VISITORS
const getAllVisitors = async (req, res) => {
  try {
    const [visitors] = await pool.query(`
      SELECT
        id,
        visitor_reference,
        full_name,
        email,
        phone,
        company,
        purpose,
        host,
        appointment_id,
        status,
        check_in_time,
        check_out_time,
        notes,
        created_at,
        updated_at
      FROM visitors
      ORDER BY created_at DESC
    `);

    res.status(200).json({
      success: true,
      visitors
    });
  } catch (error) {
    console.error("Get visitors error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve visitors"
    });
  }
};

// Get SINGLE VISITOR
const getVisitorById = async (req, res) => {
  const { id } = req.params;

  try {
    const [visitors] = await pool.query(`
      SELECT id, visitor_reference, full_name, email, phone, company, purpose, host, appointment_id, status, check_in_time, check_out_time, notes, created_at, updated_at
      FROM visitors WHERE id = ?
      `, [id]);

      if (visitors.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Visitor not found"
        });
      }

      res.status(200).json({
        success: true,
        visitor: visitors[0]
      });
  } catch (error) {
    console.error("Get visitor error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve visitor"
    });
  }
};

// CREATE VISITOR
const createVisitor = async (req, res) => {
  const { full_name, email, phone, company, purpose, host, appointment_id, status, notes } = req.body;

  // Required fields
  const missingFields = [];

  if (!full_name) missingFields.push("full_name");
  if (!email) missingFields.push("email");
  if (!phone) missingFields.push("phone");
  if (!purpose) missingFields.push("purpose");
  if (!host) missingFields.push("host");

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
      fields: missingFields
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address"
    });
  }

  try {
    const visitorReference = `VIS-${Date.now().toString().slice(-8)}`;
    
    const visitorStatus = status || "Checked In";

    const checkInTime = visitorStatus === "Checked In" ? new Date() : null;

    const [result] = await pool.query(`
        INSERT INTO visitors (
          visitor_reference,
          full_name,
          email,
          phone,
          company,
          purpose,
          host,
          appointment_id,
          status,
          check_in_time,
          notes
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, 
      [
        visitorReference,
        full_name,
        email,
        phone,
        company || "Individual",
        purpose,
        host,
        appointment_id || null,
        visitorStatus,
        checkInTime,
        notes || null
      ]
    );

    const [visitors] = await pool.query(
      "SELECT * FROM visitors WHERE id = ?", [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: "Visitor created successfully",
      visitor: visitors[0]
    });
  } catch (error) {
    console.error("Create visitor error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create visitor"
    });
  }
};

// CHECK IN VISITOR
const checkInVisitor = async (req, res) => {
  const { id } = req.params;

  try {
    // Get current visitor status
    const [visitors] = await pool.query(
      "SELECT id, status FROM visitors WHERE id = ?",
      [id]
    );

    // Visitor does not exist
    if (visitors.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Visitor not found"
      });
    }

    const currentStatus = visitors[0].status;

    // Visitor must be scheduled before checking in
    if (currentStatus !== "Scheduled") {
      return res.status(400).json({
        success: false,
        message: `Visitor cannot be checked in because their current status is "${currentStatus}"`
      });
    }

    // Check in visitor
    await pool.query(`
        UPDATE visitors SET
          status = "Checked In",
          check_in_time = NOW(),
          check_out_time = NULL
        WHERE id = ?
      `, [id]);


    res.status(200).json({
      success: true,
      message: "Visitor checked in successfully"
    });

  } catch (error) {
    console.error("Check-in error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to check in visitor"
    });
  }
};

// CHECK OUT VISITOR
const checkOutVisitor = async (req, res) => {
  const { id } = req.params;

  try {
    // Get current visitor status
    const [visitors] = await pool.query(
      "SELECT id, status FROM visitors WHERE id = ?", [id]
    );

    // Visitor does not exist
    if (visitors.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Visitor not found"
      });
    }

    const currentStatus = visitors[0].status;

    // Visitor must be checked in before checking out
    if (currentStatus !== "Checked In") {
      return res.status(400).json({
        success: false,
        message: `Visitor cannot be checked out because their current status is "${currentStatus}"`      
      });
    }

    // Check out visitor
    await pool.query(`
      UPDATE visitors SET
        status = 'Checked Out',
        check_out_time = NOW()
      WHERE id = ?
      `, [id]);

    res.status(200).json({
      success: true,
      message: "Visitor checked out successfully"
    });
  } catch (error) {
    console.error("Check-out error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to check out visitor"
    });
  }
};

// UPDATE VISITOR STATUS
const updateVisitorsStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const allowedStatuses = [
    'Scheduled',
    "Checked In",
    "Checked Out",
    "Cancelled"
  ];

  // Validate requested status
  if (!status || !allowedStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid visitor status"
    });
  }

  try {
    // Get the visitor's current status
    const [visitors] = await pool.query(
      "SELECT id, status FROM visitors WHERE id = ?",
      [id]);

      // Visitor does not exist
      if (visitors.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Visitor not found"
        });
      }

      const currentStatus = visitors[0].status;

      // Define allowed status transitions
      const allowedTransitions = {
        "Scheduled": ["Checked In", "Cancelled"],
        "Checked In": ["Checked Out"],
        "Checked Out": [],
        "Cancelled": []
      };

      // Check whether the requested transition is allowed
      if (!allowedTransitions[currentStatus].includes(status)) {
        return res.status(400).json({
          success: false,
          message: `Cannot change visitor status from "${currentStatus}" to "${status}"`
        });
      }

      // Update status and related timestamps
      let query;
      let values;

      if (status === "Checked In") {
        query = `
          UPDATE visitors SET
            status = ?,
            check_in_time = NOW(),
            check_out_time = NULL
          WHERE id = ?
        `;
        values = [status, id];

      } else if (status === "Checked Out") {
        query = `
          UPDATE visitors SET 
            status = ?,
            check_out_time = NOW()
          WHERE id = ?
        `;
        values = [status, id];

      } else if (status === "Cancelled") {
        query = `
          UPDATE visitors SET 
            status = ?
          WHERE id = ?
        `;
        values = [status, id];

      } else {
        // Scheduled
        query = `
          UPDATE visitors SET
            status = ?
          WHERE id = ?
        `;
        values = [status, id];
      }

      await pool.query(query, values);

      res.status(200).json({
        success: true,
        message: "Visitor status updated successfully"
      });

  } catch (error) {
    console.error("Update status error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update visitor status"
    });
  }
};

// DELETE VISITOR
const deleteVisitor = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      "DELETE FROM visitors WHERE id = ?", [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Visitor not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Visitor deleted successfully"
    });
  } catch (error) {
    console.error("Delete visitor error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete visitor"
    });
  }
};


module.exports = {
  getVisitorCount,
  getAllVisitors,
  getVisitorById,
  createVisitor,
  checkInVisitor,
  checkOutVisitor,
  updateVisitorsStatus,
  deleteVisitor
};