var assert = require('assert')
var Model = require('./model')

function build(context, callback) {
    assert(context)
    assert(callback)
    
    assert(!context.models)
    context.models = {}
    
    assert(context.definitions)
    context.definitions.forEach(model => {
        context.models[model.name] = Model.define(context, model)
    })
    
    callback(null)
}

module.exports = build