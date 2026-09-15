const express = require("express");
const router = express.Router();

const visitorController = require("../controllers/visitorController");

router.get("/count", visitorController.getVisitorCount);
router.get("/", visitorController.getAllVisitors);
router.get("/:id", visitorController.getVisitorById);
router.post("/", visitorController.createVisitor);
router.patch("/:id/check-in", visitorController.checkInVisitor);
router.patch("/:id/check-out", visitorController.checkOutVisitor);
router.patch("/:id/status", visitorController.updateVisitorsStatus);
router.delete("/:id", visitorController.deleteVisitor);

module.exports = router;