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

router.post('/login', async (req, res) => {
  let {username, password} = req.body;
  try {
    const user = await userModel.singleByUsername(username);
    if (user === null) return res.status(404).send('Not found');
    const rs = bcrypt.compareSync(password, user.password);
    if (!rs) return res.status(403).send('Wrong password');
    return res.send({message: 'Login success', user});
  } catch (error) {
    return res.status(403).send(error);
  }
});

module.exports = router;
