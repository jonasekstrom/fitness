const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { body, validationResult } = require("express-validator");

const User = require('../../models/User');
// @route GET api/auth
// @desc Get authenticated user
// @access Public
router.get('/', auth , async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)
    } catch(err){
        console.error(err.message);
        res.status(500).send('Serverfel');
    }
});

// @route POST api/auth
// @desc Authenticate user and get token
// @access Public
router.post(
    "/",
    [
      body("email", "Vänligen fyll i en giltig epost").isEmail(),
      body("password", "Lösenord krävs").exists(),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { email, password } = req.body;
  
      try {
        // If user exists
        let user = await User.findOne({ email });
        if (!user) {
          return res
            .status(400)
            .json({ errors: [{ msg: "Epost/lösenord är felaktigt" }] });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res
            .status(400)
            .json({ errors: [{ msg: "Epost/lösenord är felaktigt" }] });
        }

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