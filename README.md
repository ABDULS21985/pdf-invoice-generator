## PDF Invoice Generator

## Overview

This project is a NestJS-based backend application designed to generate PDF invoices, store them in a database, and handle various operations related to invoices. It includes advanced logging, error handling, and data validation to ensure a robust and reliable service.

## Features

	•	PDF Generation: Generate PDFs for invoices, tax receipts, and bolt receipts.
	•	Database Integration: Use Prisma ORM with PostgreSQL for managing invoice data.
	•	CRUD Operations: Full create, read, update, and delete functionality for invoices.
	•	Advanced Logging: Integrated logging using Winston for better monitoring and debugging.
	•	Error Handling and Validation: Comprehensive error handling and data validation mechanisms.
	•	Storage Solutions: Plan for storing PDFs in a cloud storage bucket.

## Technologies Used

	•	NestJS: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
	•	Prisma ORM: An open-source database toolkit for TypeScript and Node.js.
	•	PostgreSQL: A powerful, open-source object-relational database system.
	•	Winston: A versatile logging library for Node.js.

## Setup and Installation

git clone https://github.com/ABDULS21985/pdf-invoice-generator.git
cd pdf-invoice-generator
npm install

## Set up environment variables:
Create a .env file in the root directory and add the following:

DATABASE_URL="postgresql://pdfadmin:pdfadmin@localhost:5432/pdfgen_db?schema=public"

## Generate Prisma client:

npx prisma migrate dev --name init
npx prisma generate

npm run start

## Prerequisites

	•	Node.js (v14 or higher)
	•	PostgreSQL


## usage

## Endpoints

	•	Generate PDF:
	•	POST /pdf-generator/generate
 
	Payload:
{
  "description": "Invoice for web development services",
  "amount": 1500.00,
  "from": {
    "companyName": "Your Company Name",
    "address": "1234 Your Street",
    "city": "Your City",
    "state": "Your State",
    "zip": "12345",
    "country": "Your Country"
  },
  "to": {
    "companyName": "Client Company Name",
    "address": "5678 Client Street",
    "city": "Client City",
    "state": "Client State",
    "zip": "67890",
    "country": "Client Country"
  },
  "items": [
    {
      "description": "Item 1",
      "quantity": 2,
      "unitPrice": 50
    },
    {
      "description": "Item 2",
      "quantity": 3,
      "unitPrice": 30
    },
    {
      "description": "Item 3",
      "quantity": 1,
      "unitPrice": 100
    }
  ]
}
## CRUD Operations for Invoices:
	•	POST /invoices: Create a new invoice.
	•	GET /invoices: Retrieve all invoices.
	•	GET /invoices/:id: Retrieve a specific invoice by ID.
	•	PUT /invoices/:id: Update an existing invoice by ID.
	•	DELETE /invoices/:id: Delete an invoice by ID.

##  Logging

Logging is implemented using Winston. Logs are stored in combined.log and are also output to the console. This helps in monitoring application behavior and debugging issues efficiently.

## Contributing

If you wish to contribute to this project, please fork the repository and create a pull request with your changes. Ensure that your code follows the existing code style and includes appropriate tests.

## Contact

For any questions or inquiries, please contact Abdul Shadrach at shadrach.abdul@gmail.com.

## License

Nest is [MIT licensed](LICENSE).
