import { fetchRequests, fetchPlumbers } from "./dataAccess.js"
import { SinkRepair } from "./SinkRepair.js"



export const mainContainer = document.querySelector("#container")


const render = () => {
    fetchRequests().
    then(() => fetchPlumbers()).
    then (
        () => { mainContainer.innerHTML = SinkRepair()}
        )
        
    }
    
render()
    
mainContainer.addEventListener( "stateChanged",customEvent => {
            render()
        }
    )
