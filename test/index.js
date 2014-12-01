"use strict";

var assert = require("assert")
var nixt = require("nixt")

describe("backfile", function() {

  it("writes meta.json to the filesystem", function(done) {
    nixt()
    .run('./index.js')
    .stdout(/Wrote/)
    .stdout(/meta\.json/)
    .end(done)
  })

  it("supports --help", function(done) {
    nixt()
    .run('./index.js --help')
    .stderr(/within a directory containing a package\.json file/)
    .end(done)
  })

})
