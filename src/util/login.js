const {google} = require('googleapis');
const readline = require('readline');

// Tạo một client OAuth2 mới
const oAuth2Client = new google.auth.OAuth2(
  '928962405224-gk750cmnd9a0iie4emp8kosl6tqknjqs.apps.googleusercontent.com',
  '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',
  'https://www.api.saleoff.biz'
);

// Tạo một URL cho người dùng truy cập và xin phép truy cập vào dữ liệu của họ
const scopes = ['https://www.googleapis.com/auth/userinfo.profile'];
const authUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
});

console.log('Vui lòng truy cập vào URL sau để đăng nhập:');
console.log(authUrl);

// Đọc mã xác thực từ người dùng
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Nhập mã xác thực từ URL sau khi đăng nhập: ', (code) => {
  rl.close();

  // Lấy mã xác thực và trao đổi nó để nhận token truy cập và token làm mới
  oAuth2Client.getToken(code, (err, tokens) => {
    if (err) {
      console.error('Lỗi xác thực:', err);
      return;
    }

    // Đặt token truy cập cho client OAuth2 để thực hiện các yêu cầu gọi API
    oAuth2Client.setCredentials(tokens);
    console.log('Đăng nhập thành công!');

    // Tiếp tục thực hiện các hoạt động khác...
    // Ví dụ: Gửi yêu cầu gọi API để truy cập thông tin người dùng
    const oauth2 = google.oauth2({version: 'v2', auth: oAuth2Client});
    oauth2.userinfo.get((err, response) => {
      if (err) {
        console.error('Lỗi khi lấy thông tin người dùng:', err);
        return;
      }

      console.log('Thông tin người dùng:', response.data);
    });
  });
});
