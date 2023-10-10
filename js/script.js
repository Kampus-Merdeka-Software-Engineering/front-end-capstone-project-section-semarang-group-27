// add content in navbar mobile device (for responsive design)
const menuToggle = document.querySelector('.menu-toggle input')
const nav = document.querySelector('nav ul')
menuToggle.addEventListener('click', function () {
  nav.classList.toggle('slide')
})

// Declaration of baseURL API & baseURL for FrontEnd
const baseURL = 'https://be-semarang-27-production.up.railway.app'
const baseFEUrl =
  'https://kampus-merdeka-software-engineering.github.io/FE-Semarang-27'

// Perform specific line of code for each file
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
  // Initialize the speciality param and key for each page of schedules
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

  // Declare variables needed for store the data from fetch
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

  // Fetch Doctors Data based on Speciality / Schedule Pages Opened
  const urlDokter = baseURL + '/doctors/' + speciality
  fetch(urlDokter)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then(data => {
      // Get Every Doctor's ID from specific speciality and store it to an Array
      arrayDokter = data[`${specialityKey}`]
      arrayDokter.forEach(function (doctor) {
        doctorIDs.push(doctor['doctor_id'])
      })

      // Create element for each Doctor's ID
      doctorIDs.forEach(function (id) {
        // Create Element for Doctor's Detail
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

        // Fetch the Doctor's Schedule of Practic
        const urlJadwal = baseURL + '/doctors/schedule/' + id
        fetch(urlJadwal)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok')
            }
            return response.json()
          })
          .then(data => {
            // Store the retrieved data to an object
            doctorData = {
              doctor_name: data.doctor_name,
              doctor_image: data.doctor_image,
              days: data.day,
              sessions: data.session
            }

            // Connect and Fill the Text Content for every element with the retrieved data
            doctorBox.className = `details-area doctorBox`
            container.appendChild(doctorBox)

            doctorArea.className = 'doctor-area'
            doctorBox.appendChild(doctorArea)

            // Add interactivity to the element
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

            // Get current date as a beginning of list of option
            const currentDate = new Date()

            const daysOfWeek = [
              'Sunday',
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday'
            ]

            // Match the day and date for the options
            for (const dayOfWeekString of doctorData.days) {
              const dayIndex = daysOfWeek.indexOf(dayOfWeekString)

              if (dayIndex !== -1) {
                const dayDate = new Date(currentDate)
                const daysToAdd = (dayIndex - currentDate.getDay() + 7) % 7
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
              const dayIndex = daysOfWeek.indexOf(dayOfWeekString)

              if (dayIndex !== -1) {
                const dayDate = new Date(currentDate)
                const daysToAdd = (dayIndex - currentDate.getDay() + 7) % 7
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

            // Create the time area (session option)
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

            // Add interactivity to the elements
            applyInteractivity()
          })
          .catch(err => {
            console.error('There was a problem with the fetch operation:', err)
          })
      })
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error)
    })

  // Function that add interactivity to certain elements
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

    // Add Interactivity to the Submit Button
    const submitButton = document.querySelectorAll("button[type='submit']")
    submitButton.forEach(function (button) {
      button.addEventListener('click', function (event) {
        event.preventDefault()
        const selectedTimeBox = document.getElementById('res-time')
        const selectedDateBox = document.getElementById('res-date')

        // Date Box Option Validation
        if (selectedDateBox.textContent === 'None') {
          alert('Silahkan pilih tanggal konsultasi')
        } else {
          // Session Box Option Validation
          if (selectedTimeBox.textContent === 'None') {
            alert('Silahkan pilih sesi konsultasi')
          } else {
            // Make a session to store booking details
            sessionStorage.setItem('data', JSON.stringify(bookingSessionData))
            console.log(JSON.stringify(bookingSessionData))

            // Redirect to another page when both date and time are selected
            window.location.href = 'patient-form.html'
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

    // Store the value from the form to an Object
    var patientData = {
      patient_name: fullName,
      email: email,
      gender: gender,
      date_of_birth: dateOfBirth
    }

    // Define the server endpoint to send the POST request for the Patient Data
    const patientFormUrl = baseURL + '/patient-form'

    // Send the POST request with the form data that has been stored to the Object
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
        // If the Patient Data is successfully stored in, continue to POST the Booking Details from Session
        const appointmentBookUrl = baseURL + '/book'

        // Get the booking details from session and store it to a variable
        const sessionData = JSON.parse(sessionStorage.getItem('data'))

        // Define the booking data object
        var bookData = {
          patient_name: fullName,
          doctor_name: sessionData['doctor_name'],
          begin_hour: sessionData['begin_hour'],
          finish_hour: sessionData['finish_hour'],
          booking_date: sessionData['booking_date'],
          day: sessionData['day'],
          reason: reasonForVisit
        }

        // Send the POST request with the form data that has been stored to the Object
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
            // Store the successfull appointment_id to the session for receipt page
            var appointmentID = data.appointment_id
            sessionStorage.setItem(
              'appointment_id',
              JSON.stringify(appointmentID)
            )

            // Redirect to Receipt Page
            window.location.href = 'receipt.html'
          })
          .catch(error => {
            console.error(
              'There was a problem with the fetch operation:',
              error
            )
          })
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error)
      })
  })
} else if (window.location.href == baseFEUrl + '/receipt.html') {
  console.log('Receipt Page')
  document.addEventListener('DOMContentLoaded', function () {
    loadContent()
  })

  function loadContent () {
    const appointment_id = JSON.parse(sessionStorage.getItem('appointment_id'))
    const endpoint = `${baseURL}/receipt_detail/${appointment_id}`

    // Send the GET request to retrieve a data with specific appointment_id
    fetch(endpoint)
      .then(result => result.json())
      .then(data => {
        // Get The HTML Element to store the data to the page
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

        // Adding elements to the page with the data retrieved
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

  // Function to format the date from sql
  function formatDateToDDMMYYYY (dateString) {
    const inputDate = new Date(dateString)
    const day = String(inputDate.getUTCDate()).padStart(2, '0')
    const month = String(inputDate.getUTCMonth() + 1).padStart(2, '0')
    const year = String(inputDate.getUTCFullYear())
    return `${day}-${month}-${year}`
  }

  // Function to generate the PDF
  function generatePDF () {
    const element = document.getElementById('invoice')

    html2pdf().from(element).save()
  }
} else if (window.location.href == '/about.html') {
  console.log('About Page')
}
