import { mainContainer} from "./main.js"

const applicationState = {
    //this is the request array that is being used in the bottom fetch.
    requests: []
}

const API = "http://localhost:8088"

export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}

export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.plumbers = data
            }
        )
}


//I made this by myself so revise with group or instructor, to confirm what the compleations should be populating.
//I should be taking into consideration that the compleations should have the requestId and the plumbersId like the 
//middle ground of two tables?? ask about this.
export const fetchCompleations = () => {
    return fetch(`${API}/compleations`)
    .then(response => response.json())
    .then(
        (completedrequests) => {
            applicationState.compleations = completedrequests
        }
    )
}


export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }

    return fetch(`${API}/requests`, fetchOptions)
    .then(response => response.json())
    .then(() => {
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
    })
}

export const saveCompletion = (requestCompleted) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        //what does this do?????????????????
        body: JSON.stringify(requestCompleted)
    }

    return fetch(`${API}/compleations`, fetchOptions)
    .then(response => response.json())
    .then(() => {
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
    })
}


export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

export const getRequests = () => {
    return applicationState.requests.map(request => ({...request}))
}

export const getPlumbers = () => {
    return applicationState.plumbers.map(plumbers => ({...plumbers}))
}



