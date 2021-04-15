var express = require('express');
const park_controlers= require('../controllers/park');
var router = express.Router();

/* GET home page. */
router.get('/', park_controlers.park_view_all_Page );
router.get('/detail', park_controlers.park_view_one_Page);
router.get('/create', park_controlers.park_create_Page);
router.get('/update', park_controlers.park_update_Page);
router.get('/delete', park_controlers.park_delete_Page);


module.exports = router;
