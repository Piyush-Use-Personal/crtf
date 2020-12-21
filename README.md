# crtf
A Playground Library for .crtf Extention

# What is CRTF?
CRTF is a file extention for reusing a text file with minor change where one can write a text file along with the few variable which developer can manupulate in time. This library provides an access to read and convert this kind of file into native text or any provided form

**Sample .crtf File**

![Alt text](static/img/crtfSampleImage.png?raw=true "File which has 2 section one is Variable and another is Content")

# Installation
```
npm install crtf
```

# Features
* Get the crtf content
* Replace the crtf content with set of objects
* Replace and Write to another file with set of objects
* Get the Variables Associated with crtf

# Usage
---
# Creating a CRTF instance
***Do not use Contructor for the same***
```
import CRTF from 'crtf';

let crtf;
CRTF.build('path of the crtf file', 'encoding').then(obj => {
    crtf = obj;
    // now crtf is an instance of CRTF
})
```

or

```
import CRTF from 'crtf';

let crtf = await CRTF.build('path of the crtf file', 'encoding');
```

# Methods
* getContent - returns a raw content of the .crtf file

```
import CRTF from 'crtf';

let crtf = await CRTF.build('path of the crtf file', 'encoding');

let rawContent = crtf.getContent();

```

* getVariables - returns a raw variables of the .crtf file

```
import CRTF from 'crtf';

let crtf = await CRTF.build('path of the crtf file', 'encoding');

let rawContent = crtf.getVariables();

```

* replaceContent - returns a replaced content of the .crtf file from given variable objects

```
import CRTF from 'crtf';

let crtf = await CRTF.build('path of the crtf file', 'encoding');

// for using the sample image above
let obj = {
    name : "Git",
    description : "Git Description"
}

let rawContent = crtf.replaceContent(obj);

```

* replaceContentAndWrite - write to file with a replaced content of the .crtf file from given variable objects
```
import CRTF from 'crtf';

let crtf = await CRTF.build('path of the crtf file', 'encoding');

let writePath = 'your-new-path';

// for using the sample image above
let obj = {
    name : "Git",
    description : "Git Description"
}
let rawContent = crtf.replaceContentAndWrite(writePath, obj);

```

Hope you like this package. Thanks!
## Authors

* **Piyush Dubey** - *Initial work* - [Piyush-Use-Personal](https://github.com/Piyush-Use-Personal/)

See also the list of [contributors](https://github.com/Piyush-Use-Personal/crtf/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details