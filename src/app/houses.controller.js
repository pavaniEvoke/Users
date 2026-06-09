var houseModal = require('./houses.modal');
var mongoose = require('mongoose');

exports.addHouse = async function (req, res) {
  var newHouse = new houseModal(req.body)
  await newHouse.save()
    .then(function (data) {
      res.status(200).send("success")
    })
    .catch(function (err) {
      return res.status(500).send(err);
    });
}

exports.getHouses = async function (req, res) {
  await houseModal.find()
    .then(function (houses) {
      return res.status(200).send(houses)
    })
    .catch(function (err) {
      return res.status(500).send(err);
    });
}

exports.getHouseDetails = function (req, res) {
  let id = req.params.houseID
  console.log(id)
  houseModal.find({ _id: new mongoose.Types.ObjectId(id) })
    .then(function (house) {
      return res.status(200).send(house)
    })
    .catch(function (err) {
      return res.status(500).send(err);
    });
}

exports.updateHouse = function (req, res) {
  var query = { '_id': req.body.houseID };
  houseModal.findOneAndUpdate(query, req.body, { upsert: true })
    .then(function (data) {
      res.status(200).send("success")
    })
    .catch(function (err) {
      return res.status(500).send(err);
    });
};

exports.getHousesList = function (req, res) {
  houseModal.aggregate([
    { $match: { active: true } },
    { $project: { _id: false } }
  ])
    .then(function (data) {
      res.status(200).send(data)
    })
    .catch(function (err) {
      res.status(500).send(err)
    })
}
