model Example {
}

context.definitions.push(Example)

build(context, function (err) {
    if (err) return done(err);
    var I = new context.models.Example()
    I.isNew.should.be.true
    done()
})
