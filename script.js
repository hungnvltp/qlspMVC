class Model {
    constructor() {
        var Member = localStorage.getItem('Member') ? JSON.parse(localStorage.getItem('Member')) : [];

    }
    idSubmit() {
        let idName = document.getElementById('idName').value;
        let idNumber = document.getElementById('idNumber').value;
        let idPosition = document.getElementById('idPosition').value
        let idCompany = document.getElementById('idCompany').value;
        let idAge = document.getElementById('idAge').value;
        var Member = localStorage.getItem('Member') ? JSON.parse(localStorage.getItem('Member')) : [];
        Member.push({
            idName: idName,
            idNumber: idNumber,
            idPosition: idPosition,
            idAge: idAge,
            idCompany: idCompany
        });
        localStorage.setItem('Member', JSON.stringify(Member));
        this.callbackFromController();
    }
    bindTodoListChanged(callback) {
        this.callbackFromController = callback;
    }
    deleteTodo(id) {
        let Member = localStorage.getItem('Member') ? JSON.parse(localStorage.getItem('Member')) : [];
        Member.splice(id, 1);
        localStorage.setItem('Member', JSON.stringify(Member));
        this.callbackFromController();
    }
    editTodo(id, editedData) {
        alert("mày lấy chuyển liệu qua chưa");
        let Member = localStorage.getItem('Member') ? JSON.parse(localStorage.getItem('Member')) : [];
        Member[id] = editedData;
        localStorage.setItem('Member', JSON.stringify(Member));
        this.callbackFromController();
        alert("á đây rồi, tao chuyển rồi ");
    }
    searchTodo(value) {

        var Member = localStorage.getItem('Member') ? JSON.parse(localStorage.getItem('Member')) : [];
        if (value == '') {
            this.callbackFromController();
        } else {
            let result = Member.filter(Member => Member.idName.startsWith(value)
                || Member.idPosition.match(value)
                || Member.idNumber.includes(value)
                || Member.idCompany.includes(value)
                || Member.idAge.match(value));
            this.callbackFromController(result ?? []);

        }
    }
}
class View {
    constructor(id) {
        this.root = document.querySelector("#root");
        this.formDangNhap();
        this.anFormDN();
        this.formHienThi();
        this.renderListMember();
        this.addEvent();
    }

