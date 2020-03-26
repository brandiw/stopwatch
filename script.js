// Global variables
const INTERVAL_DELAY = 100
let time = 0
let mil = 0
let interval = null

// Event Handlers
const startStop = (e) => {
    if (e.target.textContent == 'Start') {
        if (time <= 0) {
            document.getElementById('message').textContent = 'Set a time'
        }
        else {
            clearMessage()
            clearInterval(interval)
            updateTime()
            e.target.textContent = 'Stop'
            interval = setInterval(tick, INTERVAL_DELAY)
        }
    }
    else {
        clearInterval(interval)
        e.target.textContent = 'Start'
    }
}

const addThirty = () => {
    time += 30
    updateTime()
}

const setTime = (e) => {
    e.preventDefault()
    let parsed = parseFloat(document.getElementById('num').value)
    if (isNaN(parsed)) {
        document.getElementById('message').textContent = 'Invalid time'
    }
    else {
        time = parsed
    }
    updateTime()
}

const resetTime = () => {
    time = 0
    document.getElementById('ms').textContent = '00'
    updateTime()
}

// Timing functions
const tick = () => {
    // Fires each tenth of a second
    time -= 0.1
    updateTime(true)

    if (time <= 0) {
        clearInterval(interval)
        resetTime()
        document.getElementById('chime').play()
    }
}

// Helpers
const clearMessage = () => {
    document.getElementById('message').textContent = ''
}

const updateTime = (useMs) => {
    if (useMs) {
        let mil = (time - Math.floor(time % 60)).toFixed(1)
        mil = mil.toString()[mil.length - 1] + Math.floor(Math.random() * 10)
        document.getElementById('ms').textContent = mil
    }
    
    let sec = Math.floor(time % 60)
    let min = Math.floor(time / 60)
    
    if (sec < 10) {
        sec = '0' + sec
    }
    if (min < 10) {
        min = '0' + min
    }

    document.getElementById('sec').textContent = sec
    document.getElementById('min').textContent = min
}

// Set up
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('start').addEventListener('click', startStop)
    document.getElementById('add-thirty').addEventListener('click', addThirty)
    document.getElementById('time-form').addEventListener('submit', setTime)
    document.getElementById('reset-button').addEventListener('click', resetTime)
    document.getElementById('num').addEventListener('keypress', clearMessage)
})