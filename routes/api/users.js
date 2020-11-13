const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { body, validationResult } = require("express-validator");

const User = require("../../models/User");

// @route POST api/users
// @desc Register user
// @access Public
router.post(
  "/",
  [
    body("name", "Namn är obligatoriskt").not().isEmpty(),
    body("email", "Vänligen fyll i en giltig epost").isEmail(),
    body("password", "Lösenordet måste innehålla minst 6 tecken").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // If user exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Användaren finns redan registrerad" }] });
      }

      user = new User({
        name,
        email,
        password,
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Return jsonwebtoken

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Serverfel");
    }
  }
);

module.exports = router;
