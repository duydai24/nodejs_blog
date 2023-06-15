function index(req, res) {
    res.render('news');
}

function show(req, res) {
    res.send('News Detail!');
}

module.exports = {index, show};
