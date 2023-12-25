const router = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../models/User");
const jwt = require("jsonwebtoken");

router.post("/login");
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  //Checking if all the fields are entered
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Enter all the required fields" });
  }

  //Validating names
  if (name.length > 15) {
    return res
      .status(400)
      .json({ error: "Name cannot be more than 15 characters" });
  }

  //Checking if the email is valid
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Enter a valid email" });
  }

  //Validating password
  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password should be at least 6 characters long" });
  }

  //Checking and saving the user in DB
  try {
    const doesUserExist = await User.findOne({ email });
    if (doesUserExist) {
      return res.status(400).json({ error: "Email already exists" });
    }

    //Encrypting password before saving
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ name, email, password: hashedPassword });

    const result = await newUser.save();
    result._doc.password = undefined;
    return res.status(201).json({ ...result._doc });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  //Checking if all the values are entered
  if (!email || !password) {
    return res.status(400).json({ error: "Enter values in all fields" });
  }

  //Checking if the email is valid
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Enter a valid email" });
  }

  //Checking and logging in
  try {
    const doesUserExist = await User.findOne({ email });
    if (!doesUserExist) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    //Checking if encryoted password matches
    const doesPasswordMatch = await bcrypt.compare(
      password,
      doesUserExist.password
    );
    if (!doesPasswordMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const payload = { _id: doesUserExist._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
