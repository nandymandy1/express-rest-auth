require("dotenv").config();

const routes = [
  {
    Type: "POST",
    Name: "Register Route",
    Path: "/api/users/register",
    Protected: false,
  },
  {
    Type: "POST",
    Name: "Authentication Route",
    Path: "/api/users/authenticate",
    Protected: false,
  },
  {
    Type: "GET",
    Name: "Authenticated User Route",
    Path: "/api/users/authenticate",
    Protected: true,
  },
];

console.log(`Routes for the application.`);
console.log(`Base URL: http://localhost:${process.env.PORT}`);
console.table(routes);
