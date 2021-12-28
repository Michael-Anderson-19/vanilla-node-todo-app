/**
 * @author Michael Anderson 
 * This module defines a controller for the todo list items
 * Each function defines the functionality for a given endpoint 
 * and collects parameters from the request object, collects data from the todo item model 
 * and creates the server response 
 */

const response = require('./response.js');
const todoModel = require("./todoItem.js");
const getParameters = async (req) => {
    let buffer = [];
    for await (const chunk of req) {
        buffer.push(chunk);
    }
    return JSON.parse(Buffer.concat(buffer).toString());
}

const getAllItems = async (res, headers) => {

    try {
        const results = await todoModel.getAll();

        return JSON.stringify({ status: 200, message: "ok", data: results })
        //res.end(JSON.stringify({ status: 200, message: "ok", data: results }))
    } catch (e) {
        //console.log("Error ", e);
        return response.createResponse(res, 500, "Internal Server Error " + e)
        //res.end(response.createResponse(res, 500, "Internal Server Error"))
    }

}

const getSingleItem = async (req, res) => {

    const id = req.url.split('/')[3]

    try {
        const result = await todoModel.getById(id);

        return response.createResponse(res, 200,"ok", result);

    } catch (e) {
        return response.createResponse(res, 500,"Internal Server Error: " + e);
    }
}
const addItem = async (req, res ) => {
    let buffer = [];
    try {
        //req.on("data", chunk => {
        //inputData += chunk; 
        //})
        for await (const chunk of req) {
            buffer.push(chunk);
        }

        const data = JSON.parse(Buffer.concat(buffer).toString());

        //req.on("end", async () => {
        //  inputData = JSON.parse(inputData); 
        const results = await todoModel.addItem(data.content);

        return response.createResponse(res, 200, "ok", results);
        //})
    } catch (e) {
        return response.createResponse(res, 500, "Internal Server Error");
    }
}
const updateItemContent = async (req, res, ) => {
    let buffer = []
    console.log("this si the thing ")
    try {

        //for await (const chunk of req) {
        //    buffer.push(chunk);
        //}
         

        const data = await getParameters(req);//JSON.parse(Buffer.concat(buffer).toString());

        
        
        const results = await todoModel.updateContent(data.id, data.content);
        
        return response.createResponse(res, 200, "ok", results);

    } catch (e) {
        return response.createResponse(res, 500, "Internal Server Error");
    }
}
const setItemComplete = async (req, res) => {

    let buffer = []
    try {
        for await (const chunk of req) {
            buffer.push(chunk);
        }

        const data = JSON.parse(Buffer.concat(buffer).toString());

        const item = await todoModel.getById(data.id);


        let completeState = item[0].completed === 0 ? 1 : 0;
        const results = await todoModel.setComplete(item[0].id, completeState);

        return response.createResponse(res, 200,"ok", results);
        // res.end(JSON.stringify({status: 200, message: "ok", data: results}));
        return
    }
    catch (e) {
        return response.createResponse(res, 500, "Internal Server Error");
    }
}
const deleteItem = async (req, res) => {

    const buffer = [];
    try {

        for await (const chunk of req) {
            buffer.push(chunk);
        }
        //this whole section can be moved out into a seperate function maytbe in a controller 
        const data = JSON.parse(Buffer.concat(buffer).toString());

        const results = await todoModel.deleteItem(data.id);
        return response.createResponse(res, 200, "ok", results);
        // res.end(JSON.stringify({status: 200, message: "ok", data:results}));

    } catch (e) {
        return response.createResponse(res, 500, "Internal Server Error");
        //handle error
    }


}

module.exports = {
    getAllItems,
    getSingleItem,
    addItem,
    updateItemContent,
    setItemComplete,
    deleteItem
}