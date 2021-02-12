const db = require('./database');
const User = require('./models/user-model');
const AnonUser = require('./models/anon-user-model');

const userData = {
    "user1": {
        "email": 'user1@gmail.com',
        "hash": 'sd48nioabsdg24r892yr',
        "anonSalt": 'salt1'
    },
    "user2": {
        "email": 'user2@gmail.com',
        "hash": 's538ndkasndg0-i9235l',
        "anonSalt": 'salt2'
    },
    "user3": {
        "email": 'user3@gmail.com',
        "hash": 'sopflighv893y21-=okr',
        "anonSalt": 'salt3'
    },
};

const anonUserData = {
    "user1": {
        "anonId": "",
        "positionTitle": "IT Specialist",
        "salary": 60000,
        "employer": "FastPacedIT",
        "location": {
            "city": "New York City",
            "state": "New York",
            "countyCode": "061",
            "stateCode": "36"
        },
        "yearsOfExp": 2,
    },
    "user2": {
        "anonId": "",
        "positionTitle": "Software Engineer",
        "salary": 80000,
        "employer": "Google",
        "location": {
            "city": "Seattle",
            "state": "Washington",
            "countyCode": "033",
            "stateCode": "53"
        },
        "yearsOfExp": 1,
    },
    "user3": {
        "anonId": "",
        "positionTitle": "Software Engineer",
        "salary": 65000,
        "employer": "Big Software Contractors Unlimited",
        "location": {
            "city": "Atlanta",
            "state": "Georgia",
            "countyCode": "13121",
            "stateCode": "13"
        },
        "yearsOfExp": 3,
    }
};

function postUserData(data) {
    const user = new User(data);
    user.save()
    .catch(error => {
      console.log(error);
      if (error.code == 11000) {
        console.log("User with email: " + user.email + " already exists, and cannot be duplicated.\n");
      } else {
        console.log("User with email: " + user.email + " was not created successfully!\n");
      }
      return -1;
    });
    console.log("User with email: " + user.email + " was stored successfully!\n");
    return user._id;
};

function postAnonUserData(data) {
    const anonUser = new AnonUser(data);
    anonUser.save()
    .catch(error => {
      if (error.code === 11000) {
        console.log("Anonymous user with id: " + anonUser.anonId + " already exists\n");
      }
        console.log("Anonymous user with id: " + anonUser.anonId + " was not stored successfully!\n");
        return -1;
    });
    console.log("Anonymous user with id: " + anonUser.anonId + " was stored successfully!\n");
    return anonUser.anonId;
};

console.log("Checking if users collection exists...\n");
if ("users" in db.collections){
  console.log("users collection already exists! Creating anyway...\n");
} else {
  console.log("Creating users collection...\n");
}

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
    return "Users collection not created successfully!";
});

if ("anon-users" in db.collections){
  console.log("anon-users collection already exists! Creating anyway...\n");
} else {
  console.log("Creating anonymous users collection...\n");
}

db.createCollection( "anon-users", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: [ "anonId"],
            properties: {
                anonId: {
                    bsonType : "string",
                },
                positionTitle: {
                    bsonType : "string",
                },
                salary: {
                    bsonType : "int",
                },
                employer: {
                    bsonType : "string",
                },
                positionTitle: {
                    bsonType : "string",
                },
                location: {
                    city: {
                        bsonType : "string"
                    },
                    state: {
                        bsonType : "string"
                    },
                },
                yearsOfExp: {
                    bsonType : "int",
                }
            },
        },
    }
})
.catch(error => {
    return "Anonymous collection not created successfully!";
});

console.log("Populating users collection...\n");

anonUserData['user1'].anonId = postUserData(userData["user1"]);
anonUserData['user2'].anonId = postUserData(userData["user2"]);
anonUserData['user3'].anonId = postUserData(userData["user3"]);

if (anonUserData['user1'].anonId === -1 || anonUserData['user2'].anonId === -1 || anonUserData['user3'].anonId === -1) {
    console.log("Creation failed, please exit the process...\n");
} else {
    console.log("Populating anonymous users collection...\n");

    let exitCode1 = postAnonUserData(anonUserData["user1"]);
    let exitCode2 = postAnonUserData(anonUserData["user2"]);
    let exitCode3 = postAnonUserData(anonUserData["user3"]);

    if (exitCode1 === -1 || exitCode2 === -1 || exitCode3 === -1) {
        console.log("Creation failed, please exit the process...\n");
    } else {
        console.log("Users population complete, please exit the process...\n");
    }
}
