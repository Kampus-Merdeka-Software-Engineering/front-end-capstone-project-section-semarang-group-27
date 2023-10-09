// add content in navbar mobile device
const menuToggle = document.querySelector('.menu-toggle input')
const nav = document.querySelector('nav ul')

menuToggle.addEventListener('click', function () {
  nav.classList.toggle('slide')
})

const baseURL = 'https://be-semarang-27-production.up.railway.app'
const baseFEUrl = baseURL + '/FE-Semarang-27'
// var appointmentID = null

if (window.location.href == baseFEUrl + '/index.html') {
  console.log('Index')
} else if (
  window.location.href == baseFEUrl + '/schedule-general.html' ||
  window.location.href == baseFEUrl + '/schedule-pediatrician.html' ||
  window.location.href == baseFEUrl + '/schedule-ent.html' ||
  window.location.href == baseFEUrl + '/schedule-dentist.html' ||
  window.location.href == baseFEUrl + '/schedule-gynecology.html' ||
  window.location.href == baseFEUrl + '/schedule-cardiology.html'
) {
  if (window.location.href == baseFEUrl + '/schedule-general.html') {
    speciality = 'general'
    specialityKey = 'General Doctor'
  } else if (
    window.location.href ==
    baseFEUrl + '/schedule-pediatrician.html'
  ) {
    speciality = 'pediatrician'
    specialityKey = 'Pediatrician'
  } else if (window.location.href == baseFEUrl + '/schedule-ent.html') {
    speciality = 'ear'
    specialityKey = 'Ear Nose & Throat'
  } else if (window.location.href == baseFEUrl + '/schedule-dentist.html') {
    speciality = 'dentist'
    specialityKey = 'Dentist'
  } else if (window.location.href == baseFEUrl + '/schedule-gynecology.html') {
    speciality = 'gynecology'
    specialityKey = 'Gynecology'
  } else if (window.location.href == baseFEUrl + '/schedule-cardiology.html') {
    speciality = 'cardiology'
    specialityKey = 'Cardiology'
  }

  console.log('Schedules')
  const dataContainer = document.getElementById('data-container')
  dataContainer.style.fontSize = '24px'

  var doctorsData = []

  var bookingSessionData = {
    patient_name: null,
    doctor_name: null,
    begin_hour: null,
    finish_hour: null,
    booking_date: null,
    day: null,
    reason: null
  }

  var doctorData = {
    doctor_name: '',
    doctor_image: '',
    days: [],
    sessions: []
  }

  var arrayDokter = []
  const doctorIDs = []

  // console.log('fetch data')
  const urlDokter = baseURL + '/doctors/' + speciality
  fetch(urlDokter)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then(data => {
      arrayDokter = data[`${specialityKey}`]
      arrayDokter.forEach(function (doctor) {
        doctorIDs.push(doctor['doctor_id'])
      })

      // console.log('Sebelum masuk Doctor ID')
      doctorIDs.forEach(function (id) {
        // console.log('Create Element')
        const container = document.getElementById('doctorsDetail')
        const doctorBox = document.createElement('div')
        const doctorArea = document.createElement('div')
        const doctorImage = document.createElement('img')
        const doctorsName = document.createElement('p')
        const dateArea = document.createElement('div')
        const timeArea = document.createElement('div')
        const bookingButton = document.createElement('div')
        const bookingLink = document.createElement('a')
        const bookingBtn = document.createElement('button')

        // console.log('Sebelum FETCH')
        const urlJadwal = baseURL + '/doctors/schedule/' + id
        fetch(urlJadwal)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok')
            }
            return response.json()
          })
          .then(data => {
            // console.log(data)
            doctorData = {
              doctor_name: data.doctor_name,
              doctor_image: data.doctor_image,
              days: data.day,
              sessions: data.session
            }

            doctorBox.className = `details-area doctorBox` // Add any additional classes as needed
            container.appendChild(doctorBox)

            doctorArea.className = 'doctor-area'
            doctorBox.appendChild(doctorArea)
            applyInteractivity()

            doctorImage.className = 'doctorsImage'
            doctorImage.src = `assets/img/` + doctorData.doctor_image
            doctorImage.alt = `${doctorData.doctor_name}`
            doctorArea.appendChild(doctorImage)

            doctorsName.className = 'doctorsName'
            doctorsName.textContent = doctorData.doctor_name
            doctorArea.appendChild(doctorsName)

            dateArea.className = 'date-area'
            doctorBox.appendChild(dateArea)

            const currentDate = new Date()
            // const dateArea = document.getElementById('dateArea') // replace 'dateArea' with your actual element ID

            const daysOfWeek = [
              'Sunday',
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday'
            ]

            // Element for the first week
            for (const dayOfWeekString of doctorData.days) {
              // Find the index of the day of the week in the 'daysOfWeek' array
              const dayIndex = daysOfWeek.indexOf(dayOfWeekString)

              if (dayIndex !== -1) {
                const dayDate = new Date(currentDate)
                const daysToAdd = (dayIndex - currentDate.getDay() + 7) % 7 // Calculate days to add to match the specified day
                dayDate.setDate(currentDate.getDate() + daysToAdd)

                const currentDay = String(dayDate.getDate()).padStart(2, '0')
                const currentMonth = String(dayDate.getMonth() + 1).padStart(
                  2,
                  '0'
                )
                const currentYear = dayDate.getFullYear()

                const dateBox = document.createElement('div')
                dateBox.className = 'date-box'
                dateBox.id = doctorData.doctor_name
                dateBox.innerHTML = `<p>${dayOfWeekString}, ${currentDay}-${currentMonth}-${currentYear}</p>`
                dateArea.appendChild(dateBox)
              }
            }

            // Element for the second week
            for (const dayOfWeekString of doctorData.days) {
              // Find the index of the day of the week in the 'daysOfWeek' array
              const dayIndex = daysOfWeek.indexOf(dayOfWeekString)

              if (dayIndex !== -1) {
                const dayDate = new Date(currentDate)
                const daysToAdd = (dayIndex - currentDate.getDay() + 7) % 7 // Calculate days to add to match the specified day
                dayDate.setDate(currentDate.getDate() + daysToAdd)

                const currentDay = String(dayDate.getDate()).padStart(2, '0')
                const nextWeekDay = parseInt(currentDay) + 7 // To get the next week day
                const currentMonth = String(dayDate.getMonth() + 1).padStart(
                  2,
                  '0'
                )
                const currentYear = dayDate.getFullYear()

                const dateBox = document.createElement('div')
                dateBox.className = 'date-box'
                dateBox.innerHTML = `<p>${dayOfWeekString}, ${nextWeekDay}-${currentMonth}-${currentYear}</p>`
                dateBox.id = doctorData.doctor_name
                dateArea.appendChild(dateBox)
              }
            }

            // Create the time area
            timeArea.className = 'time-area'
            doctorBox.appendChild(timeArea)

            for (const time of doctorData.sessions) {
              const timeBox = document.createElement('div')
              timeBox.className = 'time-box'
              timeBox.innerHTML = `<p>${
                time['begin_hour'].toString() +
                ':00 - ' +
                time['finish_hour'].toString() +
                ':00'
              }</p>`
              timeArea.appendChild(timeBox)
            }

            // Create the booking button
            bookingButton.className = 'bookingButton'
            timeArea.appendChild(bookingButton)

            bookingLink.href = 'patient-form.html'

            bookingBtn.type = 'submit'
            bookingBtn.textContent = 'Make Appointment'

            bookingLink.appendChild(bookingBtn)
            bookingButton.appendChild(bookingLink)

            applyInteractivity()
            // console.log('Add Interactivity')
            // end schedule page
          })
          .catch(err => {
            console.error('There was a problem with the fetch operation:', err)
          })
      })
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error)
    })

  async function applyInteractivity () {
    // Add interactivity for date boxes
    const dates = document.querySelectorAll('.date-box')
    const selectedDates = document.getElementById('res-date')
    const selectedDay = document.getElementById('res-day')
    dates.forEach(function (date) {
      date.addEventListener('click', function (event) {
        const clickedDate = event.currentTarget

        if (clickedDate.classList.contains('selected')) {
          clickedDate.classList.remove('selected')
          selectedDates.textContent = 'None'
        } else {
          dates.forEach(function (el) {
            el.classList.remove('selected')
          })

          clickedDate.classList.add('selected')

          var day = clickedDate
            .querySelector('p')
            .textContent.substring(
              0,
              clickedDate.querySelector('p').textContent.indexOf(',')
            )

          var substringDate = clickedDate
            .querySelector('p')
            .textContent.replace(day + ', ', '')
          var reverseDate = substringDate.split('-').reverse().join('-')

          selectedDay.textContent = day
          bookingSessionData.day = day

          selectedDates.textContent = reverseDate
          bookingSessionData.booking_date = reverseDate

          // Add interactivity for selectedDoctor
          const selectedDoctor = document.getElementById('res-doc')
          selectedDoctor.textContent = clickedDate.id
          bookingSessionData.doctor_name = clickedDate.id
        }
      })
    })

    // Add interactivity for time boxes
    const times = document.querySelectorAll('.time-box')
    const selectedTime = document.getElementById('res-time')

    times.forEach(function (time) {
      time.addEventListener('click', function (event) {
        const clickedTime = event.currentTarget

        if (clickedTime.classList.contains('selected')) {
          clickedTime.classList.remove('selected')
          selectedTime.textContent = 'None'
        } else {
          times.forEach(function (el) {
            el.classList.remove('selected')
          })

          clickedTime.classList.add('selected')
          selectedTime.textContent = clickedTime.querySelector('p').textContent

          const timeRange = selectedTime.textContent
          const [startTime, endTime] = timeRange.split(' - ')

          // Remove ":00" from start and end times
          const formattedStartTime = startTime.replace(':00', '')
          const formattedEndTime = endTime.replace(':00', '')
          bookingSessionData.begin_hour = parseInt(formattedStartTime)
          bookingSessionData.finish_hour = parseInt(formattedEndTime)
        }
      })
    })

    // Dapatkan elemen tombol submit
    // Tambahkan event listener pada tombol submit
    const submitButton = document.querySelectorAll("button[type='submit']")
    submitButton.forEach(function (button) {
      button.addEventListener('click', function (event) {
        event.preventDefault()
        const selectedTimeBox = document.getElementById('res-time')
        const selectedDateBox = document.getElementById('res-date')

        // Validasi date box
        if (selectedDateBox.textContent === 'None') {
          // Date box tidak dipilih
          alert('Silahkan pilih tanggal konsultasi')
        } else {
          // Validasi time box
          if (selectedTimeBox.textContent === 'None') {
            // Time box tidak dipilih
            alert('Silahkan pilih sesi konsultasi')
          } else {
            // Make session to store booking details
            sessionStorage.setItem('data', JSON.stringify(bookingSessionData))
            console.log(JSON.stringify(bookingSessionData))

            // Redirect to another page when both date and time are selected
            window.location.href = 'patient-form.html' // Replace with the desired URL
          }
        }
      })
    })
  }
} else if (window.location.href == baseFEUrl + '/patient-form.html') {
  // Get the form element
  const form = document.querySelector('form')

  // Add an event listener to the form submission
  form.addEventListener('submit', function (event) {
    event.preventDefault() // Prevent the form from submitting normally

    // Get input values
    const fullName = document.querySelector('#inputName').value
    const email = document.querySelector('#inputEmail').value
    const gender = document.querySelector('input[name="gender"]:checked').value
    const dateOfBirth = document.querySelector('#inputDOB').value
    const reasonForVisit = document.querySelector('#inputReason').value
    const confirm = document.querySelector('#confirm').checked
    const consent = document.querySelector('#consent').checked

    // Output the retrieved values to the console (you can replace this with your desired logic)
    console.log('Full Name:', fullName)
    console.log('Email:', email)
    console.log('Gender:', gender)
    console.log('Date of Birth:', dateOfBirth)
    console.log('Reason for Visit:', reasonForVisit)
    console.log('Confirm:', confirm)
    console.log('Consent:', consent)

    // Perform any other actions you need with the retrieved values here
    var patientData = {
      patient_name: fullName,
      email: email,
      gender: gender,
      date_of_birth: dateOfBirth
    }

    // Define the server endpoint where you want to send the POST request
    const patientFormUrl = baseURL + '/patient-form' // Replace with your actual API endpoint

    // Send the POST request with the form data
    fetch(patientFormUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(patientData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then(data => {
        // Handle the response from the server (if needed)
        console.log('Response from server:', data)

        const appointmentBookUrl = baseURL + '/book' // Replace with your actual API endpoint
        const sessionData = JSON.parse(sessionStorage.getItem('data'))

        var bookData = {
          patient_name: fullName,
          doctor_name: sessionData['doctor_name'],
          begin_hour: sessionData['begin_hour'],
          finish_hour: sessionData['finish_hour'],
          booking_date: sessionData['booking_date'],
          day: sessionData['day'],
          reason: reasonForVisit
        }

        fetch(appointmentBookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(bookData)
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok')
            }
            return response.json()
          })
          .then(data => {
            // Handle the response from the server (if needed)
            console.log('Response from server:', data)
            appointmentID = data.appointment_id
            console.log(appointmentID)
            sessionStorage.setItem(
              'appointment_id',
              JSON.stringify(appointmentID)
            )

            // Optionally, you can redirect to another page (e.g., a receipt page) after a successful submission
            window.location.href = 'receipt.html'
          })
          .catch(error => {
            console.error(
              'There was a problem with the fetch operation:',
              error
            )
            // Handle the error (e.g., display an error message to the user)
          })

        // Optionally, you can redirect to another page (e.g., a receipt page) after a successful submission
        // window.location.href = 'receipt.html/2'
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error)
        // Handle the error (e.g., display an error message to the user)
      })
  })
} else if (window.location.href == baseFEUrl + '/receipt.html') {
  console.log('Receipt Page')
  //start result page//
  document.addEventListener('DOMContentLoaded', function () {
    loadContent()
  })

  function loadContent () {
    const appointment_id = JSON.parse(sessionStorage.getItem('appointment_id'))
    const endpoint = `https://be-semarang-27-production.up.railway.app/receipt_detail/${appointment_id}`
    // Tampilkan data di front end

    fetch(endpoint)
      .then(result => result.json())
      .then(data => {
        const rightColumn = document.querySelector('.right-column')

        var gender = null
        if (data[0].gender === 0) {
          gender = 'Female'
        } else {
          gender = 'Male'
        }

        const d = new Date(data[0].booking_date)

        var day = d.getDay()
        const daysOfWeek = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ]

        rightColumn.innerHTML = `
        <p>${data[0].appointment_id}</p> </br>
        <p>${data[0].patient_name}</p> </br>
        <p>${data[0].email}</p> </br>
        <p>${gender}</p> </br>
        <p>${formatDateToDDMMYYYY(data[0].date_of_birth)}</p> </br>
        <p>${data[0].speciality_name}</p> </br>
        <p>${data[0].doctor_name}</p> </br>
        <p>${daysOfWeek[day]}, ${formatDateToDDMMYYYY(
          data[0].booking_date
        )}</p> </br>
        <p>${data[0].begin_hour}:00 - ${data[0].finish_hour}:00</p> </br>
        <p>${data[0].reason}</p> </br>
      `
      })
  }

  function formatDateToDDMMYYYY (dateString) {
    const inputDate = new Date(dateString)
    const day = String(inputDate.getUTCDate()).padStart(2, '0')
    const month = String(inputDate.getUTCMonth() + 1).padStart(2, '0')
    const year = String(inputDate.getUTCFullYear())
    return `${day}-${month}-${year}`
  }

  function generatePDF () {
    const element = document.getElementById('invoice')

    html2pdf().from(element).save()
  }
  //end receipt page//
} else if (window.location.href == '/about.html') {
  console.log('About Page')
}
