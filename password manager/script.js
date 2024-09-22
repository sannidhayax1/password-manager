// Get the form and password list elements
const form = document.getElementById('add-password-form');
const passwordList = document.getElementById('password-list');

// Initialize an empty array to store passwords
let passwords = [];

// Function to add a new password
function addPassword(website, username, password) {
    const newPassword = {
        website,
        username,
        password
    };
    passwords.push(newPassword);
    localStorage.setItem('passwords', JSON.stringify(passwords));
    renderPasswordList();
}

// Function to render the password list
function renderPasswordList() {
    passwordList.innerHTML = '';
    passwords.forEach((password, index) => {
        const passwordItem = document.createElement('div');
        passwordItem.classList.add('password-item');
        passwordItem.innerHTML = `
            <p>Website: ${password.website}</p>
            <p>Username: ${password.username}</p>
            <p>Password: ${password.password}</p>
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        passwordList.appendChild(passwordItem);
    });
}

// Event listener for the add password form
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const website = document.getElementById('website').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    addPassword(website, username, password);
});

// Event listener for the delete buttons
passwordList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const index = e.target.dataset.index;
        passwords.splice(index, 1);
        localStorage.setItem('passwords', JSON.stringify(passwords));
        renderPasswordList();
    }
});

// Load passwords from local storage
if (localStorage.getItem('passwords')) {
    passwords = JSON.parse(localStorage.getItem('passwords'));
    renderPasswordList();
}