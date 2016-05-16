var Model = require('../../lib/model')
var chai = require('chai')
var should = chai.should()

describe('isDirty', () => {
    var Example = Model.define({}, {})
    it ('should be false when first created', () => {
        new Example().isDirty.should.be.false
    })
    it ('should be false when loaded from values', () => {
        new Example({}).isDirty.should.be.false
    })
    it ('should be true when a new value is set on an existing model', () => {
        var model = new Example({})
        model.set('value', true)
        model.isDirty.should.be.true
    })
    it ('should be false when a new value is set on a new model', () => {
        var model = new Example()
        model.set('value', true)
        model.isDirty.should.be.false
    })
    it ('should be true when a value changes', () => {
        var model = new Example({ value: 'old' })
        model.set('value', 'new')
        model.isDirty.should.be.true
    })
    it ('should not be dirty when the same value is set', () => {
        var model = new Example({ value: 'same' })
        model.set('value', 'same')
        model.isDirty.should.be.false
    })
})