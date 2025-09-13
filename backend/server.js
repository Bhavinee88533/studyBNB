const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Listing = require("./models/listing");
const User = require("./models/user");
const Host = require("./models/host");

const app = express();
const MONGO_URL = "mongodb+srv://bhavineesingh88533_db_user:mzlVp2jRqavgzeda@cluster0.kkrlg50.mongodb.net/studybnbInfo?retryWrites=true&w=majority";
const port = 8080;

let currentUser = "";

function format(name) {
  if (!name) return "";
  const firstName = name.split(" ")[0];
  return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
}

app.use(express.json({ limit: "10mb" }));

// Connect to Mongo
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

/* -------------------- API ROUTES -------------------- */
app.get("/api/home", (req, res) => {
  res.json({ user: currentUser });
});

app.get("/api/host/:id", async (req, res) => {
  try {
    const host = await Host.findById(req.params.id);
    if (!host) return res.status(404).json({ message: "Host not found" });
    res.json(host);
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/api/host-listings/:id", async (req, res) => {
  try {
    const hostId = req.params.id;
    const listings = await Listing.find({ hostId });
    console.log(listings);

    if (!listings.length) {
      return res.status(404).json({ message: "No listings found" });
    }

    res.json(listings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/api/search", async (req, res) => {
  const { city, address, type } = req.body;
  try {
    const query = {
      city: { $regex: city, $options: "i" },
      address: { $regex: address, $options: "i" }
    };
    if (type?.trim()) query.type = { $regex: type, $options: "i" };
    const listings = await Listing.find(query, { name: 1, type: 1, images: 1 });
    res.json({ results: listings });
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/api/host", async (req, res) => {
  try {
    const { hostId, name, email, contactNo, type, address, city, description, images } = req.body;
    if (!mongoose.Types.ObjectId.isValid(hostId)) {
      return res.status(400).json({ message: "Invalid hostId" });
    }
    const hostExists = await Host.findById(hostId);
    if (!hostExists) {
      return res.status(404).json({ message: "Host not found" });
    }
    const listing = new Listing({
      hostId: new mongoose.Types.ObjectId(hostId),
      name,
      email,
      contactNo,
      type,
      address,
      city,
      description,
      images
    });
    await listing.save();
    res.status(201).json({ message: "Listing created successfully", listing });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password, latitude, longitude, userType } = req.body;
    if (!name || !email || !password || !userType)
      return res.status(400).json({ message: "Missing required fields" });
    const Model = userType === "Visitor" ? User : userType === "Host" ? Host : null;
    if (!Model) return res.status(400).json({ message: "Select a valid user type" });
    const existingUser = await Model.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already registered" });
    const newUser = await Model.create({ name, email, password, latitude, longitude, userType });
    currentUser = format(newUser.name);
    res.json({ message: "User created successfully", id: newUser._id, userType: newUser.userType });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password, userType } = req.body;
  try {
    const Model = userType === "Visitor" ? User : userType === "Host" ? Host : null;
    if (!Model) return res.status(400).json({ message: "Invalid user type" });
    const existingUser = await Model.findOne({ email, password });
    if (!existingUser) return res.status(400).json({ message: "User does not exist" });
    currentUser = format(existingUser.name);
    res.status(200).json({ message: "Logged in successfully", id: existingUser._id, userType: existingUser.userType });
  } catch {
    res.status(500).json({ message: "Error logging in" });
  }
});

app.get("/api/listing/:id", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    res.json(listing);
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/* -------------------- SERVE FRONTEND -------------------- */
const frontendPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

/* -------------------- START SERVER -------------------- */
app.listen(port, () => console.log(`Server listening on port ${port}`));
