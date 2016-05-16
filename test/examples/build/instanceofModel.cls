model Example {

}

var context = { definitions: [Example] }

build(context, function (err) {
    if (err) return done(err);
    assert(new context.models.Example() instanceof Model)
    done()
})