    addEvent() {
        document.getElementById("add").addEventListener("click", () => this.moFormDangNhap())
        document.getElementById("anh").addEventListener("click", () => this.closeAddForm())
    }
    formDangNhap() {
        this.root = document.querySelector('#root');
        this.formDN = document.createElement('div');
        this.formDN.innerHTML
            = ` <form>
         <div id="formLogIn" class="w3-container w3-card-4 w3-light-grey">
            <a href="#" ><img src="anhx.jpg" width="40px" height="40px" id="anh">
            </a>
            <div class="information">
                <a href="#">
                    <h4>Form</h4>
                </a>
            </div>

            <br>
            <div class="information">
                <label>Name</label>
            </div>
            <div class="information">
                <input class="forms" type="text" id="idName"></input>
                <span id="name_error" class="error"></span>
            </div>
            <div class="information">
                <label>Phone number</label>
            </div>
            <div class="information">
                <input class="forms" type="number" id="idNumber"></input>
                <span id="id_error" class="error"></span>
            </div>
            <div class="information">
                <label>Company</label>
            </div>
            <div class="information">
                <input class="forms" type="text" id="idCompany"></input>
                <span id="company_error" class="error"></span>
            </div>
            <div class="information">
                <label> Position</label>
            </div>
            <div class="information">
                <input class="forms" type="text" id="idPosition"></input>
                <span id="position_error" class="error"></span>
            </div>
            <div class="information">
                <label>Age</label>
            </div>
            <div class="information">
                <input class="forms" type="number" id="idAge"></input>
                <span id="age_error" class="error"></span>
            </div>

            <br>
            <div class="information">
                <button id="submit" >Submit</button>
                <button id="update">Update</button>
            </div> </form>
        `
        this.root.appendChild(this.formDN);
    }
    formHienThi() {
        this.root = document.querySelector('#root');
        this.formHT = document.createElement('div');

        this.formHT.innerHTML
            = `
          <div id="formShow">
            <div id="menu">
                <h3 id="tieuDe">Data List</h3>
                <a href="#" id="add"><button onclick="showInfo()" type="button" class="btn btn-primary mb-2">Add
                        New</button></a>
                <input type="text" id="timkiem" placeholder="Search...." name="search" onkeyup="search(this.value)">
                 </div>
            <div id="thongtin">
            <table id="idTable" cellpadding="25" border="0">
            </div>
         `
        this.root.appendChild(this.formHT);
    };
    renderListMember(data = null) {
        let Member = "";
        if (data == null) {
            Member = localStorage.getItem('Member') ? JSON.parse(localStorage.getItem('Member')) : [];
        } else {
            Member = data;
        }
        let tableContent = `<tr>
                            <td>Numerorder</td>
                            <td>Name</td>
                            <td>Phone Number</td>
                            <td>Company</td>
                            <td>Position </td>
                            <td>Age</td>
                            <td width="60px">Delete</td>
                            <td width="60px" >Edit</td>
                        </tr>`;
        Member.forEach((Member, index) => {
            let MemberId = index;
            tableContent += `<tr id="${index}">
                            <td>${index + 1}</td>
                            <td>${Member.idName}</td>
                            <td>${Member.idNumber}</td>
                            <td>${Member.idCompany}</td>
                            <td>${Member.idPosition}</td>
                            <td>${Member.idAge}</td>
                            <td>
                            <a href="#"class="delete">Delete</a> 
                            </td>
                             <td>
                            <a href="#" class="edit">Edit</a>
                            </td>
                        </tr>`;
        })
        document.getElementById("idTable").innerHTML = tableContent;
    }
    anFormDN() {
        document.getElementById('formLogIn').style.display = "none";
    }
    moFormDangNhap() {
        document.getElementById('formLogIn').style.display = "block";
        document.getElementById('submit').style.display = "block";
        document.getElementById('update').style.display = "none";
        document.getElementById('idName').value = "";
        document.getElementById('idNumber').value = "";
        document.getElementById('idPosition').value = "";
        document.getElementById('idAge').value = "";
        document.getElementById('idCompany').value = "";
    }
    closeAddForm() {
        document.getElementById('formLogIn').style.display = "none";
    }
    addRecord(handler) {
        this.formDN.addEventListener('submit', event => {
            console.log("nút submit");
            handler();
            document.getElementById('idName').value = "";
            document.getElementById('idNumber').value = "";
            document.getElementById('idPosition').value = "";
            document.getElementById('idAge').value = "";
            document.getElementById('idCompany').value = "";
        })
    }
    bindDeleteTodo(handler) {
        const bang = document.getElementById("formShow")
        bang.addEventListener('click', event => {
            if (event.target.className === 'delete') {
                const id = parseInt(event.target.parentElement.parentElement.id)
                handler(id)
                console.log("tao đang xóa");
            }
        })
    }
    bindEditTodo(handler) {
        const edits = document.getElementById("update")
        edits.addEventListener('click', event => {
            alert(this.editId); // truy xuất thuộc thính editId của class.
            // handler(this.editId) // đến đây thì chuyển id về cho controller để controller gửi vào model xử lý
            //HOẶC:
            // gửi cả form data lên controller để controller gửi vào model xử lý
            // bằng cách lấy hết giá trị ở đây thay vì lấy trong model:
            var editedData = {
                idName: document.getElementById('idName').value,
                idNumber: document.getElementById('idNumber').value,
                idPosition: document.getElementById('idPosition').value,
                idCompany: document.getElementById('idCompany').value,
                idAge: document.getElementById('idAge').value
            }
            handler(this.editId, editedData)
            // sau khi lấy đc các giá trị của form như ở trên
            // thì tạo một object
            // rồi gửi cả object đó vào controller bằng hanbler(object_vua_tạo)
            // }
            event.preventDefault()
            document.getElementById('idName').value = "";
            document.getElementById('idNumber').value = "";
            document.getElementById('idPosition').value = "";
            document.getElementById('idAge').value = "";
            document.getElementById('idCompany').value = "";
        })
    }
    showEditRecord() {
        const editss = document.getElementById("formShow")
        editss.addEventListener('click', event => {
            if (event.target.className === 'edit') {
                const id = parseInt(event.target.parentElement.parentElement.id)
                document.getElementById('submit').style.display = "none";
                document.getElementById('update').style.display = "block";
                document.getElementById('formLogIn').style.display = "block";
                var Member = localStorage.getItem('Member') ? JSON.parse(localStorage.getItem('Member')) : [];
                let valueNew = Member[id];
                document.getElementById('idName').value = valueNew.idName,
                    document.getElementById('idNumber').value = valueNew.idNumber,
                    document.getElementById('idPosition').value = valueNew.idPosition,
                    document.getElementById('idCompany').value = valueNew.idCompany,
                    document.getElementById('idAge').value = valueNew.idAge
                this.editId = id  // gán id cho thuộc tính editId của class View
                alert(this.editId);
            }
        })
    }
    searchData(handler) {
        const searchs = document.getElementById("timkiem")
        searchs.addEventListener('keyup', event => {
            handler(searchs.value);
            // alert("mày chạy vào ô search chưa");
            // hanbler();
        })
    }
}
class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view
        this.onTodoListChanged(this.model.Member)
        this.view.addRecord(this.handleAddRecord);
        this.model.bindTodoListChanged(this.onTodoListChanged);
        this.view.bindDeleteTodo(this.handlerDelete)
        this.view.bindEditTodo(this.handlerEdit)
        this.view.showEditRecord(this.handlerEdit)
        this.view.searchData(this.handlerSearch)
    }
    handleAddRecord = (formdata) => {
        this.model.idSubmit()
    }
    onTodoListChanged = (newData) => {
        this.view.renderListMember(newData)
    }
    handlerDelete = (id) => {
        this.model.deleteTodo(id)
    }
    handlerEdit = (id, editedData) => {
        this.model.editTodo(id, editedData)
    }
    handlerSearch = (keyword) => {

        this.model.searchTodo(keyword);
    }
}
const app = new Controller(new Model(), new View())
