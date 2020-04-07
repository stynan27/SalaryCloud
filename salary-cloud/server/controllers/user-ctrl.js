const User = require('../db/models/user-model');
const bcrypt = require('bcrypt');

createUser = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a user',
        })
    }

    const user = new User(body);

    if (!user) {
        return res.status(400).json({ success: false, error: err });
    }

    bcrypt.hash(user.hash, 18, function(err, hash) {
        user.hash = hash;
        user
            .save()
            .then(() => {
                return res.status(201).json({
                    success: true,
                    id: user._id,
                    message: 'User created!',
                });
            })
            .catch(error => {
                return res.status(400).json({
                    error,
                    message: 'User not created!',
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
        User.updateOne({_id: req.params.id}, {
            hash: newHash, 
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

        return res.status(200).json({ success: true, data: user, message: 'User deleted!' });
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

module.exports = {
    createUser,
    updateUserEmail,
    updateUserPassword,
    deleteUser,
    getUserById,
    getUsers,
};

