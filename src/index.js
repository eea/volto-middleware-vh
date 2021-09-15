import superagent from 'superagent';
import cookie from 'react-cookie';
import qs from 'querystring';
import { parse as parseUrl } from 'url';

import config from '@plone/volto/registry';

const getProtocol = (protocol) => {
  return protocol?.slice(0, protocol.length - 1) || '';
};

const getReqPath = (req) => {
  const reqPath = req.path;
  const reqQuery = qs.stringify(req.query);

  return !reqQuery ? reqPath : `${reqPath}?${reqQuery}`;
};

const getVirtualHost = () => {
  const { settings } = config;
  const vh = process.env.RAZZLE_VIRTUAL_HOST || settings.virtualHost;
  const vhUrl = vh ? parseUrl(vh) : null;
  const internalApiUrl = parseUrl(settings.internalApiPath || settings.apiPath);
  const apiUrl = parseUrl(settings.apiPath);
  const publicUrl = parseUrl(settings.publicURL);
  const virtualHost = vhUrl
    ? `/${getProtocol(vhUrl.protocol)}/${vhUrl.host}:80${internalApiUrl.path}`
    : `/${getProtocol(apiUrl.protocol)}/${publicUrl.host}:80${
        internalApiUrl.path
      }`;

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
    const vhPaths =
      process.env.RAZZLE_VIRTUAL_HOSTED_PATHS?.split(',') ||
      config.settings.virtualHostedPaths ||
      [];
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
