import apple_p10_img1 from "./Apple/Iphone/iphone 15 pro max 1.png"
import apple_p10_img2 from "./Apple/Iphone/iphone 15 pro max 2.png"
import apple_p10_img3 from "./Apple/Iphone/iphone 15 pro max 3.png"
import apple_p10_img4 from "./Apple/Iphone/iphone 15 pro max 4.png"
import apple_p30_img1 from "./Apple/Watch/Apple Watch Ultra 2 GPS - Cellular 49mm 1.png"
import apple_p30_img2 from "./Apple/Watch/Apple Watch Ultra 2 GPS - Cellular 49mm 2.png"
import apple_p30_img3 from "./Apple/Watch/Apple Watch Ultra 2 GPS - Cellular 49mm 3.png"
import apple_p30_img4 from "./Apple/Watch/Apple Watch Ultra 2 GPS - Cellular 49mm 4.png"
import samsung_p9_img1 from "./Samsung/Phone/samsung_p9_img1.png";
import samsung_p9_img2 from "./Samsung/Phone/samsung_p9_img2.png";
import samsung_p9_img3 from "./Samsung/Phone/samsung_p9_img3.png";
import samsung_p9_img4 from "./Samsung/Phone/samsung_p9_img4.png";
import apple_p20_img1 from "./Apple/Macbook/MacBook Pro 16 inch M3 Pro 1.png"
import apple_p20_img2 from "./Apple/Macbook/MacBook Pro 16 inch M3 Pro 2.png"
import apple_p20_img3 from "./Apple/Macbook/MacBook Pro 16 inch M3 Pro 3.png"
import apple_p20_img4 from "./Apple/Macbook/MacBook Pro 16 inch M3 Pro 4.png"
import huawei_p8_img1 from "./Huawei/Laptop/huawei-matebook-x_1.png"
import huawei_p8_img2 from "./Huawei/Laptop/huawei-matebook-x_2.png"
import huawei_p8_img3 from "./Huawei/Laptop/huawei-matebook-x_3.png"
import huawei_p8_img4 from "./Huawei/Laptop/huawei-matebook-x_4.png"
import xiaomi_p20_img1 from "./Xiaomi/Laptop/xiaomi_p20_img1.png";
import xiaomi_p20_img2 from "./Xiaomi/Laptop/xiaomi_p20_img2.png";
import xiaomi_p20_img3 from "./Xiaomi/Laptop/xiaomi_p20_img3.png";
import xiaomi_p20_img4 from "./Xiaomi/Laptop/xiaomi_p20_img4.png";
import huawei_p26_img1 from "./Huawei/Watch/huwei_watch6.png"
import huawei_p26_img2 from "./Huawei/Watch/huwei_watch6_1.png"
import huawei_p26_img3 from "./Huawei/Watch/huwei_watch6_2.png"
import huawei_p26_img4 from "./Huawei/Watch/huwei_watch6_3.png"
import samsung_p16_img1 from "./Samsung/Laptop/samsung_p16_img1.png";
import samsung_p16_img2 from "./Samsung/Laptop/samsung_p16_img2.png";
import samsung_p16_img3 from "./Samsung/Laptop/samsung_p16_img3.png";
import samsung_p16_img4 from "./Samsung/Laptop/samsung_p16_img4.png";


