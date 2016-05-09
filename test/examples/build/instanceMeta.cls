model Example {

}

var T = build(Example)

new T()
    .meta
    .should
    .equal(Example)
