// server.js
const express = require("express");

const Pusher = require("pusher");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 3001;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialize Pusher

const pusher = new Pusher({
  appId: "1639972",
  key: "ee79995ac9f5f6c88f53",
  secret: "8efc933ed3d6cdf28356",
  cluster: "mt1",
  useTLS: true,
});

// Route to receive and broadcast rider location updates
app.post("/update-location", (req, res) => {
  const { riderId, location } = req.body;

  // Broadcast location update to operator channel
  pusher.trigger("operator-channel", "location-update", { riderId, location });

  res.status(200).json({ message: "Location update sent successfully" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
