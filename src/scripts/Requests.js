import { getRequests, deleteRequest, getPlumbers, saveCompletion, getCompletions } from "./dataAccess.js"
const mainContainer = document.querySelector("#container")

///note what i am returning and assing it to a variable.


const convertRequestToListElement = (eachRequestInArray) => {
    const plumbers = getPlumbers()

    let html =
        `<li>
    ${eachRequestInArray.description}
    <button class="request__delete"
            id="request--${eachRequestInArray.id}">
        Delete
    </button>
    <select class="plumbers" id="plumbers">
    <option value="">Choose</option>
    ${plumbers.map(
            plumber => {
                return `<option value="${eachRequestInArray.id}--${plumber.id}">${plumber.name}</option>`
            }
        ).join("")
        }
</select>
</li>`
    return html
}

//this one is creating the requests completed
const convertCompletedRequests = (eachRequestInArray) => {
    let html = `<li class="completeRequestBackground">
    ${eachRequestInArray.description}
    <button class="request__delete"
            id="request--${eachRequestInArray.id}">
        Delete
    </button>
</li>`
    return html
}






//if the job is complete it will not have the delete button.
// if there is an object that is named completion then print one way on another
//class of complete or incomplete to print out

export const Requests = () => {
    const requests = getRequests()
    const completions = getCompletions()
    
    const convertedRequests = requests.map(request => {
        let foundCompletion = completions.find(completion => {
            return request.id === completion.requestId
        })
        if (foundCompletion) {
            let html = `
                ${
                //this is looping through the requests to send it to the convertcompletedREQUEST OBJECT.
                convertCompletedRequests(request)
                }
            </ul>
        `

            return html
        } else {
            //step 1. if requestId and the request id in the completions object match, 
            // then that object should be displayed with a background color of red,
            // it should also not have the select dropdown.
            let html = ` ${convertRequestToListElement(request)}`

            return html
        }
    }



    )
    return convertedRequests.join("")
}


mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [, requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")
            //this is creating a new object to be pushed into the completed 
            const completion = {
                requestId: parseInt(requestId),
                plumberId: parseInt(plumberId),
                date_Created: Date.now()
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