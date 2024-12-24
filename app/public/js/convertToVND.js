
    // Lấy tham chiếu đến phần tử heading
    if(document.getElementsByClassName('productPrice')){
    const priceElements = document.getElementsByClassName('productPrice');
  // Lặp qua từng phần tử và chuyển đổi giá trị
    for (let i = 0; i < priceElements.length; i++) {
        const priceValue = priceElements[i].textContent;

        // Chuyển đổi giá trị và định dạng
        const formattedValue = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(priceValue));
        priceElements[i].textContent = formattedValue;
    }
}
