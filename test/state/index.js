import {$} from "../../dist/m4q.esm.js"

const [state1, setState1] = $.useState(0)
const [state2, setState2] = $.useState(0)

$("#b1").on("click", (e) => {
    setState1(state1() + 1)
    e.target.textContent = `Clicks (${state1()})`
})

$("#b2").on("click", (e) => {
    setState2(state2() + 1)
    e.target.textContent = `Clicks (${state2()})`
})

