const h = document.querySelector("#splash-heading");
const text = h.innerHTML.split("<noscript>")[1].split("</noscript>")[0];
function inpText() {
    let textCounter = 0;
    type = setInterval(() => {
        textCounter++;
        h.innerText = text.slice(0, textCounter);
        if (textCounter == text.length) {
            clearInterval(type)
        }
    }, 120)
}

inpText()

function inpCursor() {
    let state = h.getAttribute("data-cursor");
    if (state === "▏") {
        h.setAttribute("data-cursor", "ᅟ")
        return
    }
    h.setAttribute("data-cursor", "▏")
}

inpCursor()
setInterval(inpCursor, 500)

document.body.addEventListener("mousemove", e => {
    let offset = 1 / document.body.clientWidth * e.x;
    document.querySelector(".book").style.transform = `rotateY(${-20 - 20 * offset}deg)`
})