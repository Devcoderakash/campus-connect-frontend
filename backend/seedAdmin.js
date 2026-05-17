require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const email = "akashlodhi2310@gmail.com";
    const password = "akash@1122";

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let user = await User.findOne({ email });
    if (user) {
      user.password = hashedPassword;
      user.role = "Admin";
      await user.save();
      console.log("Existing user updated to Admin with new password.");
    } else {
      await User.create({
        name: "Akash Admin",
        email: email,
        password: hashedPassword,
        role: "Admin",
        branch: "Admin",
        year: 4,
      });
      console.log("Admin user created.");
    }

    mongoose.disconnect();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();
