const countryInput = document.getElementById("countryInput");
const searchBtn = document.getElementById("searchBtn");
const universityList = document.getElementById("universityList");
const message = document.getElementById("message");

async function searchUniversities() {
    const country = countryInput.value.trim();

    if (country === "") {
        message.textContent = "Please enter a country name.";
        universityList.innerHTML = "";
        return;
    }

    message.textContent = "Loading universities...";
    universityList.innerHTML = "";

    try {
        const response = await fetch(
            `https://universities.hipolabs.com/search?country=${encodeURIComponent(country)}`
        );

        if (!response.ok) {
            throw new Error("Unable to fetch university data.");
        }

        const universities = await response.json();

        if (universities.length === 0) {
            message.textContent = "No universities found for this country.";
            return;
        }

        message.textContent = `${universities.length} universities found in ${country}.`;

        universities.forEach((university) => {
            const card = document.createElement("div");
            card.className = "university-card";

            const website = university.web_pages?.[0] || "";
            const state = university["state-province"] || "Not available";

            card.innerHTML = `
                <h3>${university.name}</h3>

                <p>
                    <strong>State/Province:</strong>
                    ${state}
                </p>

                <p>
                    <strong>Website:</strong>
                    ${
                        website
                            ? `<a href="${website}" target="_blank">${website}</a>`
                            : "Not available"
                    }
                </p>
            `;

            universityList.appendChild(card);
        });

    } catch (error) {
        message.textContent = "Something went wrong. Please try again.";
        console.error(error);
    }
}

searchBtn.addEventListener("click", searchUniversities);

countryInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        searchUniversities();
    }
});