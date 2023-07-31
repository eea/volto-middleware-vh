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


[Volto](https://github.com/plone/volto) add-on

## Features

Demo GIF

## Getting started

### Try volto-middleware-vh with Docker

      git clone https://github.com/eea/volto-middleware-vh.git
      cd volto-middleware-vh
      make
      make start

Go to http://localhost:3000

### Add volto-middleware-vh to your Volto project

1. Make sure you have a [Plone backend](https://plone.org/download) up-and-running at http://localhost:8080/Plone

   ```Bash
   docker compose up backend
   ```

1. Start Volto frontend

* If you already have a volto project, just update `package.json`:

   ```JSON
   "addons": [
       "@eeacms/volto-middleware-vh"
   ],

   "dependencies": {
       "@eeacms/volto-middleware-vh": "*"
   }
   ```

* If not, create one:

   ```
   npm install -g yo @plone/generator-volto
   yo @plone/volto my-volto-project --canary --addon @eeacms/volto-middleware-vh
   cd my-volto-project
   ```

1. Install new add-ons and restart Volto:

   ```
   yarn
   yarn start
   ```

1. Go to http://localhost:3000

1. Happy editing!

## Release

See [RELEASE.md](https://github.com/eea/volto-middleware-vh/blob/master/RELEASE.md).

## How to contribute

See [DEVELOP.md](https://github.com/eea/volto-middleware-vh/blob/master/DEVELOP.md).

## Copyright and license

The Initial Owner of the Original Code is European Environment Agency (EEA).
All Rights Reserved.

See [LICENSE.md](https://github.com/eea/volto-middleware-vh/blob/master/LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
