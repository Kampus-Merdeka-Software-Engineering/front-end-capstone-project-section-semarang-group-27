// add content in navbar mobile device
const menuToggle = document.querySelector('.menu-toggle input');
const nav = document.querySelector('nav ul');

menuToggle.addEventListener('click', function () {
  nav.classList.toggle('slide');
});

// start schedule page
let boxes = document.querySelectorAll('.category-box');
let selectedCategory = document.getElementById('res-cat');
boxes.forEach(function (box) {
  box.addEventListener('click', function () {
    // Add "selected" class to the clicked category box
    if (box.classList.contains('selected')) {
      box.classList.remove('selected');
      selectedCategory.textContent = 'None';
    } else {
      boxes.forEach(function (el) {
        // Remove "selected" class from all category boxes
        el.classList.remove('selected');
      });
      box.classList.add('selected');
      selectedCategory.textContent = box.querySelector('p').textContent;
    }
  });
});

let dates = document.querySelectorAll('.date-box');
let selectedDates = document.getElementById('res-date');
dates.forEach(function (date) {
  date.addEventListener('click', function () {
    // Add "selected" class to the clicked date box
    if (date.classList.contains('selected')) {
      date.classList.remove('selected');
      selectedDates.textContent = 'None';
    } else {
      // Remove "selected" class from all dates boxes
      dates.forEach(function (el) {
        el.classList.remove('selected');
      });
      date.classList.add('selected');
      selectedDates.textContent = date.querySelector('p').textContent;
    }
  });
});

let times = document.querySelectorAll('.time-box');
let selectedTime = document.getElementById('res-time');
times.forEach(function (time) {
  time.addEventListener('click', function () {
    // Add "selected" class to the clicked time box
    if (time.classList.contains('selected')) {
      time.classList.remove('selected');
      selectedTime.textContent = 'None';
    } else {
      // Remove "selected" class from all dates boxes
      times.forEach(function (el) {
        el.classList.remove('selected');
      });
      time.classList.add('selected');
      selectedTime.textContent = time.querySelector('p').textContent;
    }
  });
});

let selectedDoctor = document.getElementById('res-doc');
selectedDoctor.textContent = document.querySelector('.doctorsName').textContent;
// end schedule page

// add js validation for schedule page

// Dapatkan elemen tombol submit
const submitButton = document.querySelector("button[type='submit']");

// Tambahkan event listener pada tombol submit
submitButton.addEventListener('click', function (event) {
  // Validasi category box
  const selectedCategoryBox = document.querySelector('.category-box.selected');
  if (selectedCategoryBox === null) {
    // Category box tidak dipilih
    event.preventDefault();
    alert('Silahkan pilih kategori dokter');
  }

  // Validasi date box
  const selectedDateBox = document.querySelector('.date-box.selected');
  if (selectedDateBox === null) {
    // Date box tidak dipilih
    event.preventDefault();
    alert('Silahkan pilih tanggal konsultasi');
  }

  // Validasi time box
  const selectedTimeBox = document.querySelector('.time-box.selected');
  if (selectedTimeBox === null) {
    // Time box tidak dipilih
    event.preventDefault();
    alert('Silahkan pilih sesi konsultasi');
  }
});

// end validation code

// start patient-form page//
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
//end patient-form page//

//start result page//
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
//end receipt page//
