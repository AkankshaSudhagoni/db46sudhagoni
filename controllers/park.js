var park = require('../models/park');
// List of all parks
exports.park_list = async function(req, res) {
    try{
        theparks = await park.find();
        res.send(theparks);
        }
        catch(err){
            res.status(500);
            res.send(`{"error": ${err}}`);
            }
        };
// for a specific park.
exports.park_detail = async function(req, res) {
    console.log("detail"  + req.params.id)
    try {
        result = await park.findById( req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500)
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
};
;
// Handle park create on POST.
exports.park_create_post = async function(req, res) {
    console.log(req.body)
    let document = new park();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"parktype":"goat", "cost":12, "size":"large"}
    document.parkname = req.body.parkname;
    document.parklocation = req.body.parklocation;
    document.parkarea = req.body.parkarea;
    try{
    let result = await document.save();
    res.send(result);
    }
    catch(err){
        res.status(500);
        res.send(`{"error": ${err}}`);
        }
    };
// Handle park delete form on DELETE.
exports.park_delete = function(req, res) {
res.send('NOT IMPLEMENTED: park delete DELETE ' + req.params.id);
};
// Handle park update form on PUT.
exports.park_update_put = async function(req, res) {
    console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`)
    try {
        let toUpdate = await park.findById(req.params.id)
        // Do updates of properties
        if(req.body.parklocation) toUpdate.parklocation = req.body.parklocation;
        if(req.body.parkarea) toUpdate.parkarea = req.body.parkarea;
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
exports.park_view_all_Page = async function(req, res) {
    try{
    theparks = await park.find();
    res.render('park', { title: 'park Search Results', results: theparks });
    }
    catch(err){
        res.status(500);
        res.send(`{"error": ${err}}`);
        }
    };  