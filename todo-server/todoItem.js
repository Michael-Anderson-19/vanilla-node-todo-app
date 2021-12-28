/**
 * @author Michael Anderson
 * This module acts a model for the todo list items
 * it queries the database and performs CRUD operations on the todo list items records 
 * and returns the results of these queries
 */

const database = require('./db.js')
const dbCon = database.makeConnection();

//return all todo list item records from the databae 
async function getAll() {
    return new Promise((resolve, reject) => {
        dbCon.query("SELECT * FROM todolists", (err, rows, fields) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

//return a single todo list item based on its ID
async function getById(id) {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM todolists WHERE id = ?";
        dbCon.query(query, [id], (err, rows, fields) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

//set the completed field of the todo list to the given value, 0 for incomplete and 1 for complete
async function setComplete(id, completed = 1) {
    return new Promise((resolve, reject) => {
        const updated_at = + Date.now();
        const sql = "UPDATE todolists SET updated_at = ?, completed = ? WHERE id = ?";
        dbCon.query(sql, [updated_at, completed, parseInt(id)], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result.affectedRows);
        })
    })
}

//add a new todo list item to the database, also sets the created_at field to the current date and time and sets completed to 0 (incomplete)
async function addItem(content) {
    return new Promise((resolve, reject) => {
        const created_at = +Date.now();
        const updated_at = null;
        const completed = 0;
        const SQL = "INSERT INTO todolists (content, created_at, updated_at, completed) VALUES (?,?,?,?)";
        dbCon.query(SQL, [content, parseInt(created_at), updated_at, completed], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result.affectedRows)
        })
    })
}

//update the content field of the todo list item and update the updated_at field to the current date time 
async function updateContent(id, content) {
    return new Promise((resolve, reject) => {
        const updated_at = +Date.now();
        const SQL = "UPDATE todolists SET content = ?, updated_at = ? WHERE id = ?";
        dbCon.query(SQL, [content, updated_at, id], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result.affectedRows);
        })
    })
}

//delete the todolist item specified by its ID
async function deleteItem(id) {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM todolists WHERE id = ?";
        dbCon.query(sql, [id], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result.affectedRows);
        })
    })
}

module.exports = {
    getAll,
    getById,
    setComplete,
    addItem,
    deleteItem,
    updateContent

}
