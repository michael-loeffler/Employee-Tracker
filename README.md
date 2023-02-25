# Employee Tracker

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description
    
The Employee Tracker is a command-line application that allows a user to view information about departments, roles, and personnel within their company stored in a MySQL database. Additionally, users are able to add to and update data within that database as new departments, roles, and employees are added to the company.  This application serves as a quick and user-friendly way for non-developers to access and edit data stored in the database. 

I was motivated to create this application because content management systems (CMS) exist at almost every company in every sector to allow employees without advanced MySQL knowledge to access and edit large or small amounts of database data. In order to fulfill their job responsibilities, employees often need to quickly run a report to access data and a CMS will allow them to do that. Additionally, building this application was interesting for me because I can already see the other ways I can tweak this tool for different scenarios/use-cases where I would need to access and display specific fields in a database for use within the logic of the application, as well as running queries to reformat data in user-friendly formats.

Through working on this project, I have learned about MySQL and using JavaScript to query, access, display, and edit information stored in database tables so that users can learn from and use the data within MySQL without needing to be an expert. Some of the biggest points of learning include:

* MySQL Databases and Tables
* CRUD actions on databases and tables (Create, Read, Update, Delete)
* Using createConnection to build a bridge between MySQL and Node
* Creating a Schema that meets the needs of the specific project with respect to data types, required fields (not null), primary keys, and foreign keys
* Created a Seeds file to quickly add a larger amount of data to get a database started
* Building and implementing prepared statements to run queries based on user input, while maintaining the security of your database from SQL injection attacks
* Utilizing async/await and the .promise() function of MySQL2 to make my queries asynchronous in order to prevent them from all running at the same time and causing unexpected results
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
5. CD into the db folder, Open MySQL, and run the following commands 
   ```sh
   source schema.sql;
   source seeds.sql;
   ```
6. Invoke the application in the command-line using the following command
   ```sh
   node index.js
   ```
    
## Usage
    
The Employee Tracker functions as a command-line application. After following the installation instructions above, whenever users want to create an html file for a team profile webpage, they simply invoke the application using the command "node index.js". The application begins with an init() function that will run immediately when the application is invoked. The Inquirer package will prompt the user with questions to gather all pertinent information about the Manager of the team. Then it will ask the user if they would like to add an Engineer or Intern to the team, and ask questions accordingly to gather information about those employee types. It will continue this process until the user indicates that they are finished creating their team. At that time, the application will generate html code with all the data that was submitted to build a clean and functioning webpage. It will then write it to a new file and add it to the "dist" directory for use. The file that is created will be named "teamProfile.html".

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