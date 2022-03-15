const express = require("express");
const { body, validationResult } = require("express-validator");

const User = require("../models/user.models");

const router = express.Router();

router.post(
  "/",
  body("firstName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("First Name cannot be empty"),

  body("email")
    .isEmail()
    .custom(async (value) => {
      const user = await User.findOne({ email: value });

      if (user) {
        throw new Error("Email is already exist");
      }
      return true;
    }),
  body("pincode")
    .not()
    .isEmpty()
    .withMessage("Pincode cannot be empty")
    .custom((pincode_val) => {
      if (pincode_val.length < 6) {
        throw new Error("Invalid Pincode Provided");
      }
      return true;
    }),
  body("age")
    .not()
    .isEmpty()
    .withMessage("Age cannot be empty")
    .isNumeric()
    .withMessage("Age must be a number between 1 and 100")
    .custom((age_val) => {
      if (age_val < 1 || age_val > 120) {
        throw new Error("Incorrect age provided");
      }
      return true;
    }),
  body("gender").trim().not().isEmpty().withMessage("Gender cannot be empty"),
  async (req, res) => {
    try {
      console.log(body("pincode"));
      const errors = validationResult(req);
      console.log({ errors });
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }

      const user = await User.create(req.body);

      return res.status(201).send(user);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  }
);

module.exports = router;

// ./
// ../models/
// ../../friendsBuilding/friendhouse
