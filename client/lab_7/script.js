async function windowActions(evt) {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json'; /* '/api/wholeMeal' */
  const request = await fetch(endpoint);
  const food = await request.json();
  /*console.log(food);*/
  /*
    fetch(endpoint)
      .then((blob) => blob.json())
      .then((data) => food.push(...data)); */

  function findMatches(wordToMatch, food) {
    return food.filter((place) => {
      const regex = new RegExp(wordToMatch, 'gi');
      return place.zip.match(regex);
    });
  }

  function displayMatches(event) {
    const matchArray = findMatches(event.target.value, food);
    const html = matchArray.map((place) => `
          <span class="info">
              <span class="name">${place.name}</span><br/>
              
              <span class="address">${place.address_line_1}</span><br/>
              
              
              </span>
              <br/>
          
          `).join('');
    suggestions.innerHTML = html;
  }

  const searchInput = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');
  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('keyup', (evt) => { displayMatches(evt); });
}

window.onload = windowActions;
/*
function mapInit() {
 const mymap = L.map('mapid').setView([39.023, -76.925], 13); 

 L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZHV5aWxpbmciLCJhIjoiY2t1bHg3eWVkMDU5cDJ1bGM5dDgwcGxhaiJ9.gMQBgYz5baqA3ILises0mQ'
}).addTo(mymap);

var marker = L.marker([39.023, -76.925]).addTo(mymap);
}*/