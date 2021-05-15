const inquirer = require("inquirer");
const fs = require("fs");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");


//=======================================================================================================
//Generate html template to begin dynamically adding employee cards
let renderPage = something => {
    const html =
        `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous"/>
                <title>Team Profile</title>
            </head>
            <body>
                <div class="jumbotron jumbotron-fluid" style="background-color: crimson">
                    <div class="container">
                        <h1 class="form-inline justify-content-center text-white">Employee Team Profiles</h1>
                        <p class="form-inline justify-content-center text-white">These are cards containing employee/team info:</p>
                    </div>
                </div>

                <div class="container-body container-fluid">
                    <div class ="row">`;

    //Creating/writing initial html file
    fs.writeFile('team.html', html, function (error) {
        if (error) {
            console.log(error);
        }
    });
    console.log('Please begin adding your employee:');
}


//=======================================================================================================
//Function to add elements to page, appending to generated html
let addToPage = employee => {
    return new Promise(function (resolve, reject) {
        const role = employee.getRole();
        const name = employee.getName();
        const id = employee.getId();
        const email = employee.getEmail();

        //Set info to dynamically add html for each case
        let info = '';
        switch (role) {
            case 'Engineer':
                let gitHub = employee.getGithub();
                info = `
                <div class="col-md-4 col-sm-6 col-12 col-lg-3">    
                    <div class="card shadow-lg mb-5 bg-white rounded">
                        <div class="card-header bg-primary">
                            <h3 class="text-white text-center">${name}</h3>  
                            <h4 class="text-white text-center">--- <i class="fas fa-tools"> ---</i>
                            <h4 class="text-white text-center">Engineer</h4>
                        </div>
                        <div class="card-body">
                            <ul class="list-unstyled">
                                <li>Employee ID: ${id}</li>
                                <li>Email Address: ${email}</li>
                                <li>GitHub: ${gitHub}</li>
                            </ul>
                        </div>
                    </div>
                </div>`;
                break;

            case 'Intern':
                let school = employee.getSchool();
                info = `
                <div class="col-md-4 col-sm-6 col-12 col-lg-3">    
                    <div class="card shadow-lg mb-5 bg-white rounded">
                        <div class="card-header bg-primary">
                            <h3 class="text-white text-center">${name}</h3>  
                            <h4 class="text-white text-center">--- <i class="fas fa-mug-hot"></i> ---</h4>
                            <h4 class="text-white text-center">Intern</h4>
                        </div>
                
                        <div class="card-body">
                            <ul class="list-unstyled">
                                <li>Employee ID: ${id}</li>
                                <li>Email Address: ${email}</li>
                                <li>School: ${school}</li>
                            </ul>
                        </div>
                    </div>
                </div>`;
                break;

            default:    //Default for manager
                let officePhone = employee.getOfficeNumber();
                info = `
                <div class="col-md-4 col-sm-6 col-12 col-lg-3">    
                    <div class="card shadow-lg mb-5 bg-white rounded">
                        <div class="card-header bg-primary">
                            <h3 class="text-white text-center">${name}</h3>
                            <h4 class="text-white text-center">--- <i class="fas fa-glasses text-white text-center"></i> ---</h4>  
                            <h4 class="text-white text-center">Manager</h4>
                        </div>
                
                        <div class="card-body">
                            <ul class="list-unstyled">
                                <li>Employee ID: ${id}</li>
                                <li>Email Address: ${email}</li>
                                <li>Office Number: ${officePhone}</li>
                            </ul>
                        </div>
                    </div>
                </div>`;
                break;
        }
        console.log("Adding employee(s)");

        fs.appendFile('team.html', info, function (error) {
            if (error) {
                return reject(error);
            };
            return resolve();
        });
    });
}

//=======================================================================================================
//Ends and closes out html page when 'no' is selected for adding additional employees 
let endPage = something => {
    let pageHtml =
        ` </div>
        </div>  
    </body>
</html>`;

    fs.appendFile('team.html', pageHtml, function (error) {
        if (error) {
            console.log(error);
        };
    });
    console.log('...');
}

//=======================================================================================================
//Create empty array and function to add employee info and push new employees to array
const employees = [];

let addEmployee = something => {
    inquirer.prompt([{
        type: "list",
        message: "Select employee's role: ",
        name: "role",
        choices: [
            "Engineer",
            "Intern",
            "Manager",
        ],
    },
    {
        message: "Enter employee's name: ",
        name: "name",
    },
    {
        message: "Enter employee's id: ",
        name: "id",
    },
    {
        message: "Enter employee's email address: ",
        name: "email",
    }])

        .then(function ({ name, role, id, email }) {
            let roleInfo = '';
            switch (role) {
                case 'Engineer':
                    roleInfo = "GitHub username: ";
                    break;

                case 'Intern':
                    roleInfo = "school name: ";
                    break;

                default:
                    roleInfo = "office phone number";
                    break;
            }

            //=================================================================================================================
            inquirer.prompt([{
                message: `Enter employee's ${roleInfo}`,
                name: "roleInfo"
            },
            {
                type: "list",
                message: "Would you like to add more employees?",
                name: "moreEmployees",
                choices: [
                    "Yes",
                    "No",
                ],

            }])
                .then(function ({ roleInfo, moreEmployees }) {
                    let newEmployee = '';
                    switch (role) {
                        case 'Engineer':
                            newEmployee = new Engineer(name, id, email, roleInfo);
                            break;
                        case 'Intern':
                            newEmployee = new Intern(name, id, email, roleInfo);
                            break;
                        default:
                            newEmployee = new Manager(name, id, email, roleInfo);
                            break;
                    }

                    employees.push(newEmployee);
                    addToPage(newEmployee)
                        .then(function () {
                            switch (moreEmployees) {
                                case 'Yes':
                                    addEmployee();  //If yes, rerun to add more cards
                                    break;
                                default:
                                    endPage();
                                    console.log("Generating team of employees...");
                                    break;
                            };
                        });

                });
        });
};

renderPage();
addEmployee();