const jokeElement = document.getElementById("joke");
const jokeButton = document.getElementById("jokeBtn");

async function getJoke() {
    jokeElement.textContent = "Loading joke...";

    try {
        const response = await fetch(
            "https://official-joke-api.appspot.com/random_joke"
        );

        const data = await response.json();

        jokeElement.textContent = data.setup + " " + data.punchline;

    } catch (error) {
        jokeElement.textContent = "Sorry! Couldn't fetch a joke. Please try again.";
    }
}

jokeButton.addEventListener("click", getJoke);

// Automatically load a joke when the page opens
getJoke();