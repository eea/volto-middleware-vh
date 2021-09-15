import superagent from 'superagent';
import cookie from 'react-cookie';
import qs from 'querystring';
import { parse as parseUrl } from 'url';

import config from '@plone/volto/registry';

const getReqPath = (req) => {
  const reqPath = req.path;
  const reqQuery = qs.stringify(req.query);

  return !reqQuery ? reqPath : `${reqPath}?${reqQuery}`;
};

const getVirtualHost = () => {
  const { settings } = config;
  const internalApiUrl = parseUrl(settings.internalApiPath || settings.apiPath);
  const apiUrl = parseUrl(settings.apiPath);
  const publicUrl = parseUrl(settings.publicURL);
  const apiProtocol = apiUrl.protocol.slice(0, apiUrl.protocol.length - 1);
  const virtualHost =
    settings.virtualHost ||
    `/${apiProtocol}/${publicUrl.hostname}${
      __DEVELOPMENT__ ? `:${publicUrl.port}` : ''
    }${internalApiUrl.path}`;

  return `${internalApiUrl.protocol}//${internalApiUrl.host}/VirtualHostBase${virtualHost}/VirtualHostRoot`;
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
    const vhPaths = config.settings.virtualHostedPaths || [];
    if (vhPaths.length) {
      const express = require('express');
      const middleware = express.Router();
      vhPaths.forEach((path) => {
        middleware.all(path, function (req, res) {
          getAPIResourceWithAuth(req)
            .then((resource) => {
              res.set('Content-Type', 'text/plain');
              res.send(resource);
            })
            .catch((error) => {
              res.status(error.status).send(error);
            });
        });
      });
      middleware.id = 'vh-proxy-middleware';

      config.settings.expressMiddleware = [
        ...config.settings.expressMiddleware,
        middleware,
      ];
    }
  }
  return config;
};
