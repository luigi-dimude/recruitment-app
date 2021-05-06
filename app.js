

// Employee CTRL
const EmployeeCtrl = (function () {
    // Item Constructor
    const Employee = function (id, picture, name, title, age, location, phone, experience) {
        this.id = id;
        this.picture = picture;
        this.name = name;
        this.title = title;
        this.age = age;
        this.location = location;
        this.phone = phone;
        this.experience = experience;
    }

    // Data Structure / State
    const data = {
        employees: [
            // { id: 0, name: 'Luigi Dimude', title: 'Frontend Developer', phone: '09045344580', experience: '2 years' },
            // { id: 1, name: 'George Weinstein', title: 'Backend Developer', phone: '0902265109', experience: '5 years' },
            // { id: 2, name: 'Philip Stevens', title: 'UI/UX Designer', phone: '08035365590', experience: '7 years' },
        ]
    }

    // Public methods
    return {
        logData: function () {
            return data;
        },
        randomNumGenerator: function () {
            return Math.floor(Math.random() * (10 - 1 + 1)) + 1;
        },
        employeeTitle: function (randomNum) {

            let title, picture;
            if (randomNum > 0 && randomNum <= 2) {
                title = 'Backend Engineer';
                picture = 'url(img/back.png)';
            }
            else if (randomNum > 2 && randomNum <= 4) {
                title = 'Frontend Developer';
                picture = 'url(img/front.png)';
            }
            else if (randomNum > 4 && randomNum <= 6) {
                title = 'UI/UX Designer';
                picture = 'url(img/design.png)';
            }
            else if (randomNum > 6 && randomNum <= 8) {
                title = 'Database Developer';
                picture = 'url(img/database.png)';
            }
            else {
                title = 'Software tester';
                picture = 'url(img/tester.png)';
            }
            return {
                title,
                picture
            }
        },
        employeeExp: function (randomNum) {
            let experience;
            if (randomNum === 1) {
                experience = `${randomNum} year`;
            }
            else {
                experience = `${randomNum} years`;
            }

            return experience;
        },
        addEmployee: function (employee) {

            // // Create ID increment 
            let ID, title, experience, age, location, phone;

            if (data.employees.length > 0) {
                ID = data.employees[data.employees.length - 1].id + 1;
            }
            else {
                ID = 0;
            }

            //  Add employee picture
            picture = employee.picture;
            // Add employee name
            name = employee.name;
            // Add employee title
            title = employee.title;
            // Add employee age
            age = employee.age;
            // Add location
            location = employee.infoLoc;
            // Add phone number
            phone = employee.phone;
            // Add employee experience
            experience = employee.infoExp;

            // Create new employee
            newEmployee = new Employee(ID, picture, name, title, age, location, phone, experience);

            // Add to Employee Array
            data.employees.push(newEmployee);

            return newEmployee;
        },
        getEmployee: function (id) {
            let found;
            data.employees.forEach(employee => {
                if (id == employee.id) {
                    found = employee;
                }
            });

            return found;
        },
        getEmployeeSummary: function () {
            let total = 0,
                backend = 0,
                frontend = 0,
                db = 0,
                tester = 0,
                ui = 0;
            data.employees.forEach(employee => {
                total++;
                if (employee.title === 'Backend Engineer') backend++;
                else if (employee.title === 'Frontend Developer') frontend++;
                else if (employee.title === 'UI/UX Designer') ui++;
                else if (employee.title === 'Database Developer') db++;
                else if (employee.title === 'Software tester') tester++;
                else { }

            });
            return {
                total,
                backend,
                frontend,
                ui,
                db,
                tester
            }
        },
        deleteEmployee: function (id) {
            data.employees.forEach((employee, index) => {
                if (id == employee.id) {
                    data.employees.splice(index, 1);
                }
            });
        }

    }
})();



