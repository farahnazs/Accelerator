const express = require('express');
const Profile = require('./ProfileModel.js')
const profileRouter = express.Router();
profileRouter.use(express.json());
const CryptoJS = require("crypto-js");

profileRouter.post('/create/profile', async (req, res) => {
    console.log("req:", req)


    Profile.findOne({ username: req.body.username })
        .then(rs => {
            console.log("rs:", rs)
            if (rs) {
                const id = rs._id
                const options = { new: true };
                const profile = {
                    projectNames: req.body.projectNames,
                    email: req.body.email,
                    fullName: req.body.fullName,
                    username: req.body.username,
                    password: CryptoJS.AES.encrypt(
                        req.body.password,
                        process.env.PASSWORD_SECRET_KEY
                    ).toString(),
                    role: req.body.role,
                    confirmPassword: req.body.confirmPassword
                };
                c = profile.projectNames.concat(rs.projectNames)
                profile.projectNames = c.filter((item, pos) => c.indexOf(item) === pos)

                Profile.findByIdAndUpdate(id, profile, options, (err, doc) => {
                    if (err) {
                        console.log('Error updating document:', err);
                        res.status(400).send("Something went wrong");
                    } else {
                        console.log('Updated document:', doc);
                    }
                    res.send(doc);
                });
            }
            else {
                const profile = new Profile({
                    projectNames: req.body.projectNames,
                    email: req.body.email,
                    fullName: req.body.fullName,
                    username: req.body.username,
                    password: CryptoJS.AES.encrypt(
                        req.body.password,
                        process.env.PASSWORD_SECRET_KEY
                    ).toString(),
                    role: req.body.role,
                    confirmPassword: req.body.confirmPassword
                });
                profile
                    .save()
                    .then((user) => res.json(user))
            }
        })
        .catch(err => {
            console.log(err)
        })
    //Password encryption using crypto-js
    // profile
    //     .save()
    //     .then((user) => res.json(user))
    //     .catch((err) => res.status(400).json({ message: "Could not create user" }));
});


profileRouter.get('/allprofiles', async (req, res) => {
    const query = await Profile.find();

    console.log('doc is:', query);
    res.json(query)
})
// });

//     profile.id = req.body.id;
//     profile.username = req.body.username;
//     profile.password = CryptoJS.AES.encrypt(
//         req.body.password,
//         process.env.PASSWORD_SECRET_KEY
//       ).toString(),
//     profile.confirmPassword = req.body.confirmPassword;

//     profile.role = req.body.role;


//     const doc = await profile.save();

//     console.log(doc);
//     res.json(doc);
// })

profileRouter.post("/api/login", (req, res) => {
    Profile.findOne({ username: req.body.username })
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const decryptedPassword = CryptoJS.AES.decrypt(
                user.password,
                process.env.PASSWORD_SECRET_KEY
            ).toString(CryptoJS.enc.Utf8);
            if (decryptedPassword !== req.body.password) {
                return res.status(401).json({ message: "Incorrect password" });
            }
            res.json(user); //return _id and role as a JSON at least..account Type is a must...in here I return the whole user object
        })
        .catch((err) => res.status(400).json({ message: "Could not login user" }));
});
// profileRouter.get('/getprofile', async (req, res) => {
//     let profile = new Profile();
//     const docs = await profile.find({});
//     res.json(docs)
// })

module.exports = profileRouter;