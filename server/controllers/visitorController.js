const visitors = require("../data/visitors");

const getVisitorCount = (req, res) => {
  res.json({ count: visitors.length });
}



module.exports = getVisitorCount;