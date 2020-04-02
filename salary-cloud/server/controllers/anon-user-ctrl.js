const AnonUser = require('../db/models/anon-user-model');

createAnonUser = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an anonymous user body',
        })
    }

    const anonUser = new AnonUser(body);

    if (!anonUser) {
        return res.status(400).json({ success: false, error: err });
    }

    anonUser
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: anonUser._id,
                message: 'Anonymous user entry created!',
            });
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Anonymous user not created!',
            });
        });
};

updateAnonUser = async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an anonymous user body to update',
        });
    }

    AnonUser.findOne({ anonId: req.params.id }, (err, anonUser) => {
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

deleteAnonUser = async (req, res) => {
    await AnonUser.findOneAndDelete({ anonId: req.params.id }, (err, anonUser) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!anonUser) {
            return res
                .status(404)
                .json({ success: false, error: `Anonymous user not found` });
        }

        return res.status(200).json({ success: true, data: anonUser, message: 'Anonymous user deleted!' });
    }).catch(err => console.log(err));
}

getAnonUserById = async (req, res) => {
    await AnonUser.findOne({ anonId: req.params.id }, (err, anonUser) => {
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

getAnonUsers = async (req, res) => {
    await AnonUser.find({}, (err, anonUsers) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!anonUsers.length) {
            return res
                .status(404)
                .json({ success: false, error: `No Anonymous Users found!` });
        }
        return res.status(200).json({ success: true, data: anonUsers });
    }).catch(err => console.log(err));
}

module.exports = {
    createAnonUser,
    updateAnonUser,
    deleteAnonUser,
    getAnonUserById,
    getAnonUsers
};