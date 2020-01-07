const express = require('express');
const moment = require('moment');
const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');

const router = express.Router();

router.post('/signup', async (req, res) => {
  let {username, password, fullname, email, phone} = req.body;
  const checkExist = await userModel.singleByUsernameOrUsername(
    username,
    email,
  );
  if (checkExist !== null) {
    return res.status(404).send('Account already exists');
  } else {
    try {
      const N = 10;
      const hash = bcrypt.hashSync(password, N);
      password = hash;
      await userModel.add({
        username,
        password,
        fullname,
        email,
        phone,
      });
      return res.send('Register success');
    } catch (error) {
      return res.status(403).send(error);
    }
  }
});

module.exports = router;
