const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6, select: false },
    phone: { type: String, required: true, trim: true },
    role: { type: String, enum: ["CUSTOMER", "ADMIN"], default: "CUSTOMER" },
    storeId: { type: mongoose.Schema.Types.ObjectId, ref: "Store", index: true }
  },
  { timestamps: true }
);

userSchema.pre("save", async function hashPassword() {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = function comparePassword(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
