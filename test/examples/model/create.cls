model Example {
}

var T = build(Example, options)
var I = new T()
I.save()
options.dataAccess.create.called.should.be.true