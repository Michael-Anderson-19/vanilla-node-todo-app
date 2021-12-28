/**
 * @author Michael Anderson
 * This module defines the JSON response returned by the server 
 */

//function to create a json response and set response headers 
const createResponse = (response, statusCode, message, data) => {
    setResponseHeader(response, statusCode); 
    return JSON.stringify({
        message: message, 
        data: data
    })
}

//function to set the response headers
const setResponseHeader = (response, statusCode) => {
    response.writeHead(statusCode, {'Content-Type': 'application/json'});
}

module.exports =  {
    createResponse,
    setResponseHeader
}