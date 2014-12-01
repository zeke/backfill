#!/usr/bin/env node

var fs = require("fs")
var path = require("path")
var argv = require('minimist')(process.argv.slice(2))
var pkgs = require("pkgs")

var usage = function() {
  return console.error("Run `backfill` within a directory containing a package.json file.")
}

if (argv.help || argv._[0] === "help") {
  return usage()
}

var pkgPath = path.resolve(process.cwd(), "package.json")
var metaPath = path.resolve(path.dirname(pkgPath), "meta.json")

try {
  var pkg = require(pkgPath)
} catch(e) {
  console.error("Invalid JSON file: %s", pkgPath)
  return usage()
}

if (!pkg.dependencies) {
  console.error("No dependencies listed in %s", pkgPath)
  return usage()
}

pkgs(Object.keys(pkg.dependencies), function(err, packages) {
  if (err) throw err;
  fs.writeFileSync(metaPath, JSON.stringify({packages: packages}, null, 2))
  console.log("Wrote %s", metaPath)
})
