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