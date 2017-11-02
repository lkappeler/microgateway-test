'use strict';

process.env.CONFIG_DIR = __dirname + '/definitions/dummy';
process.env.NODE_ENV = 'production';
process.env.PORT = 3333;

const microgateway = require('./node_modules/microgateway/lib/microgw');

microgateway.start(process.env.PORT);
