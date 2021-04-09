var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var park_controller = require('../controllers/park');
/// API ROUTE ///
// GET resources base.
router.get('/resource', api_controller.api);
/// park ROUTES ///
// POST request for creating a park.
router.post('/resource/parks', park_controller.park_create_post);
// DELETE request to delete park.
router.delete('/resource/parks/:id', park_controller.park_delete);
// PUT request to update park.
router.put('/resource/parks/:id', park_controller.park_update_put);
// GET request for one park.
router.get('/resource/parks/:id', park_controller.park_detail);
// GET request for list of all park items.
router.get('/resource/parks', park_controller.park_list);
module.exports = router;