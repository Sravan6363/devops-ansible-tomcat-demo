function updateClock() {

    const now = new Date();

    const formatted =
        now.toLocaleDateString() +
        " • " +
        now.toLocaleTimeString();

    document.getElementById("clock").textContent =
        "Runtime: " + formatted;
}


updateClock();

setInterval(updateClock, 1000);
