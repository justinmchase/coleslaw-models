# coleslaw-models
The model builder can be used to generate Model instances from model defintions. Model instances have standard CRUD (create, retrieve, update, delete) functionality.

## Installation
```
$ npm install coleslaw-models --save
```

## Usage
```javascript
var modelBuilder = require('coleslaw-models').build

var options = {
    dataAccess: ...
}
var descriptions = require('./models')              // Locally defined models
var models = modelBuilder(descriptions, options)

var instance = new models.Example()                 // Inherits from require('coleslaw-models').Model
instance.set('value', 'Hello World!')
instance.save()                                     // Calls options.dataAccess.create()
```

## Model features
- fields
- relationships
- validation rules
- authorization rules
- access rules
