const bcrypt = require('bcrypt');

const User = require('../db/models/user-model');
const AnonUser = require('../db/models/anon-user-model');

createUser = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a user',
        })
    }

    const user = new User(body);
    const anonUser = new AnonUser({anonId: ""});

    if (!user || !anonUser) {
        return res.status(400).json({ success: false, error: err, message: 'Invalid user or anonymous user object.' });
    }

    const password = user.hash;

    bcrypt.hash(password, 18, function(err, hash) {
        bcrypt.genSalt(12, function(err, anonSalt) {
            user.hash = hash;
            user.anonSalt = anonSalt;
            user
                .save()
                .then(() => {
                    bcrypt.hash(user._id+password, anonSalt, function(err, anonId) {
                        anonUser.anonId = anonId;
                        anonUser
                            .save()
                            .then(() => {
                                return res.status(201).json({
                                    success: true,
                                    id: anonUser.anonId,
                                    message: 'User and anonymous user created!',
                                });
                            })
                            .catch(error => {
                                return res.status(400).json({
                                    error,
                                    message: 'Anonymous user not created!',
                                });
                            });
                    });
                })
                .catch(error => {
                    return res.status(400).json({
                        error,
                        message: 'User not created!',
                    });
                });
        });
    });
}

updateUserEmail = async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update a user email',
        });
    }

    User.updateOne({_id: req.params.id}, {
        email: body.email, 
    }, (err, user) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Error updating user email!',
            });
        }
        return res.status(200).json({
            success: true,
            email: user.email,
            message: 'User email updated!',
        });
    });
}

updateUserPassword = async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update a user password',
        });
    }

    bcrypt.hash(body.hash, 18, function(err, newHash) {
        // Provide the old plaintextPW and newPlaintextPW
        User.updateOne({_id: req.params.id}, {
            hash: newHash, 
        }, (err, user) => {
            if (err) {
                return res.status(404).json({
                    err,
                    message: 'Error updating user password!',
                });
            }
            // TODO: Generate new anonSalt and new hashed anonId, 
            // Then check if the oldPlaintextPw can be found in anonymous table...
            // If it can, then hash newPlaintextPw 
            // AnonUser.updateOne(anonId: newAnonId)
            return res.status(200).json({
                success: true,
                email: user.email,
                message: 'User password updated!',
            });
        });
    });
}

deleteUser = async (req, res) => {
    await User.findOneAndDelete({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` });
        }

    }).catch(err => console.log(err));

    await AnonUser.findOneAndDelete({ anonId: req.body.anonId }, (err, anonUser) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!anonUser) {
            return res
                .status(404)
                .json({ success: false, error: `Anonymous user not found` });
        }
        
        return res.status(200).json({ success: true, data: anonUser, message: 'User and anonymous user deleted!' });
    }).catch(err => console.log(err));
}

getUserById = async (req, res) => {
    await User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` });
        }
        return res.status(200).json({ success: true, data: user });
    }).catch(err => console.log(err));
}

getUsers = async (req, res) => {
    await User.find({}, (err, users) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!users.length) {
            return res
                .status(404)
                .json({ success: false, error: `No Users found!` });
        }
        return res.status(200).json({ success: true, data: users });
    }).catch(err => console.log(err));
}

// Read for Anonymous User data, only requires the anonId
getAnonUserById = async (req, res) => {
    await AnonUser.findOne({ anonId: result }, (err, anonUser) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!anonUser) {
            return res
                .status(404)
                .json({ success: false, error: `Anonymous user not found` });
        }
        return res.status(200).json({ success: true, data: anonUser });
    }).catch(err => console.log(err));
}

module.exports = {
    createUser,
    updateUserEmail,
    updateUserPassword,
    deleteUser,
    getUserById,
    getUsers,
};

