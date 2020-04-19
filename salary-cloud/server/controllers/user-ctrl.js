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
                                    userId: user._id,
                                    anonId: anonUser.anonId,
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

    if (!body.email) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an email to update a user email',
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

    if (!body.password || !body.anonId) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a new password and anonId to update a user password',
        });
    }

    const userId = req.params.id;
    const password = body.password;
    const oldAnonId = body.anonId;

    bcrypt.genSalt(12, function(err, newAnonSalt) {
        bcrypt.hash(userId+password, newAnonSalt, function(err, newAnonId) {
            AnonUser.updateOne({anonId: oldAnonId}, {
                anonId: newAnonId,
            }, (err, anonUser) => {
                if (err) {
                    return res.status(404).json({
                        err,
                        message: 'Error updating anonId!',
                    });
                }

                bcrypt.hash(password, 18, function(err, newHash) {
                    User.updateMany({_id: userId}, {
                        hash: newHash,
                        anonSalt: newAnonSalt,
                    }, (err, user) => {
                        if (err) {
                            return res.status(404).json({
                                err,
                                message: 'Error updating user password!',
                            });
                        }

                        return res.status(200).json({
                            success: true,
                            email: user.email,
                            message: 'User password and anonId updated!',
                        });
                    });
                });
            });
        });
    });
}

updateAnonUser = async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an anonymous user body to update',
        });
    }

    AnonUser.findOne({ anonId: body.anonId }, (err, anonUser) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Anonymous user not found!',
            });
        }
        anonUser.anonId = body.anonId;
        anonUser.positionTitle = body.positionTitle;
        anonUser.salary = body.salary;
        anonUser.employer = body.employer;
        anonUser.location = body.location;
        anonUser.yearsOfExp = body.yearsOfExp;

        anonUser
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: anonUser.anonId,
                    message: 'Anonymous user entry updated!',
                });
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Anonymous user not updated!',
                });
            });
    });
}

deleteUserByIds = async (req, res) => {
    await User.findOneAndDelete({ _id: req.body.id }, (err, user) => {
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

getAnonUserByAnonId = async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a request body containing the anonId.',
        });
    }

    await AnonUser.findOne({ anonId: body.anonId }, (err, anonUser) => {
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

getIdsOnLogin = async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update a user password',
        });
    }

    const userEmail = body.email;
    const userPassword = body.hash;

    await User.findOne({ email: userEmail }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` });
        }

        bcrypt.compare(userPassword, user.hash, function(err, isPassword) {
            if (err) {
                return res.status(400).json({ success: false, error: err });
            }
            if (isPassword) {
                bcrypt.hash(user._id+userPassword, user.anonSalt, function(err, anonId) {
                    if (err) {
                        return res.status(400).json({ success: false, error: err });
                    }
                    return res.status(200).json({ success: true, userId: user._id, anonId: anonId });
                });
            }
            else {
                return res
                    .status(401)
                    .json({ success: false, error: `Incorrect password` });
            }
        });
    }).catch(err => console.log(err));

}

module.exports = {
    createUser,
    updateUserEmail,
    updateUserPassword,
    updateAnonUser,
    deleteUserByIds,
    getUserById,
    getUsers,
    getAnonUserByAnonId,
    getIdsOnLogin
};
