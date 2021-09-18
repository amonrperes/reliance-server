const express = require('express');

const healthCheck = require('../../controllers/HealthCheck/index');
const leaderRegistering = require('../../controllers/Register/leaderRegistering');

const routes = express.Router();

routes.get('/health_check/check_server_availability', healthCheck.checkServerAvaibility);
routes.get('/health_check/organizations', healthCheck.getOrganizations);
routes.get('/registering/list_leaders', leaderRegistering.listAllLeaders);

routes.post('/registering/leader', leaderRegistering.createLeader);

module.exports = routes;