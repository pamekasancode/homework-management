// Code By Pamekasancode

const btnSetting = document.getElementById("btn-setting")
const settingClass = document.querySelector(".setting")
const sectionSetting = document.querySelector(".section-setting")
const colors = document.querySelectorAll(".color")
const formSetting = document.getElementById("form-setting")
const nameInput = document.getElementById("name")
var theme = JSON.parse(localStorage.getItem("settingan")).tema 
var tema = ""

btnSetting.addEventListener("click", openSetting)


function Theme() {
    document.documentElement.setAttribute("data-theme", theme);
}

Theme()

function openSetting() {
    settingClass.style.display = "block"
    sectionSetting.style.display = "block"
    document.body.style.overflowY = "hidden"
    nameInput.value = JSON.parse(localStorage.getItem("settingan")).nama
    selectionColor()
    formSetting.addEventListener("submit", Save)
    sectionSetting.addEventListener("click", closeSetting)
}

function Save(e) {
    e.preventDefault()
    let nama = nameInput.value
    if(nama.length < 4) {
        alert("Nama minimal 4 karakter")
        return
    } else if(nama.length > 8) {
        alert("Nama maximal 8 karakter")
        return
    }
    
    settingan = {
        "nama": nama,
        "tema": tema
    }

    localStorage.setItem("settingan", JSON.stringify(settingan))
    closeSetting()
    userEl.innerText = "Selamat Datang "+JSON.parse(localStorage.getItem("settingan")).nama
    document.documentElement.setAttribute("data-theme", tema);
}

function closeSetting() {
    settingClass.style.display = "none"
    sectionSetting.style.display = "none"
    document.body.style.overflowY = "scroll"
    Theme()
}

function selectionColor() {
    colors.forEach(color => {
        color.addEventListener("click", function() {
            tema = this.dataset.color
            document.documentElement.setAttribute("data-theme", tema);
        })
    })
}