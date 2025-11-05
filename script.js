// Load data from localStorage
let donors = JSON.parse(localStorage.getItem('donors')) || [];
let schedules = JSON.parse(localStorage.getItem('schedules')) || [];

// Show sections
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.add('hidden'));
    document.getElementById(sectionId).classList.remove('hidden');
    if (sectionId === 'list') renderDonorList();
    if (sectionId === 'schedule') renderScheduleOptions();
    if (sectionId === 'admin') updateAdminStats();
}

// Register donor
document.getElementById('donorForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const donor = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        bloodType: document.getElementById('bloodType').value,
        lastDonation: document.getElementById('lastDonation').value
    };
    donors.push(donor);
    localStorage.setItem('donors', JSON.stringify(donors));
    alert('Donor registered successfully!');
    this.reset();
});

// Render donor list
function renderDonorList() {
    const tbody = document.querySelector('#donorTable tbody');
    tbody.innerHTML = '';
    donors.forEach(donor => {
        const row = `<tr>
            <td>${donor.name}</td>
            <td>${donor.email}</td>
            <td>${donor.phone}</td>
            <td>${donor.bloodType}</td>
            <td>${donor.lastDonation || 'N/A'}</td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

// Render schedule options
function renderScheduleOptions() {
    const select = document.getElementById('donorSelect');
    select.innerHTML = '<option value="">Select Donor</option>';
    donors.forEach((donor, index) => {
        select.innerHTML += `<option value="${index}">${donor.name}</option>`;
    });
    renderScheduleTable();
}

// Schedule donation
document.getElementById('scheduleForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const donorIndex = document.getElementById('donorSelect').value;
    const schedule = {
        donor: donors[donorIndex].name,
        date: document.getElementById('donationDate').value,
        location: document.getElementById('location').value
    };
    schedules.push(schedule);
    localStorage.setItem('schedules', JSON.stringify(schedules));
    alert('Donation scheduled successfully!');
    this.reset();
    renderScheduleTable();
});

// Render schedule table
function renderScheduleTable() {
    const tbody = document.querySelector('#scheduleTable tbody');
    tbody.innerHTML = '';
    schedules.forEach(schedule => {
        const row = `<tr>
            <td>${schedule.donor}</td>
            <td>${schedule.date}</td>
            <td>${schedule.location}</td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

// Update admin stats
function updateAdminStats() {
    document.getElementById('totalDonors').textContent = donors.length;
    document.getElementById('totalSchedules').textContent = schedules.length;
}

// Clear data
function clearData() {
    if (confirm('Are you sure? This will delete all data.')) {
        localStorage.clear();
        donors = [];
        schedules = [];
        alert('Data cleared!');
        updateAdminStats();
    }
}

// Initialize
showSection('register');