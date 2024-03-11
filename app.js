'use strict'

const path = require('path')
const AutoLoad = require('@fastify/autoload')
const rootDir = path.resolve(__dirname, '/public');

// Pass --options via CLI arguments in command to enable these options.
module.exports.options = {}

module.exports = async function (fastify, opts) {
  // Place here your custom code!
    fastify.register(require('@fastify/multipart'), {
        addToBody: true,
    });

    fastify.register(require('@fastify/static'), {
        root: path.join(__dirname, 'public'),
        prefix: '/public',
    })

    fastify.register(require('@fastify/cors'), {
        origin: process.env.FRONTEND_ORIGIN,
        credentials: true
    })

    fastify.register(require('@fastify/cookie'), {
        secret: "my-secret", // for cookies signature
        hook: 'onRequest', // set to false to disable cookie autoparsing or set autoparsing on any of the following hooks: 'onRequest', 'preParsing', 'preHandler', 'preValidation'. default: 'onRequest'
        parseOptions: {}  // options for parsing cookies
    })

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
}
