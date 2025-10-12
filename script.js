// ---------- SIGN UP ----------
// ---------- SIGN UP ----------
function signup(event) {
    event.preventDefault();

    let firstName = document.getElementById("firstName").value;
    let middleName = document.getElementById("middleName").value;
    let email = document.getElementById("email").value;
    let pass = document.getElementById("newPass").value;
    let birthday = document.getElementById("birthday").value;
    let country = document.getElementById("country").value;
    let gender = document.querySelector('input[name="gender"]:checked');
    let level = document.querySelector('input[name="level"]:checked');
    let message = document.getElementById("signupMessage");

    if (!gender || !level) {
        message.style.color = "red";
        message.textContent = "Please select gender and level.";
        return;
    }

    let userInfo = {
        firstName,
        middleName,
        email,
        password: pass,
        gender: gender.value,
        birthday,
        country,
        level: level.value
    };

    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    message.style.color = "green";
    message.textContent = "Account created successfully! Redirecting...";

    setTimeout(() => {
        window.location.href = "login.html";
    }, 1500);
}


// ---------- LOGIN ----------
function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;
    let message = document.getElementById("message");

    let savedUser = localStorage.getItem("username");
    let savedPass = localStorage.getItem("password");

    if ((user === savedUser && pass === savedPass) || (user === "admin" && pass === "1234")) {
        message.style.color = "green";
        message.textContent = "Login successful!";
        setTimeout(() => {
            window.location.href = "update.html";
        }, 1000);
    } else {
        message.style.color = "red";
        message.textContent = "Invalid username or password!";
    }
}

// ---------- MATERIAL MANAGEMENT ----------
let materials = ["Frontend PDF", "Backend PDF", "Fullstack PDF"];

function showMaterials() {
    const list = document.getElementById("materials-list");
    if (!list) return; // Prevents errors on pages without this section
    list.innerHTML = "";
    materials.forEach((m, index) => {
        list.innerHTML += `<p>${m} <button onclick="deleteMaterial(${index})">Delete</button></p>`;
    });
}

function addMaterial() {
    const newMat = document.getElementById("newMaterial").value;
    if (newMat) {
        materials.push(newMat);
        document.getElementById("newMaterial").value = "";
        showMaterials();
    }
}

function deleteMaterial(index) {
    materials.splice(index, 1);
    showMaterials();
}

if (document.title.includes("Update")) {
    showMaterials();
}
// ---------- SOCIAL LOGIN DEMO ----------
function socialLogin(platform) {
    alert(`You clicked "Login with ${platform}" — this feature will be added when backend is connected!`);
}
// ---------- TOGGLE MATERIALS LIST ----------
const showBtn = document.getElementById('show-materials');
const materialsList = document.getElementById('materials-list');

if (showBtn) {
    showBtn.addEventListener('click', () => {
        materialsList.classList.toggle('hidden');
        showBtn.textContent = materialsList.classList.contains('hidden') ?
            '📚 View Materials' :
            '📘 Hide Materials';
    });
}
// ---------- UPDATE PAGE FUNCTIONALITY ----------
const addBtn = document.getElementById('addBtn');
const itemList = document.getElementById('itemList');

if (addBtn) {
    // Load saved items
    let items = JSON.parse(localStorage.getItem('csItems')) || [];
    renderItems();

    addBtn.addEventListener('click', () => {
        const type = document.getElementById('type').value;
        const title = document.getElementById('title').value.trim();
        const category = document.getElementById('category').value;
        const link = document.getElementById('link').value.trim();

        if (!title) {
            alert('Please enter a title!');
            return;
        }

        const newItem = { id: Date.now(), type, title, category, link };
        items.push(newItem);
        localStorage.setItem('csItems', JSON.stringify(items));

        renderItems();
        document.getElementById('title').value = '';
        document.getElementById('link').value = '';
    });

    // Render list
    function renderItems() {
        itemList.innerHTML = '';
        items.forEach((item) => {
                    const li = document.createElement('li');
                    li.innerHTML = `
        <span>${item.type.toUpperCase()}: ${item.title} (${item.category})
        ${item.link ? `- <a href="${item.link}" target="_blank">Open</a>` : ''}</span>
        <button class="delete-btn" data-id="${item.id}">Delete</button>
      `;
      itemList.appendChild(li);
    });
  }

  // Delete item
  itemList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
      const id = parseInt(e.target.getAttribute('data-id'));
      items = items.filter((i) => i.id !== id);
      localStorage.setItem('csItems', JSON.stringify(items));
      renderItems();
    }
  });
}