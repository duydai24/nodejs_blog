//class SiteController {

//  // [GET] /
//  index(req, res) {
//    res.render('home');
//  }

//  // [GET] /search
//  show(req, res) {
//    res.render('search');
//  }
//}
//module.exports = new SiteController;

// [GET] /
function index(req, res) {
    res.render('home');
}
// [GET] /search
function show(req, res) {
    res.render('search');
}

module.exports = {index, show};
