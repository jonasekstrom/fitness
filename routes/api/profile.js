const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { body, validationResult } = require("express-validator");

const Profile = require("../../models/Profile");
const User = require("../../models/User");
const { json } = require("express");

// @route GET api/profile/me
// @desc Get current users profile
// @access Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name"]);

    if (!profile) {
      return res
        .status(400)
        .json({ msg: "Finns ingen profil för denna användare" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Serverfel");
  }
});

// @route POST api/profile
// @desc Create or update users profile
// @access Private
router.post(
  "/",
  [
    auth,
    [
      body("age", "Vänligen fyll i ålder").not().isEmpty(),
      body("height", "Vänligen fyll i din längd").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { age, height } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (age) profileFields.age = age;
    if (height) profileFields.height = height;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // update profile
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }

      // Create profile
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Serverfel");
    }
  }
);

// @route GET api/profile
// @desc Get all profile
// @access Private

router.get("/", auth, async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name"]);
    console.log(profiles);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send / "Serverfel";
  }
});

// @route PUT api/profile/weightin
// @desc Add profile weightin
// @access Private

router.put(
  "/weightin",
  [
    auth,
    [
      body("icv", "Vänligen fyll i detta fält").not().isEmpty(),
      body("ecv", "Vänligen fyll i detta fält").not().isEmpty(),
      body("proteins", "Vänligen fyll i detta fält").not().isEmpty(),
      body("minerals", "Vänligen fyll i detta fält").not().isEmpty(),
      body("fatmass", "Vänligen fyll i detta fält").not().isEmpty(),
      body("weight", "Vänligen fyll i detta fält").not().isEmpty(),
      body("smm", "Vänligen fyll i detta fält").not().isEmpty(),
      body("bmi", "Vänligen fyll i detta fält").not().isEmpty(),
      body("fatprocent", "Vänligen fyll i detta fält").not().isEmpty(),
      body("whr", "Vänligen fyll i detta fält").not().isEmpty(),
      body("rightarm", "Vänligen fyll i detta fält").not().isEmpty(),
      body("leftarm", "Vänligen fyll i detta fält").not().isEmpty(),
      body("torso", "Vänligen fyll i detta fält").not().isEmpty(),
      body("rightleg", "Vänligen fyll i detta fält").not().isEmpty(),
      body("leftleg", "Vänligen fyll i detta fält").not().isEmpty(),
      body("vfa", "Vänligen fyll i detta fält").not().isEmpty(),
      body("targetweight", "Vänligen fyll i detta fält").not().isEmpty(),
      body("inbodypoints", "Vänligen fyll i detta fält").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(req.body)
    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()})
    }
    
    const {
      stage,
      icv, 
      ecv, 
      proteins, 
      minerals, 
      fatmass, 
      weight, 
      smm, 
      bmi, 
      fatprocent, 
      whr, 
      rightarm, 
      leftarm, 
      torso, 
      rightleg, 
      leftleg, 
      vfa, 
      targetweight, 
      inbodypoints 
    } = req.body;

    const newWeightin = {
      stage,
      icv, 
      ecv, 
      proteins, 
      minerals, 
      fatmass, 
      weight, 
      smm, 
      bmi, 
      fatprocent, 
      whr, 
      rightarm, 
      leftarm, 
      torso, 
      rightleg, 
      leftleg, 
      vfa, 
      targetweight, 
      inbodypoints 
    }

    try {
      const profile = await Profile.findOne({user: req.user.id});
      profile.weightin.push(newWeightin);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Serverfel')
    }
  }
);

// @route DELETE api/profile/weightin/:wi_id
// @desc Delete a profile weightin
// @access Private

router.delete('/weightin/:wi_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({user: req.user.id});

    // Get removal index

    const removeIndex = profile.weightin.map(item => item.id).indexOf(req.params.wi_id);

    profile.weightin.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(error.message);
    res.status(500).send('Serverfel')
  }
})
module.exports = router;
