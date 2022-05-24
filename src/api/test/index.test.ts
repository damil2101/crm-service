import { expect } from "chai";
import User from "../models/user";
import sinon from "sinon";


describe("crm service unit tests",function(){
    describe("register user functionality",function(){
        it("Should successfully register a user in db if no user exists with the same id", async function(){
            const _id =1;
            const name= "testUser";
            const email= "test@email.com";
            const age = 18;
            const occupation = "tester";
            
            sinon.stub(User,"countDocuments").resolves(0);
            sinon.stub(User.prototype,"save").returns({
                name,email,age,occupation
            });
            const registeredUser = new User({
                _id,
                name,
                email,
                age,
                occupation
            }).save();
            expect(registeredUser.name).to.equal(name);
            expect(registeredUser.email).to.equal(email);
        });
        it("Should throw if trying to register a user with the same id",async function(){
            const _id =1;
            const name="testUser";
            const email="test@email.com";
            const age=18;
            const occupation="developer";
            sinon.restore();
            sinon.stub(User,"countDocuments").resolves(1)
            sinon.stub(User.prototype,"save").rejects();
            await new User({
                _id,
                name,
                email,
                age,
                occupation
            }).save().catch((err) => {
                expect(err.message).to.equal("Error")
            });
        });
    })
})