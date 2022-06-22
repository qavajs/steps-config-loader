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
