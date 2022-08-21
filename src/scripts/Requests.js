import { getRequests, deleteRequest, getPlumbers} from "./dataAccess.js"
const mainContainer = document.querySelector("#container")

const convertRequestToListElement = (eachRequestInArray) => {
    const plumbers = getPlumbers()
    
    let html = 
    `<li>
    ${eachRequestInArray.description}
    <button class="request__delete"
            id="request--${eachRequestInArray.id}">
        Delete
    </button>
    </li>
    <select class="plumbers" id="plumbers">
    <option value="">Choose</option>
    ${
        plumbers.map(
            plumber => {
                return `<option value="${eachRequestInArray.id}--${plumber.id}">${plumber.name}</option>`
            }
        ).join("")
    }
</select>`
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


mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})