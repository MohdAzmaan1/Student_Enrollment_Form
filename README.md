# Student_Enrollment_Form
This is a simple web-based form for enrolling students and storing their data in a JsonPowerDB. It is written in HTML, and JavaScript.

The form allows users to enter the following data for each student:

* Roll No. (Primary Key)
* Full Name
* Class
* Birth Date
* Address
* Enrollment Date    

When the form is first loaded or reset, all input fields except for the Roll No. field are disabled. If the Roll No. entered by the user already exists in the database, the form is populated with the existing data for that record, and the Update and Reset buttons are enabled. If the Roll No. does not exist, the form is cleared and the Save and Reset buttons are enabled.    

## Benefits of using JsonPowerDB
* Simplest way to retrieve data in a JSON format.
* Schema-free, Simple to use, Nimble and In-Memory database.
* It is built on top of one of the fastest and real-time data indexing engine - PowerIndeX.
* It is low level (raw) form of data and is also human readable.
* It helps developers in faster coding, in-turn reduces development cost.

## Release History
* v1.0 (15-04-2023)
* Initial release of the project
* Implemented basic CRUD operations with JsonPowerDB
* Included sample code and documentation
