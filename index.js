const form = document.querySelector(".add-monster-form")
const monsterCont = document.querySelector("#monster-container")
const inputs = document.querySelector(".input-text")
const container = document.querySelector(".container")

fetch("http://localhost:3000/monsters/?_limit=50")
  .then(resp => resp.json())
  .then(data => data.forEach(monster => {
    monsterCont.innerHTML += `
      <div class="card">
        <h2>Name: ${monster.name}</h2>
        <p>Age: ${monster.age}</p>
        <p>Description: ${monster.description}</p>
      </div>
    `
  }))

  const nameInput = document.querySelector("#monster-name")
  const ageInput = document.querySelector("#monster-age")
  const descInput = document.querySelector("#monster-desc")

  form.addEventListener("submit", function(e) {
    e.preventDefault()
    fetch("http://localhost:3000/monsters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: nameInput.value,
        age: ageInput.value,
        description: descInput.value
      })
    })
    .then(resp => resp.json())
    .then(function(json) {
      monsterCont.innerHTML += `
        <div class="card">
          <h2>Name: ${json.name}</h2>
          <p>Age: ${json.age}</p>
          <p>Description: ${json.description}</p>
        </div>
      `
    })

  })

  const forwardButton = document.querySelector("#forward")
  const backButton = document.querySelector("#back")
  let pageNum = 1
  const buttonCont = document.querySelector("#button-container")

  buttonCont.addEventListener("click", function(e) {
    e.preventDefault()
    if (e.target.id === "forward") {
      monsterCont.innerHTML = ""
      fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum+1}`)
        .then(resp => resp.json())
        .then(monsters => monsters.forEach(monster => {
          monsterCont.innerHTML += `
            <div class="card">
              <h2>Name: ${monster.name}</h2>
              <p>Age: ${monster.age}</p>
              <p>Description: ${monster.description}</p>
            </div>
          `
        })
        )
    }

  })
