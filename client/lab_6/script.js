async function windowActions(evt) {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json'; /* '/api/wholeMeal' */
  const request = await fetch(endpoint);
  const food = await request.json();
  /* console.log(food); */
  /*
  fetch(endpoint)
    .then((blob) => blob.json())
    .then((data) => food.push(...data)); */

  function findMatches(wordToMatch, food) {
    return food.filter((place) => {
      const regex = new RegExp(wordToMatch, 'gi');
      return place.category.match(regex) || place.city.match(regex) || place.name.match(regex);
    });
  }

  function displayMatches(event) {
    const matchArray = findMatches(event.target.value, food);
    const html = matchArray.map(place => {
        return `
        <li>
            <span class="name">${place.name}</span><br/>
            <span class="category">${place.category}</span><br/>
            <span class="address">${place.address_line_1}</span><br/>
            <span class="city">${place.city}</span><br/>
            <span class="zip">${place.zip}</span><br/>
        </li> 
        `;
    }).join('');
    suggestions.innerHTML = html;
}
    
  const searchInput = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');
  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('keyup', (evt) => { displayMatches(evt); });
}

window.onload = windowActions;