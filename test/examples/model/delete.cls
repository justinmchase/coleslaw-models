model Example {
}

var T = build(Example, options)
var I = new T({})
I.delete()
I.save()
I.options.dataAccess.delete.called.should.be.true
