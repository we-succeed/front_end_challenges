let canada;
const initList = document.querySelector(".init")
const fetching = () => {
  fetch("./canada.json")
  .then(res => res.json())
  .then(data => {
    canada = data;
  })
  .catch(err => console.error("ERROR", err));
};
fetching();

const findMatches = (regex) => {
  return canada.filter(location => {
    // regex can't accept dynamic value. Use new RegExp
    
    return location[0].match(regex) || location[1].match(regex);
  });
};

const displayLists = (e) => {
  if (!e.target.value) {
    lists.innerHTML = "";
    lists.appendChild(initList)
    return
  }
  const input = e.target.value;
  const regex = new RegExp(input, "gi");

  const filteredLocations = findMatches(regex);

  const newLists = filteredLocations.map(location => {
    const cityName = location[0].replace(regex, `
    <span class="highlight">${input}</span>
    `)
    const stateName = location[1].replace(regex, `
    <span class="highlight">${input}</span>
    `)
    return `
      <li>
      <span class="name">${cityName}, ${stateName}</span>
      </li>
    `
  }).join("");
  lists.innerHTML = newLists;
};

const searchInput = document.querySelector(".search_input");
const lists = document.querySelector(".lists");
searchInput.addEventListener("change", displayLists);
searchInput.addEventListener("keyup", displayLists);