# Employee Tracker

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description
    
The Employee Tracker is a command-line application that allows a user to view information about departments, roles, and personnel within their company stored in a MySQL database. Additionally, users are able to add to the database in the form of new departments, roles, and employees as they are added to the company.  This application serves as a quick and user-friendly way for non-developers to access and edit data stored in the database. 

I was motivated to create this application because content management systems (CMS) exist at almost every company in every sector to allow employees without advanced MySQL knowledge to access and edit large or small amounts of database data. In order to fulfill their job responsibilities, employees often need to quickly run a report to access the data they need and a CMS will allow them to do that. Additionally, building this application was interesting for me because I can already see the other ways I can tweak this tool for different scenarios/use-cases where I would need to access and display specific fields from a database for use within the logic of the application, as well as running queries to reformat data in user-friendly formats.

Through working on this project, I have learned about MySQL and using JavaScript to query, access, display, and edit information stored in database tables so that users can learn from and use the data within MySQL without needing to be an expert. Some of the biggest points of learning include:

* MySQL Databases and Tables
* CRUD actions on databases and tables (Create, Read, Update, Delete)
* Using createConnection to build a bridge between MySQL and Node (as well as storing sensitive login information for this connection in a .env file)
* Creating a Schema that meets the needs of the specific project with respect to data types, required fields (not null), primary keys, and foreign keys
* Created a Seeds file to quickly add a large amount of data to get a database started
* Building and implementing prepared statements to run queries based on user input, while maintaining the security of the database from SQL injection attacks
* Utilizing async/await and the .promise() function of MySQL2 to make queries asynchronous in order to prevent them from all running at the same time and causing unexpected results
* Building a Class to organize all the query methods required to accomplish associated actions

## Table of Contents
        
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)
 
## Installation
            
1. Install Node.js
    - [Download Version 16 of Node.js](https://nodejs.org/download/release/v16.18.0/node-v16.18.0-x64.msi)
2. Clone this repo
   ```sh
   git clone https://github.com/michael-loeffler/Employee-Tracker.git
   ```
3. Install the dependencies included in the package.json
   ```sh
   npm i
   ```
4. Create a .env file with the following information
   ```sh
   DB_NAME='company_db'
   DB_USER='root'
   DB_PASSWORD='your MySQL password here'
   ```
5. CD into the db folder, open MySQL, and run the following commands 
   ```sh
   source schema.sql;
   source seeds.sql;
   ```
6. Return to the main folder of the project and invoke the application in the command-line using the following command
   ```sh
   node index.js
   ```
    
## Usage
    
The Employee Tracker functions as a command-line application. After following the installation instructions above, whenever users want to view or edit company data stored in the database, they simply invoke the application using the command "node index.js". The index.js file contains only one function declaration, the displayMenuOptions function, which will run immediately when the application is invoked. The Inquirer package will prompt the user with the various action options available to them, and when one is selected, the associated method stored in the Query class will be called, followed by another call of the displayMenuOptions function to provide the user with an opportunity to perform another action. All query methods are stored in the Query class and imported as a module in order to keep the index.js file brief and organized. If the action selected by the user requires input, the Inquirer package will gather all pertinent information from the user for that action, and then asynchronous queries will use the information collected to perform the associated action in MySQL. This is done using prepared statements to secure the database against SQL injection attacks. Sometimes, the Inquirer questions need information stored in the database to populate options for a particular question. When this is the case, asynchronous queries are run before the Inquirer package in order to provide choices for a list inquiry. For actions that simply pull and display data from the database, the console.table package is used to display the data in a visually friendly format. All queries are called asynchronously to prevent multiple queries from running simultaneously. It was necessary to prevent them from running simultaneously because often queries relied on the results of a previous query in order to run properly. Finally, when they are ready to exit, the user can select the "Quit Application" menu option and the application is closed. 

### --- Video demonstration of application's functionality ---

Please review the [demonstration video](https://drive.google.com/file/d/1dSsi_oiSJlcqlLNsLiJ_bnjVmjV61LOx/view) to see how the app functions and experience the user perspective.
    
## Credits

- Node Packages:
    - mysql2
    - inquirer
    - console.table
- [Professional README Guide, The Full-Stack Blog](https://coding-boot-camp.github.io/full-stack/github/professional-readme-guide)
- [Best-README-Template, GitHub Repo](https://github.com/othneildrew/Best-README-Template/blob/master/BLANK_README.md)

## License
    
Covered under the MIT License. For more details and to view the license in full, please visit the [MIT License Webpage](https://choosealicense.com/licenses/mit/).

## Contributing
    
If you have a suggestion for improvement, please fork the repo and create a pull request. You can also open an issue and tag it for "enhancement".
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/featureName`)
3. Commit your Changes (`git commit -m 'adds featureName'`)
4. Push to the Branch (`git push origin feature/featureName`)
5. Open a Pull Request
    
## Tests

N/A

## Questions

Please visit my [GitHub profile](https://github.com/michael-loeffler) or [send me an email with any additional questions.](mailto:michaelloeffler23@gmail.com)