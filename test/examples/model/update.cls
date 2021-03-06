model Example {
    field value: string
}

context.definitions.push(Example)

build(context, function (err) {
    if (err) return done(err);
    var I = new context.models.Example({ value: 'original' })
    I.set('value', 'changed')
    I.save()
    context.dataAccess.update.called.should.be.true
    done()
})
