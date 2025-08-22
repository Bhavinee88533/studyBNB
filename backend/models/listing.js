const mongoose = require("mongoose");
const schema = mongoose.Schema;

const listingSchema = new schema({
  hostId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    trim: true
  },
  contactNo: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ["Hostel", "PG"]
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  images: {
    type: [String],
    validate: [arrayLimit, "{PATH} exceeds the limit of 2"],
    default: ["./views/image.png"]
  }
});

function arrayLimit(val) {
  return val.length <= 2;
}

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
