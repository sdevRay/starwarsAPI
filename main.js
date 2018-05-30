const baseURL = "https://swapi.co/api/starships";
const section = document.querySelector("section");
const firstList = document.querySelector(".select-one");
const secondList = document.querySelector(".select-two");
const submitBtn = document.querySelector(".submit");
const results = document.querySelector(".results");

const listItems = [firstList, secondList];
let starships = [];
let indexSize = 0;

submitBtn.addEventListener("click", displayResults);

fetchURL(baseURL);

function fetchURL(url) {

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            populateDropdown(json);
            updateURL(json);
        });
}

function updateURL(json) {
    let newURL = json.next;
    if (newURL != null) {
        fetchURL(newURL);
    }
}

function populateDropdown(json) {
    let starWarsAPI = json.results;

    for (item of starWarsAPI) {
        if (item.MGLT != "unknown") {
            for (items in listItems) {
                let optionItem = document.createElement("option");
                optionItem.innerHTML = item.name;
                listItems[items].appendChild(optionItem);
            }

            starships[indexSize] = {
                name: item.name,
                model: item.model,
                manufacturer: item.manufacturer,
                length: item.length,
                crew: item.crew,
                hyperdrive_rating: item.hyperdrive_rating,
                MGLT: item.MGLT
            }
            indexSize++;
        }
    }
}

function displayResults() {
    let compareArray = [];

    while (section.firstChild) {
        section.removeChild(section.firstChild);
    }

    for (item in listItems) {
        let article = document.createElement("article");
        let heading = document.createElement("h2");
        let para = document.createElement("p");

        let name = listItems[item].options[listItems[item].selectedIndex].text;

        for (item of starships) {
            if (name == item.name) {
                heading.innerHTML = item.name;
                para.innerHTML =
                    "MODEL: " + item.model + "<br>" +
                    "MANUFACTURER: " + item.manufacturer + "<br>" +
                    "LENGTH: " + item.length + "<br>" +
                    "CREW: " + item.crew + "<br>" +
                    "HYPERDRIVE RATING: " + item.hyperdrive_rating;

                let compareObject = {
                    name: item.name,
                    MGLT: item.MGLT
                }

                compareArray.push(compareObject);
            }
        }

        article.style.display = "inline-block";
        article.style.margin = "1em";
        article.style.width = "15%";
        article.style.textAlign = "left";

        if (section.firstChild) {
            let article = document.createElement("article");
            let heading = document.createElement("h2");

            heading.innerHTML = "VS";

            article.style.display = "inline-block";
            article.style.margin = "2em";
            article.style.fontSize = "40px";

            article.appendChild(heading);
            section.appendChild(article);
        }

        article.appendChild(heading);
        article.appendChild(para);
        section.appendChild(article);

    }

    for (let i = 0; i < compareArray.length - 1; i++) {
        let winner = document.createElement("h2");
        let compareOne = parseInt(compareArray[i].MGLT);
        let compareTwo = parseInt(compareArray[i + 1].MGLT);

        if (compareOne > compareTwo) {
            winner.innerHTML = compareArray[i].name + " has won!";
        } else if (compareOne < compareTwo) {
            winner.innerHTML = compareArray[i + 1].name + " has won!";
        } else if (compareOne == compareTwo) {
            winner.innerHTML = "It's a tie!";
        }

        while (results.firstChild) {
            results.removeChild(results.firstChild);
        }
        results.appendChild(winner);
    }
}
