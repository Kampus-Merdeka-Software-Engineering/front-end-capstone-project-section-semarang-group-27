// klo mau coba buat js page 2 coba buat dlu aja han
document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');
  const message = document.getElementById('message');

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const fullname = document.getElementById('fullname').value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const birth = document.getElementById('birth').value;
    const reason = document.getElementById('reason').value;
    const confirm_1 = document.getElementById('confirm-1').checked;
    const confirm_2 = document.getElementById('confirm-2').checked;

    message.style.color = 'red';
    if (fullname == '') {
      message.textContent = 'Register gagal. fullname harus diisi.';
      return;
    }

    if (gender == null) {
      message.textContent = 'Register gagal. gender harus diisi.';
      return;
    }

    if (birth == '') {
      message.textContent = 'Register gagal. tanggal lahir harus diisi.';
      return;
    }

    if (reason == '') {
      message.textContent = 'Register gagal. alasan harus diisi.';
      return;
    }

    if (confirm_1 == false) {
      message.textContent = 'Register gagal. syarat & ketentuan harus dicentang.';
      return;
    }

    if (confirm_2 == false) {
      message.textContent = 'Register gagal. syarat & ketentuan harus dicentang.';
      return;
    }

    message.textContent = 'Register berhasil';
    message.style.color = 'green';
  });
});
