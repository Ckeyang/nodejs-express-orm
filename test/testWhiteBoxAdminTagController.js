var supertest = require("supertest");
var should = require("should");
var app = require('../app');
var config = require('../config');
// var server = supertest.agent("http://localhost:2016");
// UNIT test begin

describe("white box test  for adminTagController ", function () {

    it("should access index page", function (done) {

        // calling home page api
        supertest(app)
            .get("/index")
            .set({'apiKey': config.apiKey})
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(200) // THis is HTTP response
            .end(function (err, res) {
                if (err) throw err;
                // HTTP status should be 200
                res.status.should.equal(200);
                // Error key should be false.
                // res.body.error.should.equal(false);
                done();
            });
    });
    
    it("should post parameters on login ", function (done) {
        // calling home page api
        supertest(app)
            .post("/onlogin.json")
            .set({'apiKey': config.apiKey})
            .send({"loginname": "admin", "password": "admin"})
            .expect(302) // THis is HTTP response
            .end(function (err, res) {
                if (err) throw err;
                // HTTP status should be 200
                res.header.location.should.equal("/index");
                // Error key should be false.
                // res.body.error.should.equal(false);
                done();
            });
    });

    it("test uploadTagPics ", function (done) {
        // calling home page api
        supertest(app)
            .post("/uploadTagPics.json")
            // .set('Content-Type', 'multipart/form-data')
            .set({'apiKey': config.apiKey})
            .field("loginname", "admin")
            // .attach('avatar', 'path/to/tobi.png', 'user.png')
            .attach('tagImage', 'test/tagpic.jpg')
            .end(function (err, res) {
                if (err) throw err;
                // HTTP status should be 200
                res.status.should.equal(200);
                done();
            });
    });

    it("test createUser", function (done) {
        supertest(app)
            .post("/addAdminUser.json")
            .set({'apiKey': config.apiKey})
            .send({"loginname": "susan", "password": "susan", "name": "susan"})
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                console.log(res.body);
                done();
            });
    });
});