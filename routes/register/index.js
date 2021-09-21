const express = require('express');

const healthCheck = require('../../controllers/HealthCheck/index');
const users = require('../../controllers/Admin/Users/users');

const routes = express.Router();

routes.get('/health_check/check_server_availability', healthCheck.checkServerAvaibility);

routes.post('/users', users.createUser);
routes.get('/users', users.listUsers);

module.exports = routes;