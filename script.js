// Chức năng chuyển đổi theme sáng/tối
const toggleButton = document.getElementById('toggle-theme');
toggleButton.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
});

// Chức năng tìm kiếm sản phẩm
const searchInput = document.getElementById('search');
const productCards = document.querySelectorAll('.product-card');

searchInput.addEventListener('input', function() {
    const query = searchInput.value.toLowerCase();
    productCards.forEach(card => {
        const productName = card.querySelector('h3').textContent.toLowerCase();
        if (productName.includes(query)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// Xử lý thêm sản phẩm vào giỏ
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const notification = document.getElementById('notification');
const cart = document.getElementById('cart');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

let cartData = [];

addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        const product = {
            name: button.getAttribute('data-product'),
            price: parseInt(button.getAttribute('data-price'))
        };

        // Thêm sản phẩm vào giỏ hàng
        cartData.push(product);
        updateCart();
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 2000);
    });
});

// Cập nhật giỏ hàng
function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;

    cartData.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.price.toLocaleString()} VNĐ`;
        cartItems.appendChild(li);
        total += item.price;
    });

    cartTotal.textContent = `Tổng tiền: ${total.toLocaleString()} VNĐ`;

    if (cartData.length > 0) {
        cart.style.display = 'block';
    } else {
        cart.style.display = 'none';
    }
}

// Modal đăng nhập và đăng ký
const loginModal = document.getElementById('login-modal');
const registerModal = document.getElementById('register-modal');
const closeLoginModal = document.getElementById('close-login');
const closeRegisterModal = document.getElementById('close-register');
const openRegisterLink = document.getElementById('open-register');
const openLoginLink = document.getElementById('open-login');

// Sự kiện mở modal đăng nhập
document.getElementById('login-button').addEventListener('click', function() {
    loginModal.style.display = 'block';
});

// Sự kiện mở modal đăng ký
openRegisterLink.addEventListener('click', function() {
    loginModal.style.display = 'none';
    registerModal.style.display = 'block';
});

// Đóng modal đăng nhập
closeLoginModal.addEventListener('click', function() {
    loginModal.style.display = 'none';
});

// Sự kiện mở modal đăng nhập từ modal đăng ký
openLoginLink.addEventListener('click', function() {
    registerModal.style.display = 'none';
    loginModal.style.display = 'block';
});

// Đóng modal đăng ký
closeRegisterModal.addEventListener('click', function() {
    registerModal.style.display = 'none';
});

// Tạo tài khoản
// Tạo tài khoản
document.getElementById('register-button').addEventListener('click', function() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;

    if (password === confirmPassword) {
        if (username === 'admin' && password === 'thanhquan') {
            localStorage.setItem('username', 'admin');
            localStorage.setItem('password', 'thanhquan');
            alert('Tài khoản admin đã được tạo với mật khẩu mặc định: thanhquan');
        } else {
            // Lưu thông tin tài khoản vào localStorage
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            alert('Tạo tài khoản thành công');
        }
        registerModal.style.display = 'none';
    } else {
        alert('Mật khẩu không khớp');
    }
});


// Đăng nhập
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (username === storedUsername && password === storedPassword) {
        alert('Đăng nhập thành công');
        loginModal.style.display = 'none';
    } else {
        alert('Tên người dùng hoặc mật khẩu không đúng');
    }
});

// Lưu trạng thái đăng nhập (tuỳ chọn)
if (localStorage.getItem('username')) {
    alert('Chào mừng, ' + localStorage.getItem('username'));
}

// Chức năng thanh toán
const checkoutButton = document.getElementById('checkout');
checkoutButton.addEventListener('click', function() {
    if (cartData.length > 0) {
        alert('Thanh toán thành công! Cảm ơn bạn đã mua hàng.');
        cartData = [];
        updateCart();
    } else {
        alert('Giỏ hàng của bạn đang trống.');
    }
});
// Sự kiện mở modal đăng ký
document.getElementById('open-register').addEventListener('click', function() {
    loginModal.style.display = 'none';
    registerModal.style.display = 'block';
});
