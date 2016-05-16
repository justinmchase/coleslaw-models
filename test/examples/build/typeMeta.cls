model Example {

}

var context = { definitions: [Example] }

build(context, function (err) {
    if (err) return done(err);
    new context.models.Example()
        .meta
        .should
        .equal(Example)
        
    done()
})
