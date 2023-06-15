// requireLogin.js
function requireAdmin(req, res, next) {
  // Kiểm tra xem người dùng có vai trò là "admin" hay không
  if (req.user && req.user.role === 'admin') {
    // Người dùng có vai trò "admin", cho phép truy cập tiếp theo
    next();
  } else {
    // Người dùng không có vai trò "admin", chuyển hướng về trang chủ hoặc trả về mã lỗi
    res.redirect('/notAdmin');
    // Hoặc: res.status(403).send('Forbidden');
  }
}

function requireEditer(req, res, next) {
  // Kiểm tra xem người dùng có vai trò là "admin" hay không
  if (req.user && req.user.role === 'editer') {
    // Người dùng có vai trò "admin", cho phép truy cập tiếp theo
    next();
  } else {
    // Người dùng không có vai trò "admin", chuyển hướng về trang chủ hoặc trả về mã lỗi
    res.redirect('/notAdmin');
    // Hoặc: res.status(403).send('Forbidden');
  }
}

module.exports = {requireAdmin, requireEditer};
