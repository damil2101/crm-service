import { expect } from "chai";
import { IUser } from "../models/user";
import { bodyBasics, mindBasics } from "../models/userHabits";
import UserService from "../services/user.service";

var userService = new UserService();
const userParams: IUser = {
    _id: 100,
    name: {
        firstName: "mocha test",
        lastName: "user"
    },
    email: "mochaTest@email.com",
    dob: new Date("06/24/2008"),
    occupation: "tester",
    theme: "pink",
    auditInfo: [{
        modified_on: new Date(Date.now()),
        modified_by: null,
        modification_note: 'New User registered'
    }]
};

describe("crm service unit tests", function () {
    describe("register user functionality", function () {
        it("Should successfully register a user in db if no user exists with the same id", async function () {
            try {
                const createdUser = await userService.createUser(userParams);
                expect(createdUser.name.firstName).to.equal(userParams.name.firstName);
            } catch (error) {
            }
        });
        it("Should throw if trying to register a user with the same id", async function () {
            try {
                await userService.createUser(userParams);
            } catch (error) {
                expect(error.message).to.equal("user validation failed")
            }
        });
        it("Should throw if missing required parameter name", async function () {
            try {
                await userService.createUser(userParams);
            } catch (error) {
                expect(error.message).to.equal("user validation failed: name: Path `name` is required.")
            }

        });
        it("Should throw if missing required parameter date of birth", async function () {
            try {
                await userService.createUser(userParams);
            } catch (error) {
                expect(error.message).to.equal("user validation failed: dob: Path `dob` is required.")
            }
        });
        it("Should update user successfully with valid params", async function () {

            try {
                const userFilter = { _id: 100 };
                const user = await userService.getUser(userFilter)
                user.auditInfo.push({
                    modified_on: new Date(Date.now()),
                    modified_by: null,
                    modification_note: 'User Data updated'
                })

                const userParams: IUser = {
                    _id: user._id,
                    name: {
                        firstName: "name updated",
                        lastName: "user"
                    },
                    email: "mochaTest@email.com",
                    dob: null,
                    occupation: "developer",
                    theme: "pink",
                    auditInfo: user.auditInfo
                };
                const updatedUser = await userService.updateUser(userParams)
                expect(updatedUser.occupation).to.equal(userParams.occupation);
                expect(updatedUser.dob).to.equal(user.dob);
            } catch (error) {

            }
        });
        it("User registration with habit values", async function () {
            userParams.userHabits = {
                body: [bodyBasics.DRINK],
                mind: [mindBasics.GRATITUDE]
            }
            try {
                const createdUser = await userService.createUser(userParams);
                expect(createdUser.name.firstName).to.equal(userParams.name.firstName);
                expect(createdUser.name.userHabits.body[0]).to.equal(bodyBasics.DRINK);
            } catch (error) {
            }
        });

        it("Should get user by email", async function () {
            await userService.createUser(userParams);
            const userfilter = { email: "mochaTest@email.com" };
            const user = await userService.getUser(userfilter);
            expect(user.email).to.equal("mochaTest@email.com");
        });

        it("Should get user habits by email", async function () {

            userParams.userHabits = {
                body: [bodyBasics.DRINK],
                mind: [mindBasics.GRATITUDE]
            }
            await userService.createUser(userParams);
            const userfilter = { email: "mochaTest@email.com" };
            const userHabits = await userService.getUserHabits(userfilter);
            expect(userHabits).to.be.not.null;
            expect(userHabits.body).to.be.an('array').that.includes(bodyBasics.DRINK);
        });

        it("Should update user habits", async function () {
            await userService.createUser(userParams);
            const userfilter = { email: "mochaTest@email.com" };
            const user = await userService.getUser(userfilter);
            expect(user).to.be.not.null;
            expect(user.userHabits.body).to.include(bodyBasics.DRINK)
            const updatedUser = await userService.updateUserHabits(userfilter, [bodyBasics.EAT], [mindBasics.JOURNAL]);
            expect(updatedUser.userHabits).to.be.not.null;
            expect(updatedUser.userHabits.body).to.include(bodyBasics.EAT)
        });

        it("Should not accept random habit values", async function(){
            await userService.createUser(userParams);
            const userfilter = { email: "mochaTest@email.com" };
            const user = await userService.getUser(userfilter);
            expect(user).to.be.not.null;
            user.userHabits.body = ["random","values"];

            try {
                await user.save();
            } catch (error) {
                expect(error.message).to.include("user validation failed")
            }
        })

    })
})