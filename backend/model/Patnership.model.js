import mongoose from "mongoose";

const partnershipSchema = new mongoose.Schema({
  name: String,
  webLink: String,
  imageUrl: String,
  imageId: String,
});

const PartnershipModel = mongoose.model("partnerships", partnershipSchema);

export default PartnershipModel;
