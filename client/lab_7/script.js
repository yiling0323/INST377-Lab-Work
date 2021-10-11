async function dataHandler(mymap) {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
  const request = await fetch(endpoint);
  const food = await request.json();
  /* console.log(food); */

  function findMatches(wordToMatch, food) {
    return food.filter((place) => {
      if (wordToMatch.length === 5) {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.zip.match(regex);
      }
    });
  }

  function displayMatches(event) {
    const matchArray = findMatches(event.target.value, food);
    const matchArrayFive = matchArray.filter((item) => item.geocoded_column_1 != null).slice(0, 5);
    /* console.log(matchArrayFive); */
    const html = matchArrayFive.map((place) => `
          <span class="info">
              <span class="name">${place.name}</span><br/>
              <span class="address">${place.address_line_1}</span><br/>
              </span>
              <br/>
          `).join('');
    suggestions.innerHTML = html;

    /* for (item of matchArrayFive) {} */
    matchArrayFive.forEach((item, index) => {
      const geo = item.geocoded_column_1.coordinates.reverse();
      /* console.log(geo); */
      const marker = L.marker(geo).addTo(mymap);
    });
  }

  const searchInput = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');
  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('keyup', (evt) => { displayMatches(evt); });
}

function mapInit() {
  const mymap = L.map('mapid').setView([38.966, -76.910], 11);

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZHV5aWxpbmciLCJhIjoiY2t1bHg3eWVkMDU5cDJ1bGM5dDgwcGxhaiJ9.gMQBgYz5baqA3ILises0mQ'
  }).addTo(mymap);

  return mymap;
}

async function windowActions() {
  mymap = mapInit();
  await dataHandler(mymap);
}

window.onload = windowActions;