// UI Controller
const UICtrl = (function () {

    const UISelectors = {
        addUser: '#add',
        skipUser: '#reject',
        infoName: '#infoName',
        infoTitle: '#infoTitle',
        infoAge: '#infoAge',
        infoLoc: '#infoLoc',
        infoPhone: '#infoPhone',
        infoExp: '#infoExp',
        tbody: '#tbody',
        bannerImg: '#profile-pic',
        bannerBg: '.banner',
        modalcard: '.modal-card',
        modal: '#modal',
        userAdded: '#userAdded',
        userStyle: '.userStyle',
        summaryBtn: '#summaryBtn'

    }
    // Public methods
    return {
        getSelectors: function () {
            return UISelectors;
        },
        getEmployeeInfo: function () {
            return {
                name: document.querySelector(UISelectors.infoName).textContent,
                title: document.querySelector(UISelectors.infoTitle).textContent,
                age: document.querySelector(UISelectors.infoAge).textContent,
                phone: document.querySelector(UISelectors.infoPhone).textContent,
                infoExp: document.querySelector(UISelectors.infoExp).textContent,
                infoLoc: document.querySelector(UISelectors.infoLoc).textContent,
                picture: document.querySelector(UISelectors.bannerImg).src
            }
        },
        paintEmployee: function (newEmployee) {
            document.querySelector(UISelectors.infoName).textContent = newEmployee.name;
            document.querySelector(UISelectors.infoTitle).textContent = newEmployee.title;
            document.querySelector(UISelectors.infoAge).textContent = newEmployee.age;
            document.querySelector(UISelectors.infoPhone).textContent = newEmployee.phone;
            document.querySelector(UISelectors.infoExp).textContent = newEmployee.experience;
            document.querySelector(UISelectors.infoLoc).textContent = newEmployee.location;
            document.querySelector(UISelectors.bannerImg).src = newEmployee.picture;
            document.querySelector(UISelectors.bannerBg).style.backgroundImage = newEmployee.bgImage;

        },
        paintList: function (newEmployee) {
            document.querySelector(UISelectors.tbody).innerHTML += `<tr id=${newEmployee.id}>
            <td>${newEmployee.name}</td>
            <td>${newEmployee.title}</td>
            <td><a class="btn-grad viewEmp" href="#">view</a> <i class="fas fa-times deleteEmp"></i></td>
        </tr>`
        },
        displayModal: function () {
            document.querySelector(UISelectors.modal).style.display = 'flex';
            scroll(0, 0);
            document.body.style.overflow = 'hidden';
        },
        displayEmployeeModal: function (foundEmployee) {
            document.querySelector(UISelectors.modalcard).innerHTML =
                `<a href="#"><i class="fas fa-times close-modal"></i></a>
                <div class="img-div">
                <img id="profile-pic" class="img" src="${foundEmployee.picture}" alt="">
                 </div>
            <div class="modal-info">
                <p id="modal-name"><span>Name: </span>${foundEmployee.name}</p>
                <p><span>Title: </span><em>${foundEmployee.title}</em></p>
                <p><span>Age: </span><em>${foundEmployee.age}</em></p>
                <p><span>Location: </span><em>${foundEmployee.location}</em></p>
                <p><span>Phone: </span><em>${foundEmployee.phone}</em></p>
                <p><span>Years of exp: </span><em>${foundEmployee.experience}</em></p>
            </div>`;
            UICtrl.displayModal();

        },
        closeModal: function () {
            console.log('sff');
            document.querySelector(UISelectors.modal).style.display = 'none';
            document.body.style.overflow = 'unset';
        },
        addEmployeeMessage: function () {
            // Clear message
            UICtrl.clearMessage();

            // Text to be added
            const div = document.createElement('div');
            const p = 'User Added!'
            div.appendChild(document.createTextNode(p));

            // Add class
            div.className = 'userStyle';

            // Insert into DOM
            document.querySelector(UISelectors.userAdded).appendChild(div);

            // Add timeout
            setTimeout(function () {
                div.remove();
            }, 1500);
        },
        clearMessage: function () {
            const message = document.querySelector(UISelectors.userStyle);

            if (message) {
                message.remove();
            }
        },
        displaySummaryModal: function (summary) {
            document.querySelector(UISelectors.modalcard).innerHTML =
                `<a href="#"><i class="fas fa-times close-modal"></i></a>
                <div class="modal-info">
                <p id="modal-name"><span>Total Employees: </span> ${summary.total}</p>
                <p><span>Total Backend Engineer: </span><em>${summary.backend}</em></p>
                <p><span>Total Frontend Developers: </span><em>${summary.frontend}</em></p>
                <p><span>Total Software Testers: </span><em>${summary.tester}</em></p>
                <p><span>Total Database Developers: </span><em>${summary.db}</em></p>
                <p><span>Total UI/UX Designers </span><em>${summary.ui}</em></p>
                </div>`;
            UICtrl.displayModal();

        },
        deleteListItem: function (item) {
            item.remove();
        }
    }
})();

