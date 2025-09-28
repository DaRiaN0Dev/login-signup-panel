// نمایش پیام toast
function showToast(message, type = "info", duration = 3000) {
  let toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => {
      toast.remove();
    }, 500);
  }, duration);
}

// تغییر فرم فعال
function showForm(formName) {
  document.querySelectorAll('.form').forEach(f => f.classList.remove('active'));
  document.getElementById(formName + 'Form').classList.add('active');
}

// هندل کردن ورود
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = this.email.value;
  const password = this.password.value;

  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.email === email && user.password === password) {
    showToast("ورود موفق!", "success");
    setTimeout(() => window.location.href = "profile.html", 1000);
  } else {
    showToast("ایمیل یا رمز عبور اشتباه است. ابتدا ثبت‌نام کنید.", "error");
  }
});

// ثبت‌نام
document.getElementById('signupForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = this.name.value;
  const email = this.email.value;
  const password = this.password.value;
  const phone = this.phone.value;

  if(password.length < 6){
    showToast("رمز عبور باید حداقل ۶ کاراکتر باشد.", "warning");
    return;
  }

  const userData = { name, email, password, phone };
  localStorage.setItem('user', JSON.stringify(userData));

  showToast("ثبت‌نام موفق! اکنون می‌توانید وارد شوید.", "success");
  showForm('login');
});

// فراموشی رمز عبور
document.getElementById('forgotForm').addEventListener('submit', function(e) {
  e.preventDefault();
  showToast("لینک بازیابی به ایمیل شما ارسال شد (دمو).", "info");
  showForm('login');
});
