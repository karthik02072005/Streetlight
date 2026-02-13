const http = require("http");
const express = require("express");
const RED = require("node-red");

const app = express();

// Create HTTP server
const server = http.createServer(app);

// Node-RED settings
const settings = {
  httpAdminRoot: "/admin",
  httpNodeRoot: "/",
  userDir: "./.nodered/",
  flowFile: "flows.json",

  functionGlobalContext: {},

  ui: {
    path: "/ui"
  }
};

// Init Node-RED
RED.init(server, settings);

// Admin UI
app.use(settings.httpAdminRoot, RED.httpAdmin);

// Dashboard + HTTP nodes
app.use(settings.httpNodeRoot, RED.httpNode);

// Start server
const PORT = process.env.PORT || 1880;

server.listen(PORT, () => {
  console.log("Node-RED running on port " + PORT);
});

// Start runtime
RED.start();
