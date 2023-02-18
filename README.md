# SalaryCloud
A MERN Application built from the ground up to help supply potential employees with relevant salary information based on filtered search criteria.

[Example Image](https://github.com/stynan27/SalaryCloud/blob/master/SalaryCloud.PNG)

## Setup
#### You will need to install the following before proceeding:
- [Node.js v13.13.0 & NPM](https://nodejs.org/en/download/) or higher
- An IDE like [Atom](https://atom.io/) or [Visual Studio](https://visualstudio.microsoft.com/downloads/)
- `bash shell` or `zsh` for backend scripts
- [MongoDB](https://www.mongodb.com/) for our database (Windows)
- [Homebrew](https://brew.sh/) which can be used to install [MongoDB](https://github.com/mongodb/homebrew-brew) for Mac
  > `brew tap mongodb/brew`
  >
  > `brew install mongodb-community`
- Although not necessary, we recommend [MongoDB Compass](https://www.mongodb.com/products/compass) for inspecting your MongoDB Instance

#### `cd` into the salary-cloud root directory and pull the latest changes from master
> `cd ./salary-cloud`
>
> `git pull origin master`

#### Install the necessary `npm` packages
> `npm install`

## Start up the backend server and MongoDB instance

If this is your first time running this application and you need to build the database from scratch, run the following commands to start the server and create our Database and Collections.
>`bash build_mock_user_collection.sh`

**Note:** `start_server.sh` contains a script that restarts your mongodb service instance which may interfere with applications you may be running. **If you do not wish to restart your instance, you can instead set up the database by running the following NPM script.**
> `npm run populate-users-collection`

Don't know if your MongoDB Instance is already running? On a Mac? Check with
the following command.
> `brew services`

Already have our database and collections set up? Just need to **restart** the server? Run the following bash script to start your MongoDB server again.
> `bash start_server.sh`

We use [nodemon](https://www.npmjs.com/package/nodemon) to start our backed service, so no need to worry about restarting our backend after each change, it's automatic!

**Note:** We use Port **8000** to run our backend server.

## Start the Frontend React Application
Our application runs in development mode on [http://localhost:3000](http://localhost:3000).
> `npm start`

## Testing
Our testing framework is [Jest.io](https://jestjs.io/), but we also use a combination of different React testing utilities and packages like [Enzyme](https://enzymejs.github.io/enzyme/), and [React Testing Library](https://testing-library.com/docs/intro).

Run the following `npm` script to start up Jest's interactive testing framework.
> `npm test`

Any new tests you write should go in the `src/tests/` directory. According to the Create React App [documentation](https://create-react-app.dev/docs/running-tests/),so long as at least one of the following are true, Jest.io will be able to find and run your tests **located in the `src/` directory**.
- Your testing file has a `.js` suffix in a `__tests__` folder
- Your testing file has a `.test.js` or `.spec.js` suffix
