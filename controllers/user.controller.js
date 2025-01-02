const User = require("../models/user.model");
const { setCache } = require("../utility/cache");



const getAllUsers = async(req, res) => {
    try {
        const users = await User.find();
        setCache(req.originalUrl, users);
        return res.status(200).json({ msg: "Users data fetched succesfully", users })
    } catch (error) {
        return res.status(500).json({ error: new Error(error).message })
    }
}

const getSingleProfile = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({ error: `no user found with the given user id ${id}` })
        }

        return res.status(200).json({ msg: "User data fetched succesfully", user })
    } catch (error) {
        return res.status(500).json({ error: new Error(error).message })
    }
}

const updateProfile  = async (req, res) => {
    try {
        const { name, email, password, userId } = req.body;

        const updates = { name, email, password };

        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 4);
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: `No user found with the given ID ${userId}` });
        }


        return res.status(200).json({ msg: "User Details Updated Succesfully", updatedUser })
    } catch (error) {
        return res.status(500).json({ error: new Error(error).message })
    }
}

const uploadImage = async (req, res) => {
    try {
        const { userId } = req.user;
        console.log(req.file)

        if (!req.file) {
            return res.status(400).send({ error: 'Image upload failed' });
        }

        const updatedUser = await User.findByIdAndUpdate(userId, { imageUrl: req.file.path });
   
        res.status(200).send({ message: 'Profile image Uploaded successfully' });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};




module.exports ={getAllUsers,getSingleProfile,updateProfile,uploadImage}