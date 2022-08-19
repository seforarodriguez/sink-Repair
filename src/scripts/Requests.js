import { getRequests } from "./dataAccess.js"

const convertRequestToListElement = (eachObjectInArray) => {
    let html = `<li>This service is:${eachObjectInArray.description}</li>`
    return html
}


export const Requests = () => {
    const requests = getRequests()

    let html = `
        <ul>
            ${
                requests.map(convertRequestToListElement).join("")
            }
        </ul>
    `

    return html
}