let new_collections = [
  {
    id: 10,
    name: "iPhone 15 Pro Max",
    category: "Phone",
    brand: "Apple",
    describe: "iPhone 15 Pro Max mẫu điện thoại mới nhất của Apple cuối cùng cũng đã chính thức được ra mắt vào tháng 09/2023. Mẫu điện thoại này sở hữu một con chip với hiệu năng mạnh mẽ Apple A17 Pro, màn hình đẹp mắt và cụm camera vô cùng chất lượng.",
    image1: apple_p10_img1,
    image2: apple_p10_img2,
    image3: apple_p10_img3,
    image4: apple_p10_img4, 
    new_price: 1099,
    old_price: 1199,
  },
  {
    id: 30,
    name: "Apple Watch Ultra 2 GPS + Cellular 49mm",
    category: "Watch",
    brand: "Apple",
    describe: "Apple Watch Series 9 GPS 41mm viền nhôm dây thể thao sở hữu thiết kế sang trọng, màu sắc thời thượng phù hợp với mọi phong cách của người dùng. Đồng hồ được tích hợp các tính năng theo dõi sức khỏe tân tiến, chế độ thể thao đa dạng cùng với định vị GPS chuẩn xác, sẵn sàng đồng hành cùng người dùng trong cuộc sống hằng ngày.",
    image1: apple_p30_img1,
    image2: apple_p30_img2,
    image3: apple_p30_img3,
    image4: apple_p30_img4, 
    new_price: 879,
    old_price: 899,
  },
  {
    id: 39,
    name: "Samsung Galaxy Z Flip5 8GB-256GB",
    category: "Phone",
    brand: "Samsung",
    describe: "Samsung Galaxy Z Flip 5 có thiết kế màn hình rộng 6.7 inch và độ phân giải Full HD+ (1080 x 2640 Pixels), dung lượng RAM 8GB, bộ nhớ trong 256GB. Màn hình Dynamic AMOLED 2X của điện thoại này hiển thị rõ nét và sắc nét, mang đến trải nghiệm ấn tượng khi sử dụng.",
    image1: samsung_p9_img1,
    image2: samsung_p9_img2,
    image3: samsung_p9_img3,
    image4: samsung_p9_img4, 
    new_price: 746.90,
    old_price: 1022.22,
  },
  {
    id: 20,
    name: "MacBook Pro 16 inch M3 Pro",
    category: "Laptop",
    brand: "Apple",
    describe: "Được trang bị bộ vi xử lý M3 Pro mạnh mẽ nhất từ trước đến nay của Apple, MacBook Pro 16 inch M3 Pro không chỉ đáp ứng mọi yêu cầu của người dùng tác vụ từ văn phòng, giải trí cho đến đồ họa chuyên nghiệp mà còn tạo nên một làn gió mới trong thế giới công nghệ. Sự kết hợp giữa thiết kế thanh lịch với hiệu năng vượt trội không chỉ là một xu hướng mà còn là sự thực hiện đẳng cấp khi lần đầu ra mắt, hứa hẹn góp mặt trong danh sách siêu phẩm laptop đồ họa - kỹ thuật hot nhất cuối năm 2023.",
    image1: apple_p20_img1,
    image2: apple_p20_img2,
    image3: apple_p20_img3,
    image4: apple_p20_img4, 
    new_price: 2399,
    old_price: 2499,
  },
  {
    id: 68,
    name: "Huawei Matebook X",
    category: "Laptop",
    brand: "Huawei",
    describe: "Huawei Matebook X: Thiết kế gọn gàng, mỏng và hiệu năng cực tốt, mạnh mẽ, Laptop Huawei Matebook X là con máy sở hữu hiệu năng cực tốt, đi kèm với thiết kế thông minh, gọn gàng và nhẹ nhàng giúp người dùng dễ dàng sử dụng di chuyển. Hãy cùng tham khảo bài viết bên dưới để hiểu rõ hơn về laptop Huawei Matebook X.",
    image1: huawei_p8_img1,
    image2: huawei_p8_img2,
    image3: huawei_p8_img3,
    image4: huawei_p8_img4, 
    new_price: 904,
    old_price: 1094,
  },
  {
    id: 110,
    name: "Laptop Gaming Xiaomi Redmi G Pro 2024",
    category: "Laptop",
    brand: "Xiaomi",
    describe: "Trong thế giới laptop gaming đang phát triển không ngừng, Xiaomi Redmi G Pro 2024 nổi bật như một chiếc máy tính xách tay với sức mạnh và hiệu suất vượt trội. Với vi xử lý mạnh mẽ i9-14900HX, màn hình siêu nét 2.5K và tốc độ làm mới lên đến 240Hz, đây là một thiết bị mơ ước cho những game thủ và những người đam mê công nghệ.",
    image1: xiaomi_p20_img1,
    image2: xiaomi_p20_img2,
    image3: xiaomi_p20_img3,
    image4: xiaomi_p20_img4, 
    new_price: 1149.99,
    old_price: 1499.99,
  },
  {
    id: 86,
    name: "Huawei Watch GT3 Pro Classic - Chính hãng",
    category: "Watch",
    brand: "Huawei",
    describe: "Đồng hồ Huawei từ lâu đã nổi tiếng trên thị trường Việt Nam, trong đó có đồng hồ Huawei Watch GT3 Pro Classic đã hớp hồn nhiều người dùng ngay từ cái nhìn đầu tiên",
    image1: huawei_p26_img1,
    image2: huawei_p26_img2,
    image3: huawei_p26_img3,
    image4: huawei_p26_img4, 
    new_price: 1670,
    old_price: 2000,
  },
  {
    id: 46,
    name: "Samsung Galaxy Book3 pro 360",
    category: "Laptop",
    brand: "Samsung",
    describe: "Laptop với màn 3k Dynamic AMOLED 2X + màn hình cảm ứng; hỗ trợ và bao gồm bút S-pen; Bộ xử lý và đồ họa 13th Gen. Intel Core i7 Processor; Bộ nhớ và lưu trữ 16GB(RAM)+512GB(SSD); kích thước màn hình 16'",
    image1: samsung_p16_img1,
    image2: samsung_p16_img2,
    image3: samsung_p16_img3,
    image4: samsung_p16_img4, 
    new_price: 1329.99,
    old_price: 1899.99,
  },
];

export default new_collections;
