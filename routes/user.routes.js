const router = require("express").Router();
const multer = require("multer");
const { checkCache } = require("../utility/cache");
const { getAllUsers, getSingleProfile, updateProfile, uploadImage } = require("../controllers/user.controller");

const upload = multer({
    dest: 'uploads/',
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.startsWith('image/')) {
        return cb(new Error('Only image files are allowed!'), false);
      }
      cb(null, true);
    },
  });

router.get("/",checkCache,getAllUsers)

router.get("/get-profile", getSingleProfile)

router.patch("/edit-profile", updateProfile)

router.post("/upload", upload.single('profileImage'),uploadImage) 

module.exports = router