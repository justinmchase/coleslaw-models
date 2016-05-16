var Model = require('../../lib/model')
var sinon = require('sinon')
var chai = require('chai')
var should = chai.should()
var expect = chai.expect
var assert = chai.assert

describe('isNew', () => {
    var context = {
        dataAccess: {
            create: (model, callback) => callback(null, { id: 0 })
        }
    }
    var Example = Model.define(context, {})
    it ('should be true when not created with values', () => {
        new Example().isNew.should.be.true
    })
    it ('should be false when created without values', () => {
        new Example({}).isNew.should.be.false
    })
    it ('should be true even after setting a value', () => {
        var model = new Example()
        model.set('value', true)
        model.isNew.should.be.true
    })
    it ('should be false after being saved', (done) => {
        var model = new Example()
        model.save((err) => {
            if (err) return done(err)
            model.isNew.should.be.false
            done()
        })
    })
})