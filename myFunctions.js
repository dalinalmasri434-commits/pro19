$(document).ready(function () {
    $('.detail-check').on('change', function () {
        var targetId = $(this).data('target');
        $('#' + targetId).toggleClass('hidden');
    });

    $('#continueButton').on('click', function () {
        if ($('input[name="mealSelect[]"]:checked').length === 0) {
            return alert('الرجاء اختيار وجبة واحدة على الأقل');
        }
        $('#formContainer').removeClass('hidden');
        $('html, body').animate({
            scrollTop: $("#formContainer").offset().top
        }, 500);
    });
    $('#orderForm').on('submit', function (e) {
        e.preventDefault();
        var name = $('#fullName').val().trim();
        var nationalID = $('#bankAccount').val().trim();
        var mobile = $('#mobile').val().trim();
        var date = $('#orderDate').val();
        if (!/^\d{11}$/.test(nationalID)) {
            return alert('الرقم الوطني يجب أن يتكون من 11 رقماً بالضبط');
        }
        if (!/^[\u0600-\u06FF]+(?: [\u0600-\u06FF]+)*$/.test(name)) {
            return alert('الاسم يجب أن يكون باللغة العربية');
        }
        var selectedMeal = $('input[name="mealSelect[]"]:checked');
        var mealName = selectedMeal.val();
        var originalPrice = parseInt(selectedMeal.data('price'));
        var tax = originalPrice * 0.10;     
        var discount = originalPrice * 0.05; 
        var finalTotal = originalPrice + tax - discount;
        var formattedDate = date ? date : "لم يحدد";
        alert(
            'تم استلام طلبك بنجاح \n' + 'التاريخ: ' + formattedDate + '\n' + 'الاسم:' + name + '\n' +
            'الوجبة: ' + mealName + '\n' + 'الضريبة (10%): +' + tax.toLocaleString() + ' ل.س\n' +
            'خصم (5%):' + discount.toLocaleString() + ' ل.س\n' + 'المبلغ الصافي للدفع: ' + finalTotal.toLocaleString() + ' ل.س\n'
        );
        this.reset();
        $('#formContainer').addClass('hidden');
        $('input[name="mealSelect[]"]').prop('checked', false);
        $('.detail-check').prop('checked', false);
        $('tr[id^="detail"]').addClass('hidden');
    });
});