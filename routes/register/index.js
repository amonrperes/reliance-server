const express = require('express');

const healthCheck = require('../../controllers/HealthCheck/index');
const leaderRegistering = require('../../controllers/Register/leaderRegistering');
const onboarding = require('../../controllers/Admin/Users/onboarding');

const routes = express.Router();

routes.get('/health_check/check_server_availability', healthCheck.checkServerAvaibility);
routes.get('/health_check/organizations', healthCheck.getOrganizations);
routes.get('/registering/list_leaders', leaderRegistering.listAllLeaders);

routes.post('/onboarding', onboarding.createUser);
routes.post('/onboarding/activate', onboarding.activateUser);

module.exports = routes;