function searchFunction() {
    const input = document.getElementById('searchInput').value.toLowerCase().trim();
    const items = document.querySelectorAll('.item');

    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        
        if (text.includes(input)) {
            // أولاً نرجعه للـ display قبل ما نغير الـ opacity عشان يظهر
            item.style.display = "block";
            
            // نستخدم setTimeout بسيط عشان الـ transition يلحق يشتغل
            setTimeout(() => {
                item.classList.remove('hidden');
            }, 10);
        } else {
            item.classList.add('hidden');
            
            // بعد ما يخلص أنميشن الإخفاء، نشيله من المساحة تماماً
            setTimeout(() => {
                if (item.classList.contains('hidden')) {
                    item.style.display = "none";
                }
            }, 400); // نفس مدة الـ transition في الـ CSS
        }
    });
}

function changeImage(mainImageId, newSrc) {
    // العثور على الصورة الكبيرة عن طريق الـ ID الخاص بها
    const mainImg = document.getElementById(mainImageId);
    
    // إضافة تأثير اختفاء بسيط لجعل الانتقال ناعماً
    mainImg.style.opacity = '0.5';
    
    // تغيير مصدر الصورة
    setTimeout(() => {
        mainImg.src = newSrc;
        mainImg.style.opacity = '1';
    }, 150);
}
document.querySelector('.order-btn').addEventListener('click', function() {
    // الرابط الصحيح داخل علامات تنصيص
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzrxvwiLSDlvTxy-pBQ7j3zbJeVGf8NPb6qkz8HnPDX2Y_6vNgjfZ-Nu0PsMmNJX3bt6g/exec';

    const orderData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city-select').value,
        total: document.getElementById('final-total').innerText
    };

    if(!orderData.name || !orderData.phone) {
        alert("برجاء إدخال الاسم ورقم الهاتف");
        return;
    }

    const btn = document.querySelector('.order-btn');
    btn.innerText = "جاري الحفظ...";
    btn.disabled = true;

    // الإرسال بطريقة متوافقة مع المتصفحات
    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
    })
    .then(() => {
        alert("تم استلام طلبك بنجاح!");
        btn.innerText = "تأكيد طلب الأوردر";
        btn.disabled = false;
        // مسح الخانات بعد النجاح
        document.getElementById('name').value = "";
        document.getElementById('phone').value = "";
    })
    .catch(err => {
        console.error(err);
        alert("خطأ في الاتصال، تأكد من إعدادات الـ Deploy في جوجل");
        btn.disabled = false;
        btn.innerText = "تأكيد طلب الأوردر";
    });
});
