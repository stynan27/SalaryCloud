const db = require('./database');
const User = require('./models/user-model');

const userData = {
    "user1": {
        "email": 'user1@gmail.com',
        "hash": 'sd48nioabsdg24r892yr',
    },
    "user2": {
        "email": 'user2@gmail.com',
        "hash": 's538ndkasndg0-i9235l',
    },
    "user3": {
        "email": 'user3@gmail.com',
        "hash": 'sopflighv893y21-=okr',
    },
};

function postUserData(userData) {
    const user = new User(userData);
    user.save()
    .catch(error => {
        return "User not created successfully!";
    });
    return "User with email: " + user.email + " was stored successfully!";
};

console.log("Creating users collection...\n");

db.createCollection( "users", {
    validator: { 
        $jsonSchema: {
            bsonType: "object",
            required: [ "email", "hash" ],
            properties: {
                email: {
                    bsonType : "string",
                },
                hash: {
                    bsonType : "string",
                },
            },
        },
    }
})
.catch(error => {
    console.log(error);
    return "Collection not created successfully!";
});

console.log("Populating users collection...\n");

console.log(postUserData(userData["user1"]));
console.log(postUserData(userData["user2"]));
console.log(postUserData(userData["user3"]) + "\n");

console.log("Users population complete, please exit the process...\n");