const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let ID = 1;

async function mainApp(){
    console.log(`---------starting [mainApp]--------`)
    const team = [];

    const managerInfo = await inquirer
        .prompt([
            {
                type: "input",
                message: "What is the manager's name?",
                name: "name"
            },
            {
                type: "input",
                message: "What is the manager's email?",
                name: "email"
            },
            {
                type: "input",
                message: "What is the manager's office number?",
                name: "officeNumber"
            },
            {
                type: "input",
                message: "How many people work under them?",
                name: "count"
            }
        ])
    
    team.push( new Manager( managerInfo.name, ID++, managerInfo.email, managerInfo.officeNumber ));

    for(let personCount=1; personCount<=managerInfo.count; personCount++ ){
        
        const person = await inquirer.prompt([
            {
                type: "list",
                message: `For person ${personCount} of ${managerInfo.count}, what is the role?`,
                choices: ["Engineer", "Intern"],
                name: "type"
            }
        ])
        
        if (person.type=='Engineer'){
            const personInfo = await inquirer.prompt([
                {
                    type: "input",
                    message: "What is the name of an engineer?",
                    name: "name"
                },
                {
                    type: "input",
                    message: "What is the email of an engineer?",
                    name: "email"
                },
                {
                    type: "input",
                    message: "What is the github username of an engineer?",
                    name: "github"
                }
            ]);
            team.push( new Engineer( personInfo.name, ID++, personInfo.email, personInfo.github ));
        }
        else {
            const personInfo = await inquirer.prompt([
                {
                    type: "input",
                    message: "What is the name of an intern?",
                    name: "name"
                },
                {
                    type: "input",
                    message: "What is the email of an intern?",
                    name: "email"
                },
                {
                    type: "input",
                    message: "What is their school?",
                    name: "school"
                }
            ])
            team.push( new Intern( personInfo.name, ID++, personInfo.email, personInfo.school ));
        }
    }

    const html = render( team );

    fs.writeFileSync( outputPath, html );
    console.log( `It is all finished writing file! please check in [${outputPath}]`)
}
mainApp();
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
