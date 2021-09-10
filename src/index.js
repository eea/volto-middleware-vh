import superagent from 'superagent';
import cookie from 'react-cookie';
import qs from 'querystring';
import { parse as parseUrl } from 'url';

import config from '@plone/volto/registry';

const getReqPath = (req) => {
  const reqPath = req.path.replace('/@@vh', '/');
  const reqQuery = qs.stringify(req.query);

  return !reqQuery ? reqPath : `${reqPath}?${reqQuery}`;
};

const getVirtualHost = () => {
  const internalApiUrl = parseUrl(
    config.settings.internalApiPath || config.settings.apiPath,
  );
  const apiUrl = parseUrl(config.settings.apiPath);
  const publicUrl = parseUrl(config.settings.publicURL);
  const apiProtocol = apiUrl.protocol.slice(0, apiUrl.protocol.length - 1);

  return `${internalApiUrl.protocol}//${internalApiUrl.host}/VirtualHostBase/${apiProtocol}/${publicUrl.host}${internalApiUrl.path}/VirtualHostRoot`;
};

export const getAPIResourceWithAuth = (req) => {
  return new Promise((resolve, reject) => {
    const url = `${getVirtualHost()}${getReqPath(req)}`;
    const request = superagent.get(url).buffer().type('text');
    const authToken = cookie.load('auth_token');
    if (authToken) {
      request.set('Authorization', `Bearer ${authToken}`);
    }
    request.end((error, res) => {
      if (error) {
        return reject(error);
      }
      return resolve(res.text);
    });
  });
};

export default (config) => {
  if (__SERVER__) {
    const express = require('express');
    const middleware = express.Router();

    middleware.all('**/@@vh', function (req, res, next) {
      getAPIResourceWithAuth(req)
        .then((resource) => {
          res.set('Content-Type', 'text/plain');
          res.send(resource);
        })
        .catch((error) => {
          res.status(error.status).send(error);
        });
    });
    middleware.id = 'vh-proxy-middleware';

    config.settings.expressMiddleware = [
      ...config.settings.expressMiddleware,
      middleware,
    ];
  }
  return config;
};
