const {BlobServiceClient} = require('@azure/storage-blob');
//const sharp = require('sharp');

// Kết nối đến Azure Blob Storage
const connectionString = 'DefaultEndpointsProtocol=https;AccountName=saleoff27;AccountKey=VpMr8TvqGwBMjfHUc+jD0miOrK0c8OW5JpLS2/dBIs5mpl7YZSx/93d/6fdBnshSg2/A2QRru4w3+AStomNmow==;EndpointSuffix=core.windows.net';
const containerName = 'container-saleoff';


async function saveImageToAzureBlobStorage(base64Image, imageName) {
  const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(containerName);

  // Chuyển đổi dữ liệu Base64 thành dạng Buffer
  const buffer = Buffer.from(base64Image, 'base64');

  // Tạo tên tệp tin duy nhất cho hình ảnh
  const fileName = `${imageName}.jpg`;

  // Tạo Blob Client để tải lên tệp tin lên Blob Storage
  const blobClient = containerClient.getBlockBlobClient(fileName);

  // Tải lên dữ liệu từ buffer lên Blob Storage
  await blobClient.upload(buffer, buffer.length);
  console.log('Hình ảnh đã được tải lên Azure Blob Storage thành công:', fileName);
}

// [POST] /course/store
function store(req, res, next) {
  const formData = req.body;
  const base64Image = req.body.image;
  console.log(base64Image);
  const imageBuffer = Buffer.from(base64Image).toString('base64');

  if (imageBuffer) {
    // Tạo tên duy nhất cho hình ảnh
    const imageName = `product_${Date.now()}`;

    // Lưu hình ảnh vào Azure Blob Storage
    saveImageToAzureBlobStorage(imageBuffer, imageName)
      .catch(error => {
        console.error('Lỗi khi lưu hình ảnh vào Azure Blob Storage:', error);
      });

    // Lưu đường dẫn tệp tin ảnh vào MongoDB
    const imagePath = `https://saleoff27.blob.core.windows.net/${containerName}/${imageName}.jpg`;
    formData.image = imagePath;
  }

  const product = new Product({
    name: formData.name,
    image: formData.image,
    description: formData.description,
    price: formData.price,
    sale: formData.sale,
    star: formData.star,
    sold: formData.sold,
    address: formData.address
  });

  product.save()
    .then(() => {
      res.redirect('/products');
    })
    .catch(err => {
      next(err);
    });
}