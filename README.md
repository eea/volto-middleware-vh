# volto-middleware-vh
[![Releases](https://img.shields.io/github/v/release/eea/volto-middleware-vh)](https://github.com/eea/volto-middleware-vh/releases)

[Volto](https://github.com/plone/volto) add-on

## Features

This package offers an Express middleware virtual hosting using the Virtual Host Monster of ZOPE.

## Getting started

1. Create new volto project if you don't already have one:
    ```
    $ npm install -g yo @plone/generator-volto
    $ yo @plone/volto my-volto-project --addon @eeacms/volto-middleware-vh
    $ cd my-volto-project
    ```

1. If you already have a volto project, just update `package.json`:
    ``` JSON
    "addons": [
        "@eeacms/volto-middleware-vh"
    ],

    "dependencies": {
        "@eeacms/volto-middleware-vh": "1.0.0"
    }
    ```

1. Install new add-ons and restart Volto:
    ```
    $ yarn
    $ yarn start
    ```

1. Go to http://localhost:3000

1. Happy editing!

## How to contribute

See [DEVELOP.md](https://github.com/eea/volto-middleware-vh/blob/master/DEVELOP.md).

## Copyright and license

The Initial Owner of the Original Code is European Environment Agency (EEA).
All Rights Reserved.

See [LICENSE.md](https://github.com/eea/volto-middleware-vh/blob/master/LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
