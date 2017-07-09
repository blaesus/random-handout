const numberOfPeople = 50
const initialFund = 100
const ledger = Array(numberOfPeople).fill(initialFund)

function sleep(n) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, n)
    })
}

function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)]
}

function render(ledger, clock) {
    document.querySelector('.clock').innerHTML = clock
    document.querySelector('.canvas').innerHTML = 
        ledger
        .sort((a, b) => a - b)
        .map(fund => `
            <div style="height: ${fund * 5}px" class="bar"></div>
        `)
        .join('')
}

let clock = 0

async function main() {
    while (clock < 10000) {
        await sleep(10)
        const donor = Math.floor(Math.random() * numberOfPeople)
        const recipient = Math.floor(Math.random() * numberOfPeople)
        ledger[donor] -= 1
        ledger[recipient] += 1
        render(ledger, clock)
        clock += 1
    }
}

main()