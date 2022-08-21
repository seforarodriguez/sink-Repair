import { getRequests, deleteRequest, getPlumbers, saveCompletion} from "./dataAccess.js"
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

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")
            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */

            const completion = { 
                requestId: requestId,
                plumberId: plumberId,
                date_Created: event.timeStamp 
            }


            saveCompletion(completion);
            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */

        }
    }
)