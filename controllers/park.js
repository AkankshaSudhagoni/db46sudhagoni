var park = require('../models/park');
// List of all parks
exports.park_list = async function (req, res) {
    try {
        theparks = await park.find();
        res.send(theparks);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
// for a specific park.
exports.park_detail = async function (req, res) {
    console.log("detail" + req.params.id)
    try {
        result = await park.findById(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500)
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
};
;
// Handle park create on POST.
exports.park_create_post = async function (req, res) {
    console.log(req.body)
    let document = new park();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"parktype":"goat", "cost":12, "size":"large"}
    document.parkname = req.body.parkname;
    document.parklocation = req.body.parklocation;
    document.parkarea = req.body.parkarea;
    try {
        let result = await document.save();
        res.send(result);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
// Handle park delete on DELETE.
exports.park_delete = async function (req, res) {
    console.log("delete " + req.params.id)
    try {
        result = await park.findByIdAndDelete(req.params.id)
        console.log("Removed " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": Error deleting ${err}}`);
    }
};

// Handle park update form on PUT.
exports.park_update_put = async function (req, res) {
    console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`)
    try {
        let toUpdate = await park.findById(req.params.id)
        // Do updates of properties
        if (req.body.parklocation) toUpdate.parklocation = req.body.parklocation;
        if (req.body.parkarea) toUpdate.parkarea = req.body.parkarea;
        let result = await toUpdate.save();
        console.log("Sucess " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": ${err}: Update for id ${req.params.id} failed`);
    }
};

// VIEWS
// Handle a show all view
exports.park_view_all_Page = async function (req, res) {
    try {
        theparks = await park.find();
        res.render('park', { title: 'park Search Results', results: theparks });
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
// Handle a show one view with id specified by query
exports.park_view_one_Page = async function (req, res) {
    console.log("single view for id " + req.query.id)
    try {
        result = await park.findById(req.query.id)
        res.render('parkdetail',
            { title: 'park Detail', toShow: result });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle building the view for creating a park.
// No body, no in path parameter, no query.
// Does not need to be async
exports.park_create_Page = async function (req, res) {
    console.log("create view")
    try {
        res.render('parkcreate', { title: 'Park Create' });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle building the view for updating a park.
// query provides the id
exports.park_update_Page =  async function(req, res) {
    console.log("update view for item "+req.query.id)
    try{
        let result = await park.findById(req.query.id)
        res.render('parkupdate', { title: 'park Update', toShow: result });
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle a delete one view with id from query
exports.park_delete_Page = async function(req, res) {
    console.log("Delete view for id "  + req.query.id)
    try{
        result = await park.findById(req.query.id)
        res.render('parkdelete', { title: 'park Delete', toShow: result });
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};
