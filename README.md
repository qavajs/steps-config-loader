# @qavajs/steps-config-loader
This is a core package to load global config and memory object. Must be a first dependency in require property

```javascript
const Memory = require('./memory');
module.exports = {
    default: {
        require: [
            '@qavajs/steps-config-loader'
        ],
        memory: new Memory()
    }
}
```

This lib comes with built-in {validation} type which resolves to function performing validation.
Implemented validations
* equal
* contain
* have members
* match
* to be above
* to be below
* have type
