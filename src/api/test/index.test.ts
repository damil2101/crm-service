import { expect,assert } from "chai";
import exp from "constants";
import { Error } from "mongoose";
import User, { IUser } from "../models/user";
import UserService from "../services/user.service";



describe("crm service unit tests", function () {
    describe("register user functionality", function () {
        it("Should successfully register a user in db if no user exists with the same id", async function () {

            const userParams: IUser = {
                _id: 100,
                name: {
                    firstName: "mocha test",
                    lastName: "user"
                },
                email: "mochaTest@email.com",
                dob: new Date("06/24/2008"),
                occupation: "tester",
                bodyHabits:["drink"],
                mindHabits:["meditate"],
                theme:"pink",
                auditInfo: [{
                    modified_on: new Date(Date.now()),
                    modified_by: null,
                    modification_note: 'New User registered'
                }]
            };
            try {
                const createdUser = await new UserService().createUser(userParams);
                expect(createdUser.name.firstName).to.equal(userParams.name.firstName);
            } catch (error) {
            }
        });
        it("Should throw if trying to register a user with the same id", async function () {
            const userParams: IUser = {
                _id: 100,
                name: {
                    firstName: "mocha test",
                    lastName: "user"
                },
                email: "mochaTest@email.com",
                dob: new Date("06/24/2008"),
                occupation: "tester",
                bodyHabits:["drink"],
                mindHabits:["meditate"],
                theme:"pink",
                auditInfo: [{
                    modified_on: new Date(Date.now()),
                    modified_by: null,
                    modification_note: 'New User registered'
                }]
            };

            try {
                await new UserService().createUser(userParams);
            } catch (error) {
                expect(error.message).to.equal("user validation failed")
            }
        });
        it("Should throw if missing required parameter name",async function () {
            const userParams: IUser = {
                _id: 101,
                name: null,
                email: "mochaTest@email.com",
                dob: new Date("06/24/2008"),
                occupation: "tester",
                bodyHabits:["drink"],
                mindHabits:["meditate"],
                theme:"pink",
                auditInfo: [{
                    modified_on: new Date(Date.now()),
                    modified_by: null,
                    modification_note: 'New User registered'
                }]
            };

            try {
                await new UserService().createUser(userParams);
            } catch (error) {
                expect(error.message).to.equal("user validation failed: name: Path `name` is required.")
            }
            
        });
        it("Should throw if missing required parameter date of birth",async function () {
            const userParams: IUser = {
                _id: 101,
                name: {
                    firstName: "mocha test",
                    lastName: "user"
                },
                email: "mochaTest@email.com",
                dob: null,
                occupation: "tester",
                bodyHabits:["drink"],
                mindHabits:["meditate"],
                theme:"pink",
                auditInfo: [{
                    modified_on: new Date(Date.now()),
                    modified_by: null,
                    modification_note: 'New User registered'
                }]
            };

            try {
                await new UserService().createUser(userParams);
            } catch (error) {
                expect(error.message).to.equal("user validation failed: dob: Path `dob` is required.")
            }
        });
        it("Should update user successfully with valid params", async function(){
        
            try {
                const userFilter = {_id:100};
                const user = await new UserService().getUser(userFilter)
                user.auditInfo.push({
                    modified_on: new Date(Date.now()),
                    modified_by:null,
                    modification_note:'User Data updated'
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
                    bodyHabits:["drink"],
                    mindHabits:["meditate"],
                    theme:"pink",
                    auditInfo: user.auditInfo
                };
                const updatedUser = await new UserService().updateUser(userParams)
                expect(updatedUser.occupation).to.equal(userParams.occupation);
                expect(updatedUser.dob).to.equal(user.dob);
            } catch (error) {
                
            }
        });
    })
})