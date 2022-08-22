import { fetchRequests, fetchPlumbers,fetchCompleations, fetchCompletions } from "./dataAccess.js"
import { SinkRepair } from "./SinkRepair.js"



export const mainContainer = document.querySelector("#container")


const render = () => {
    fetchRequests()
    .then(() => fetchPlumbers())
    .then(() => fetchCompletions())
    .then (
        () => { mainContainer.innerHTML = SinkRepair()}
        )
        
    }
    
render()
    
mainContainer.addEventListener( "stateChanged",customEvent => {
            render()
        }
    )
