const express = require('express');

const healthCheck = require('../../controllers/HealthCheck/index');

const users = require('../../controllers/Admin/Users/users');
const members = require('../../controllers/Admin/Members/users');

const routes = express.Router();

routes.get('/health_check/check_server_availability', healthCheck.checkServerAvaibility);

routes.post('/users', users.createUser);
routes.get('/users', users.listUsers);

routes.post('/members', members.createMember);
routes.get('/members', members.listMembers);

module.exports = routes;