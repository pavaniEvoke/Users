var userModal = require('./users.modal');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var mongoose = require('mongoose');

exports.addUser = async function (req, res) {
  var newUser = new userModal(req.body)
  newUser.password = await generateHash(req.body.password)
  console.log(newUser.password)
  await newUser.save()
    .then(function (data) {
      res.status(200).send("success")
    })
    .catch(function (err) {
      return res.status(500).send(err);
    });
}

exports.getUsers = async function (req, res) {
  await userModal.find()
    .then(function (users) {
      return res.status(200).send(users)
    })
    .catch(function (err) {
      return res.status(500).send(err);
    });
}

exports.getUserDetails = function (req, res) {
  let id = req.params.userID
  console.log(id)
  userModal.find({ _id: new mongoose.Types.ObjectId("660178cf3f747e97f8c2e141") })
    .then(function (user) {
      return res.status(200).send(user)
    })
    .catch(function (err) {
      return res.status(500).send(err);
    });
}

exports.updateUser = function (req, res) {
  var query = { '_id': req.body.userID };
  MyModel.findOneAndUpdate(query, req.body, { upsert: true })
    .then(function (data) {
      res.status(200).send("success")
    })
    .catch(function (err) {
      return res.status(500).send(err);
    });
};

exports.getUsersList = function (req, res) {
  userModal.aggregate([
    { $match: { active: true } },
    { $project: { _id: false } },
    { $addFields: { userType: "user"}}
  ])
    .then(function (data) {
      res.status(200).send(data)
    })
    .catch(function (err) {
      res.status(500).send(err)
    })
}
function generateHash(password) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        console.log(hash, err)
        // Store hash in your password DB.
        if (hash) resolve(hash);
      });
    });
  })

}



