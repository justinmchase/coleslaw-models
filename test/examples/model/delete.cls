model Example {
}

context.definitions.push(Example)

build(context, function (err) {
    if (err) return done(err);
    var I = new context.models.Example({})
    I.delete()
    I.save()
    context.dataAccess.delete.called.should.be.true
    done()
})
