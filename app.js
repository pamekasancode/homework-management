// Code By Pamekasancode

var jadwals = JSON.parse(localStorage.getItem("homework")) || []

const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"]
const mainClass = document.querySelector(".main")
const headerClass = document.querySelector(".header")
const searchClass = document.querySelector(".search")
const modalStoreClass = document.getElementById("modal-store")
const sectionStore = document.getElementById("section-store")
const formStore = document.getElementById("form-store")
const modalEditClass = document.getElementById("modal-edit")
const sectionEdit = document.getElementById("section-edit")
const formEdit = document.getElementById("form-edit")
const btnAddModal = document.getElementById("add-modal")
const tenggatInput = document.getElementById("tenggat")
const prInput = document.getElementById("pr")
const tenggatInputEdit = document.getElementById("tenggat-edit")
const prInputEdit = document.getElementById("pr-edit")
const keywordInput = document.getElementById("keyword")
const preloader = document.querySelector(".preloader")
const btnPreloader = document.getElementById("btn-preloader")
const namePreloaderInput = document.getElementById("name-preloader")
const userEl = document.getElementById("user")

keywordInput.addEventListener("keyup", Search)

if(JSON.parse(localStorage.getItem("settingan"))) {
    closePreloader()
    userEl.innerText = "Selamat Datang "+JSON.parse(localStorage.getItem("settingan")).nama
}

btnPreloader.addEventListener("click", setName)

window.addEventListener("scroll", stickySearch)

function stickySearch() {
    searchClass.classList.toggle("fixed", scrollY > headerClass.scrollHeight)
}

function setName() {
    let nama = namePreloaderInput.value
    if(nama.length < 4) {
        alert("Nama minimal 4 karakter")
        return
    } else if(nama.length > 8) {
        alert("Nama maximal 8 karakter")
        return
    }

    settingan = {
        "nama": nama,
        "tema": "default"
    }

    localStorage.setItem("settingan", JSON.stringify(settingan))
    window.location.reload()    
    closePreloader()
    userEl.innerText = "Selamat Datang "+JSON.parse(localStorage.getItem("settingan")).nama
}

function closePreloader() {
    preloader.style.display = "none"
}

function Search() {
    let keyword = keywordInput.value.toLowerCase()
    let result = jadwals.filter(jadwal => {
        return(jadwal.pr.toLowerCase().match(keyword))
    })

    render(result)
}

function render(jadwals) {
    let template = ""
    jadwals.map((jadwal, index) => {
        template += `
        <div class="card">
            <div class="card-header">
                <div>
                    <h4>${jadwal.hari}</h4>
                </div>
                <div>
                    <i class="fa fa-pencil" id="edit-jadwal" data-id="${index}"></i>
                    <i class="fa fa-check" id="delete-jadwal" data-id="${index}"></i>
                </div>
            </div>
            <div class="card-content">
                <h4>${jadwal.pr}<h4>
                <p>Tenggat: ${jadwal.tenggat}</p>
            </div>  
        </div>`
    }) 

    mainClass.innerHTML = template

    const btnEditModal = document.querySelectorAll("#edit-jadwal")
    const btnDeleteJadwal = document.querySelectorAll("#delete-jadwal")

    btnEditModal.forEach(btnEdit => {
        btnEdit.addEventListener("click", openEditModal)
    })

    btnDeleteJadwal.forEach(btnDelete => {
        btnDelete.addEventListener("click", Delete)
    })

}

render(jadwals)

function Delete() {
    const id = this.dataset.id
    const deleteConfirm = confirm("Yakin untuk dihapus ?")
    if(deleteConfirm) {
        jadwals.splice(id, 1)
        saveData()
    }
}

function openEditModal() {
    const id = this.dataset.id

    modalEditClass.style.display = "block"
    sectionEdit.style.display = "block"
    document.body.style.overflowY = "hidden "

    tenggatInputEdit.value = jadwals[id].tenggat
    prInputEdit.value = jadwals[id].pr

    formEdit.addEventListener("submit", function() {
        Edit(event, id)
    })

    sectionEdit.addEventListener("click", closeEditModal)
}

function Edit(e, id) {
    e.preventDefault()
    let hari = days[new Date().getDay()]
    let tenggat = tenggatInputEdit.value.toLowerCase()
    let pr = prInputEdit.value
    if(pr.length < 4) {
        alert("Input Pr harus diisi minimal 4 karakter")
        return
    } 
    
    dataEdit = {
        "hari": hari,
        "tenggat": tenggat,
        "pr": pr
    }
    
    jadwals[id] = dataEdit
    saveData()
    closeEditModal()
}

function closeEditModal() {
    modalEditClass.style.display = "none"
    sectionEdit.style.display = "none"
    document.body.style.overflowY = "scroll"
}

btnAddModal.addEventListener("click", openAddModal)

function openAddModal() {
    modalStoreClass.style.display = "block"
    sectionStore.style.display = "block"
    document.body.style.overflowY = "hidden"
    sectionStore.addEventListener("click", closeAddModal)
    formStore.addEventListener("submit", Store)
}

function closeAddModal() {
    modalStoreClass.style.display = "none"
    sectionStore.style.display = "none"
    document.body.style.overflowY = "scroll"
}

function Store(e) {
    e.preventDefault()
    let hari = days[new Date().getDay()]
    let tenggat = tenggatInput.value.toLowerCase()
    let pr = prInput.value
    if(pr.length < 4) {
        alert("Input Pr harus diisi minimal 4 karakter")
        return
    } 
    
    dataStore = {
        "hari": hari,
        "tenggat": tenggat,
        "pr": pr
    }
    
    jadwals.push(dataStore)
    saveData()
    formStore.reset()
    closeAddModal()
}

function saveData() {
    localStorage.setItem("homework", JSON.stringify(jadwals))
    render(jadwals)
}