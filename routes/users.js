var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

let fcm = require('firebase-admin');

let serviceAccount = require('path to your accout config jsn file');

fcm.initializeApp({
  credential: fcm.credential.cert(serviceAccount),
  databaseURL: "add your databse url from firebase",
  authDomain: "add auth domain from firebase",
});



let ref = fcm.database().ref('/user');

//get data from firebase
router.get('/firebase', async (req, res) => {

  ref.once("value", function (data) {
    // console.log(typeof data.val())
    let obj = data.val().users;
    let newArr = [];
    newArr.push(obj)
    return res.json({ data: newArr })
  })

});

//add data to firebase
router.post('/firebase', async (req, res) => {
  let bodyData = req.body;
  let data = ref.push(bodyData)
  if (data !== null) {
    return res.json({ data: data });
  }
});

module.exports = router;
