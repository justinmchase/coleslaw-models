var validation = require('./validation')

function Model() {
    this.isBusy = false
    this.isNew = !this.attrs
    this.isDeleted = false
    this.isDirty = false
    this.attrs = this.attrs || {}
}

Model.define = function (context, meta) {
    var V = (context.validation || validation)(context, meta)
    var T = function (attrs) {
        this.meta = meta
        this.attrs = attrs
        this.context = context
        this.validator = V
        this.constructor()
    }
    T.meta = meta
    T.prototype = Model.prototype
    return T
}

Model.prototype.set = function (key, value, callback) {
    if (this.attrs[key] !== value) {
        this.attrs[key] = value
        if (!this.isNew && !this.isDeleted) this.isDirty = true
    }
}

Model.prototype.get = function (key) {
    return this.attrs[key]
}

Model.prototype.validate = function validate(callback) {
    this.validator(this.attrs, callback)
}

Model.prototype.delete = function _delete(callback) {
    if (this.isNew) throw new TypeError('Cannot delete a new object')
    if (this.isDirty) throw new TypeError('Object already deleted')
    this.isDeleted = true
}

Model.prototype.save = function save(callback) {
    if (this.isBusy) throw new Error('Cannot save while Model is busy')
    if (this.isNew) {
        this.busy = true
        this.context.dataAccess.create(this.attrs, (err, result) => {
            this.busy = false
            if (err) return callback(err)
            this.isNew = false
            // for each id field, set onto self
            callback(null, result)
        })
    } else if (this.isDeleted) {
        this.busy = true
        this.context.dataAccess.delete(this.attrs, (err, result) => {
            this.busy = false 
            if (err) return callback(err)
            this.isDeleted = false
            this.isNew = true
            // for each id field, unset on self
            callback(null, result)
        })
    } else if (this.isDirty) {
        this.busy = true
        this.context.dataAccess.update(this.attrs, (err, result) => {
            this.busy = false
            if (err) return callback(err)
            this.isDirty = false
            callback(null, result)
        })
    } else {
        throw new Error('Model is not in a valid state for saving')
    }
}

module.exports = Model
