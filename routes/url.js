const express = require("express");

const router = express.Router();

const {
  handleGenerateNewShortUrl,
  handleGetAnalytics,
  handleRedirectAndTimestamp,
} = require("../controllers/url");

router.post("/", handleGenerateNewShortUrl);
router.get("/:shortId", handleRedirectAndTimestamp);
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
