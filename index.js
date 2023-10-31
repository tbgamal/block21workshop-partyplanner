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
  try{
    let response = await fetch (API_URL);
    console.log (response)
    let json = await response.json()
    console.log(json)
    
    state.events = json.data
    console.log(state.events)
  } catch(err) {
    console.error(err);
  }
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
    
    const deleteBtn = document.createElement("button")
    deleteBtn.innerText = "DELETE"
    deleteBtn.addEventListener("click", () => {
      deleteEvent(event.id)
    })

    li.appendChild(deleteBtn)
    return li
    
    
  })

  eventList.replaceChildren(...eventCards);
}

async function deleteEvent(id) {
  try{
    const response = await fetch(API_URL + `/${id}`, {
      method: "DELETE"
    })
  
    render()
  } catch(err){
    console.error(err)
  }
}

async function addEvent(event) {
  event.preventDefault();

  let name = addEventsForm.name.value
  let description = addEventsForm.description.value
  let date = addEventsForm.date.value + ":00.000Z"
  let location = addEventsForm.location.value

  const response = await fetch (API_URL, {
    method: "POST",
    headers: {"Content-type": "application/json"},
    body: JSON.stringify({
      name, description, date, location
    })
  })

  render()
}