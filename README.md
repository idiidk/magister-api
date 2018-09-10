# Magister API

An API for the Magister school software which implements the new login system!

[![Dependency Status](https://david-dm.org/idiidk/magister-api.svg)](https://david-dm.org/idiidk/magister-api)
[![devDependency Status](https://david-dm.org/idiidk/magister-api/dev-status.svg)](https://david-dm.org/idiidk/magister-api#info=devDependencies)

## Quick Start

Install the package:

```sh
npm install magister-api
```

Use the package in Node:

```javascript
const { default: Magister } = require('magister-api')
const magister = new Magister('schoolName', 'username', 'password')

magister.authenticate()
  .then(session => {
    session.getProfileInfo()
      .then(info => {
        console.log('Yay, this is me:', info)
      })
  }).catch(error => {
    throw new Error(error)
  })
```

## Documentation

For documentation, please look at the [JSDocs](https://idiidk.site/magister-api/)

## Release History

* 0.1.1 - Added Messages

* 0.1.0 - First types!
  * Able to fetch Appointments
  * Able to fetch Group data
  * Able to fetch Person data
  * Better documentation
  * Wrote tests

* 0.0.1 - Initial release
  * Able to connect and authenticate with the Magister private API

## Meta

idiidk – [@idiidka](https://twitter.com/idiidka)

Distributed under the MIT license. See ``LICENSE`` for more information.

[https://github.com/idiidk](https://github.com/idiidk/)

## Contributing

1. Fork it (<https://github.com/idiidk/kahoot-tools/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request