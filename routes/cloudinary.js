const express = require('express');
const router = express.Router();

const cloudinary = require('cloudinary');
cloudinary.config({
  'api_key': process.env.CLOUDINARY_API_KEY,
  'api_secret': process.env.CLOUDINARY_API_SECRET
});

// the sign route will be called by the Cloudinary upload widget
router.get('/sign', async function(req, res){
  // 'params_to_sign' is sent from the Cloudinary upload widget
  const params = req.query.params_to_sign;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  // 'signature' is similar to CSRF protection (make sure that no other website, but YOUR website is uploading the images to cloudinary)
  const signature = cloudinary.utils.api_sign_request(params, apiSecret);
  res.send(signature)
})

module.exports = router;