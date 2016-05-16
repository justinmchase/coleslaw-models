model Example {
}

context.definitions.push(Example)

build(context, function (err) {
    if (err) return done(err);
    var I = new context.models.Example({})
    I.delete()
    I.isDeleted.should.be.true
    done()
})