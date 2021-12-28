/**
 * This file defines the functions needed to query the database
 */

const baseUrl = "http://localhost:8080/api/items";


export async function getSingleItem(id) {
    const URL = baseUrl + "/" + id;
    const response = await fetch(URL);
    return await response.json();
}

export const getAllItems = async () => {
    const response = await fetch(baseUrl)
    const data = await response.json();
    return data
}

export const deleteItem = async (id) => {
    const URL = baseUrl + "/delete";
    const response = await fetch(URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id })
    }).catch(e => {
        return false;
    });
    return true;
}

export const addTodoItem = async (content) => {
    const URL = baseUrl + "/add"
    const response = await fetch(URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: content })
    }).catch(e => {
        return false;
    });
    return true;
}

export const setComplete = async (id) => {
    const URL = baseUrl + "/complete";
    const response = await fetch(URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id })
    }).catch(e => {
        return false
    });
    return true;
}

export const updateItem = async (id, newContent) => {
    const URL = baseUrl + "/update";
    const response = await fetch(URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: id,
            content: newContent
        })
    }).catch(e => {
        return false
    });
    return true;

}
