const numberOfPeople = 10
const initialFund = 100
const transactionAmount = 10
const ledger = Array(numberOfPeople).fill(initialFund)
const frameDelay = 100

function sleep(n) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, n)
    })
}

let heightMultiplier = 5

function render(ledger, donor, recipient, day) {
    if (donor !== null && recipient !== null) {
        document.querySelector('.clock').innerHTML = `${day} day: ${donor}->${recipient}`
    }
    else {
        document.querySelector('.clock').innerHTML = `${day} day`
    }
    const divs = [].slice.call(document.querySelectorAll('.canvas div'))
    ledger.forEach((fund, index) => {
        divs[index].style.height = fund / (initialFund * heightMultiplier) * 100 + '%'
        divs[index].style.background = index === donor
                                            ? 'rgba(255, 0, 0, 0.5)'
                                            : index === recipient
                                                ? 'rgba(0, 255, 0, 0.5)' : ''
    })
}

function initBars() {
    const canvas = document.querySelector('.canvas')
    for (let i = 0; i < numberOfPeople; i += 1) {
        const div = document.createElement('div')
        div.style.left = i * 9.5 + 'vw',
        canvas.appendChild(div)
    }
}

let day = 1
let paused = true
function frame() {
    let donor, recipient
    while (donor === recipient) {
        donor = Math.floor(Math.random() * numberOfPeople)
        recipient = Math.floor(Math.random() * numberOfPeople)
    }
    ledger[donor] -= transactionAmount
    ledger[recipient] += transactionAmount
    day += 1
    render(ledger, donor, recipient, day)
    if (!paused) {
        setTimeout(frame, frameDelay)
    }
}

document.querySelector('.control .start').onclick = () => {
    paused = false
    frame()
}

document.querySelector('.control .pause').onclick = () => {
    paused = true
}

initBars()
render(ledger, null, null, day)