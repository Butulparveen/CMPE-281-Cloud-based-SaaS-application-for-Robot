"use strict";

const config = {
  secret: "Your passport secret key",
  frontendURI: "http://localhost:3000",
  mysqlUser: "admin",
  mysqlPassword: "admin123",
  mysqlHost: "aws-281.cghlq8hkkzcz.us-east-1.rds.amazonaws.com",
  mysqlDatabase: "awsdb",
  mongoDBURI:
    "mongodb+srv://root:robotdb123@cluster0.tr7upgr.mongodb.net/cloudcomputing?retryWrites=true&w=majority"
};

module.exports = config;
