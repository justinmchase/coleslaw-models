var fs = require('fs')
var path = require('path')
var chai = require('chai')
var sinon = require('sinon')
var coleslaw = require('coleslaw')
var Model = require('../lib/model')
var build = require('../lib/build')

var should = chai.should()
var expect = chai.expect
var assert = chai.assert

describe('coleslaw', () => {

    // The .cls files in the exmaples directory
    // are compiled into javascript and then
    // eval'd as tests.

    function addTest(p) {
        it(path.basename(p, '.cls'), (done) => {
            coleslaw.compile(p, (err, code) => {
                if (err) return done(err)
                var context = {
                    dataAccess: {
                        create: sinon.stub(),
                        retrieve: sinon.stub(),
                        update: sinon.stub(),
                        delete: sinon.stub()
                    },
                    definitions: []
                }
                try {
                    eval(code)
                } catch (err) {
                    done(err)
                }
            })
        })
    }

    function generateTests(dir) {
        describe(path.basename(dir), () => {
            var results = fs.readdirSync(dir)
            results.forEach((i) => {
                var p = path.join(dir, i)
                var stat = fs.statSync(p)
                if (stat.isFile() && path.extname(p) === '.cls') {
                    addTest(p)
                } else if (stat.isDirectory()) {
                    generateTests(p)
                }
            })
        })
    }

    generateTests(path.join(__dirname, 'examples'))
})