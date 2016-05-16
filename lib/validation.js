var Joi = require('joi')

function defineField(context, field) {
    switch(field.type) {
        case 'string':
            return Joi.string()
        default:
            throw new Error(`Unknown field type for field: ${field}`)
    }
}

function defineKeys(context, meta) {
    var keys = {}
    var fields = meta.fields || []
    fields.forEach(f => {
        keys[f.field] = defineField(context, f)
    })
    return keys
}

function defineObject(context, meta) {
    var keys = defineKeys(context, meta)
    return Joi
        .object()
        .keys(keys)
}

function define(context, meta) {
    var schema = defineObject(context, meta)
    function validate(attrs, callback) {
        Joi.validate(attrs, schema, (err, result) => {
            if (err) return callback(err)
            callback()
        })
    }
    return validate
}

module.exports = define