// RandomAPI Controller
const RandomAPI = (function () {


    // Public methods
    return {

        results: async function () {
            const reponse = await fetch("https://randomuser.me/api/?results=1");

            const data = await reponse.json();

            return {
                data
            }

        }
    }
}
)();



// App Controller
const App = (function (EmployeeCtrl, RandomAPI, UICtrl) {


    // Event listeners
    const loadEventListeners = function () {

        const UISelectors = UICtrl.getSelectors();


        document.querySelector(UISelectors.addUser).addEventListener('click', addUser);
        document.querySelector(UISelectors.skipUser).addEventListener('click', skipUser);
        document.querySelector(UISelectors.tbody).addEventListener('click', viewEmployee);
        document.querySelector(UISelectors.tbody).addEventListener('click', deleteEmployee);
        document.querySelector(UISelectors.modalcard).addEventListener('click', closeEmployee);
        document.querySelector(UISelectors.summaryBtn).addEventListener('click', viewSummary);

    }

    const dataLoad = function () {
        RandomAPI.results().then(random => {
            let age;
            const first = random.data.results[0].name.first;
            const last = random.data.results[0].name.last;

            const name = first + " " + last;
            const rawAge = random.data.results[0].dob.age;
            const location = random.data.results[0].location.street.name;
            const phone = random.data.results[0].phone;
            const picture = random.data.results[0].picture.large;

            if (rawAge > 40 && rawAge < 60) {
                age = rawAge - 20;
            }
            else if (rawAge > 60) {
                age = rawAge - 40;
            }
            else {
                age = rawAge;
            }

            // Random number to decide on title 
            const titleRandom = EmployeeCtrl.randomNumGenerator();
            titleInfo = EmployeeCtrl.employeeTitle(titleRandom);
            title = titleInfo.title;
            bgImage = titleInfo.picture;

            // Random number to decide on experience 
            const experienceNum = EmployeeCtrl.randomNumGenerator();
            experience = EmployeeCtrl.employeeExp(experienceNum);

            const randomUser = {
                name,
                age,
                location,
                phone,
                picture,
                title,
                experience,
                bgImage
            }

            UICtrl.paintEmployee(randomUser);

        });
    }


    const addUser = function (e) {

        const employeeInfo = UICtrl.getEmployeeInfo();

        const newEmployee = EmployeeCtrl.addEmployee(employeeInfo);

        UICtrl.paintList(newEmployee);

        UICtrl.addEmployeeMessage();

        App.loadData();

        e.preventDefault();
    }

    const skipUser = function (e) {

        App.loadData();

        e.preventDefault();
    }

    const viewEmployee = function (e) {

        if (e.target.classList.contains('viewEmp')) {
            const id = e.target.parentElement.parentElement.id;
            const foundEmployee = EmployeeCtrl.getEmployee(id);
            UICtrl.displayEmployeeModal(foundEmployee);
        }
        e.preventDefault();
    }

    const closeEmployee = function (e) {
        if (e.target.classList.contains('close-modal')) {

            UICtrl.closeModal();
        }
        e.preventDefault();
    }

    const viewSummary = function (e) {

        const employeeSummary = EmployeeCtrl.getEmployeeSummary();

        UICtrl.displaySummaryModal(employeeSummary);

        // console.log(employeeSummary);

        e.preventDefault();
    }

    const deleteEmployee = function (e) {
        if (e.target.classList.contains('deleteEmp')) {

            const deleteItemUI = e.target.parentElement.parentElement;
            UICtrl.deleteListItem(deleteItemUI);

            const employeeID = e.target.parentElement.parentElement.id;
            EmployeeCtrl.deleteEmployee(employeeID);
        }
        e.preventDefault();
    }
    // Public methods
    return {
        init: function () {
            console.log('Initializing App...');

            dataLoad();
            loadEventListeners();
        },
        loadData: function () {
            dataLoad();
        }
    }

})(EmployeeCtrl, RandomAPI, UICtrl);

// Initialize App
App.init();