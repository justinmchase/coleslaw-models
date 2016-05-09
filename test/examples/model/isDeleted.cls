model Example {
}

var T = build(Example, options)
var I = new T({})
I.delete()
I.isDeleted.should.be.true