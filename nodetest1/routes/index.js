/* GET home page. */


exports.index = function(req, res){
  res.render('index', { title: 'Express' });

router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('advertisement');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});



};


