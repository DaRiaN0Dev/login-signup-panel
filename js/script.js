let isToastActive = false;

function showToast(message, type = "info", duration = 3000) {
  if (isToastActive) return;
  isToastActive = true;

  let toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => {
      toast.remove();
      isToastActive = false; 
    }, 500);
  }, duration);
}

function showForm(formName) {
  document.querySelectorAll('.form').forEach(f => f.classList.remove('active'));
  document.getElementById(formName + 'Form').classList.add('active');
}

const handleLogin = (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;

  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.email === email && user.password === password) {
    showToast("ورود موفق!", "success");
    setTimeout(() => window.location.href = "profile/index.html", 1000);
  } else {
    showToast("ایمیل یا رمز عبور اشتباه است. ابتدا ثبت‌نام کنید.", "error");
  }
};

const handleSignup = (e) => {
  e.preventDefault();
  const name = e.target.name.value;
  const email = e.target.email.value;
  const password = e.target.password.value;
  const phone = e.target.phone.value;

  if(password.length < 6){
    showToast("رمز عبور باید حداقل ۶ کاراکتر باشد.", "warning");
    return;
  }

  const userData = { name, email, password, phone };
  localStorage.setItem('user', JSON.stringify(userData));

  showToast("ثبت‌نام موفق! اکنون می‌توانید وارد شوید.", "success");
  showForm('login');
};

const handleForgot = (e) => {
  e.preventDefault();
  showToast("لینک بازیابی به ایمیل شما ارسال شد (دمو).", "info");
  showForm('login');
};

document.getElementById('loginForm').addEventListener('submit', handleLogin);
document.getElementById('signupForm').addEventListener('submit', handleSignup);
document.getElementById('forgotForm').addEventListener('submit', handleForgot);
