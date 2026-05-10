function toggle(id) {
  var row = document.getElementById(id);
  if (row.style.display === "none") {
    row.style.display = "table-row";
  } else {
    row.style.display = "none";
  }
}

function showForm() {
  document.getElementById("myForm").style.display = "block";
}

function validateForm() {
  var name = document.getElementById("fullName").value;
  var national = document.getElementById("nationalId").value;
  var birth = document.getElementById("birthDate").value;
  var phone = document.getElementById("mobilePhone").value;
  var email = document.getElementById("email").value;

  if (national === "") {
    alert("الرقم الوطني مطلوب");
    return false;
  }
  
  if (!/^\d{11}$/.test(national)) {
    alert("الرقم الوطني يجب أن يتكون من 11 رقماً");
    return false;
  }
  
  var govCode = parseInt(national.substring(0, 2), 10);
  if (govCode < 1 || govCode > 14) {
    alert("الخانتين إلى اليسار في الرقم الوطني يجب أن ترمزان إلى المحافظة (من 01 إلى 14)");
    return false;
  }

  if (name !== "" && !/^[\u0600-\u06FF\s]+$/.test(name)) {
    alert("الاسم يجب أن يكون بالأحرف الهجائية العربية فقط");
    return false;
  }

  if (birth !== "" && !/^\d{2}-\d{2}-\d{4}$/.test(birth)) {
    alert("تاريخ الولادة يجب أن يأخذ الشكل التالي dd-mm-yyyy");
    return false;
  }

  if (phone !== "" && !/^09[345689]\d{7}$/.test(phone)) {
    alert("رقم الموبايل يجب أن يطابق أرقام شبكتي Syriatel و MTN (يبدأ بـ 093, 094, 095, 096, 098, أو 099)");
    return false;
  }

  if (email !== "" && email.indexOf("@") === -1) {
    alert("البريد الإلكتروني غير صحيح");
    return false;
  }

  return true;
}

function calculateTotal() {
  var rows = document.querySelectorAll("tr.meal-row");
  var total = 0;
  var details = "";

  for (var i = 0; i < rows.length; i++) {
    var check = rows[i].querySelector("td:nth-child(5) input");
    if (check && check.checked) {
      var name = rows[i].children[1].innerText;
      var priceText = rows[i].children[2].innerText;
      var price = parseInt(priceText.replace(/[^0-9]/g, ""));
      total = total + price;
      details = details + name + " : " + price + " ل.س\n";
    }
  }

  if (total === 0) {
    alert("يرجى اختيار وجبة على الأقل");
    return false;
  }

  var discount = total * 0.05;
  var finalTotal = total - discount;
  
  var message = "معلومات الوجبات التي تم اختيارها:\n" + details + "\n";
  message += "المجموع: " + total + " ل.س\n";
  message += "حسم 5%: " + discount + " ل.س\n";
  message += "المبلغ النهائي للإجمالي: " + finalTotal + " ل.س";
  
  alert(message);
  return true;
}

function processOrder() {
  if (validateForm()) {
    calculateTotal();
  }
}