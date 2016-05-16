var Model = require('../../lib/model')
var chai = require('chai')
var should = chai.should()

describe('validity', () => {
    var Example = Model.define({}, {
        fields: [{ field: 'value', type: 'string' }],
        validations: []
    })
    it('should be true on load with valid values', (done) => {
        new Example({value:'valid'}).validate(done)
    })
    it('should be false on load with invalid values', (done) => {
        new Example({value:false}).validate((err) => {
            err.should.be.ok
            done()
        })
    })
})