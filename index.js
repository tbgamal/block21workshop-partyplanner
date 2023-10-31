const COHORT = "2309-FTB-ET-WEB-FT";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

const state =  {
  events: [],
}

const eventList = document.querySelector ("#events")

const addEventsForm = document.querySelector ("#addEvent")

addEventsForm.addEventListener("submit", addEvent)

async function render() {
  await getEvents();
  renderEvents()

}
render();

async function getEvents() {
  let response = await fetch (API_URL);
  console.log (response)
  let json = await response.json()
  console.log(json)

  state.events = json.data
  console.log(state.events)
}

getEvents()

function renderEvents() {
  if (!state.events.length) {
    eventList.innerHTML = "<li>No events.</li>"
    return;
  }

  const eventCards = state.events.map ((event) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <h2>${event.name}</h2>
      <p>${event.description}</p>
      <p>${event.date}</p>
      <p>${event.location}</p>
    `;


  })

  eventList.replaceChildren(...eventCards);
}