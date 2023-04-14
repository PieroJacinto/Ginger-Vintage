require("dotenv").config();
const express = require("express");
const createApp = require("./config/create-app");
const appConfig = require("./config/app-config");
const { join } = require("path");
const { static } = require("express");
const methodOverride = require("method-override");

// CREATE EXPRESS APP
const app = createApp();

appConfig.config(app);

// public path

app.use(static(join(__dirname, "..", "public")));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));

const mainRouter = require("./routers/main-router");

// MOUNT MAIN ROUTER

app.use(mainRouter);
