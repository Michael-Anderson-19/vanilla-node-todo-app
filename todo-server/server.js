/**
 * @author Michael Anderson
 * This file defines the server for the todo list api 
 * This is implemented in vanilla Node.js without any frameworks like express
 * This was done simply for learning purposes
 * A rudimentary router is defined below with a set of if else statements that check the url and 
 * call the relevent controller function.
 */
const http = require('http');
const response = require('./response.js');
const controller = require('./todoController.js');
http.createServer(async (req, res) => {

  res.setHeader( "Access-Control-Allow-Origin","*");

  //route requests based on the url path and the method of request object 
  if (req.url === "/api/items" && req.method === "GET") {
    //endpoint to return all items
    const resp = await controller.getAllItems(res);
    res.end(resp);

  } else if (req.url === "/api/items/add" && req.method === "POST") {
    //endpoint to add a new todo list item 
    const resp = await controller.addItem(req, res);
    res.end(resp);
  }
  else if (req.url === "/api/items/update" && req.method === "POST") {
    //endpoint to update the content of a specified todo list item
    const resp = await controller.updateItemContent(req, res);
    res.end(resp);
  }
  else if (req.url === "/api/items/delete" && req.method === "POST") {
    //endpoint to detele a specified todo list item
    const resp = await controller.deleteItem(req, res);
    res.end(resp);
  }
  else if (req.url === "/api/items/complete" && req.method === "POST") {
    //endpoint to set a todo list item as complete 
    const resp = await controller.setItemComplete(req, res);
    res.end(resp);
  } else if (req.url.match(/\/api\/items\/[0-9]+/) && req.method === "GET") {
    //endpoint to return a single todo list item based on its ID
    const resp = await controller.getSingleItem(req, res);
    res.end(resp);
  } else {
    //unknown endpoint error response
    res.end(response.createResponse(res, 404, "Route Not Found"))
  }

}).listen(8080, () => console.log("server running on port 8080"));