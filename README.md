# volto-middleware-vh
[![Releases](https://img.shields.io/github/v/release/eea/volto-middleware-vh)](https://github.com/eea/volto-middleware-vh/releases)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-middleware-vh%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-middleware-vh/job/master/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-middleware-vh-master&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-middleware-vh-master)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-middleware-vh-master&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-middleware-vh-master)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-middleware-vh-master&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-middleware-vh-master)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-middleware-vh-master&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-middleware-vh-master)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-middleware-vh%2Fdevelop&subject=develop)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-middleware-vh/job/develop/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-middleware-vh-develop&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-middleware-vh-develop)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-middleware-vh-develop&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-middleware-vh-develop)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-middleware-vh-develop&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-middleware-vh-develop)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-middleware-vh-develop&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-middleware-vh-develop)


[Volto](https://github.com/plone/volto) add-on - Express middleware virtual hosting

#### IMPORTANT! Because of the way it works, you should always load this addon as the last addon in Volto project configuration.

## Features

This package offers an Express middleware virtual hosting using the Virtual Host Monster of ZOPE. (https://zope.readthedocs.io/en/latest/zopebook/VirtualHosting.html)

## Getting started

This package requires a config setting `virtualHostedPaths` or an env `RAZZLE_VIRTUAL_HOSTED_PATHS`, an array of paths that will go through vh, which can be set in the theme addon. Also the theme addon **needs to be placed above** volto-middleware-vh in the addons dependency list.
You can also set a `virtualHost` config setting or `RAZZLE_VIRTUAL_HOST` env which will be used as the new host by Virtual Host Monster 

### Example of usage:

Let's say we have:
```
frontend (volto)    at http://frontend.com
zope                at http://backend.com
backend (plone)     at http://backend.com/api
```
 If we have an rss feed located at `http://backend.com/api/news/RSS` the content will contain urls pointing to the backend instead of frontend.

```
~ your-theme/index.js

function applyConfig(config) {
    ...
    config.settings.virtualHostedPaths = ['**/RSS']
    ...
}
```
By setting the virtualHostedPaths array, with only `['**/RSS']` in this case, volto-middleware-vh will enable virtual hosting for all the routes that ends with `/RSS` and the request will look something like:
```
http://backend.com/VirtualHostBase/http/frontend.com/api/VirtualHostRoot/news/RSS
```
and will respond with all the urls pointing to the frontend.


1. Create new volto project if you don't already have one:
    ```
    $ npm install -g yo @plone/generator-volto
    $ yo @plone/volto my-volto-project --addon @eeacms/volto-middleware-vh
    $ cd my-volto-project
    ```

2. If you already have a volto project, just update `package.json`:
    ``` JSON
    "addons": [
        "your-theme",
        "@eeacms/volto-middleware-vh"
    ],

    "dependencies": {
        "@eeacms/volto-middleware-vh": "1.0.0"
    }
    ```

3. Install new add-ons and restart Volto:
    ```
    $ yarn
    $ yarn start
    ```

4. Go to http://localhost:3000

5. Happy editing!

## How to contribute

See [DEVELOP.md](https://github.com/eea/volto-middleware-vh/blob/master/DEVELOP.md).

## Copyright and license

The Initial Owner of the Original Code is European Environment Agency (EEA).
All Rights Reserved.

See [LICENSE.md](https://github.com/eea/volto-middleware-vh/blob/master/LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
