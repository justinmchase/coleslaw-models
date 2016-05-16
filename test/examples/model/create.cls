model Example {
}

context.definitions.push(Example)

build(context, function (err) {
    if (err) return done(err);
    var I = new context.models.Example()
    I.save()
    context.dataAccess.create.called.should.be.true
    done()
})
