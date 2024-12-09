"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
app.listen(8000, () => {
    console.log("listing on port ", 8000);
});
