// start page-3//
document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');
  const message = document.getElementById('message');

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const fullname = document.getElementById('fullname').value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const birth = document.getElementById('birth').value;
    const reason = document.getElementById('reason').value;
    const confirm_1 = document.getElementById('confirm').checked;
    const confirm_2 = document.getElementById('consent').checked;

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

    if (confirm_1 == true) {
      message.textContent = 'Register gagal. syarat & ketentuan harus dicentang.';
      return;
    }

    if (confirm_2 == true) {
      message.textContent = 'Register gagal. syarat & ketentuan harus dicentang.';
      return;
    }

    message.textContent = 'Register berhasil';
    message.style.color = 'green';
  });
});
//end of page-3//

//start page-4//
document.addEventListener('DOMContentLoaded', function () {
  loadContent();
});

function loadContent() {
  var xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://jsonplaceholder.typicode.com/users/', true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var users = JSON.parse(xhr.responseText);
      var rightColumn = document.querySelector('.right-column');
      var user = users[0];

      rightColumn.innerHTML = `
              <p>${user.name}</p> </br>
              <p>${user.username}</p> </br>
              <p>${user.email}</p> </br>
              <p>${user.phone}</p> </br>
              <p>${user.website}</p> </br>
              <p>${user.company.name}</p> </br>
          `;
    }
  };
  xhr.send();
}

function generatePDF() {
  const element = document.getElementById('invoice');

  html2pdf().from(element).save();
}
//end of page-4//

// add content in navbar mobile device
const menuToggle = document.querySelector('.menu-toggle input');
const nav = document.querySelector('nav ul');

menuToggle.addEventListener('click', function () {
  nav.classList.toggle('slide');
});
