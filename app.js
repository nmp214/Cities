const cities = document.getElementById("cities");
const explanation = document.getElementById("explanation");
const title = document.getElementById("title");
const text = document.getElementById("text");
let citiesData = [];
let map;

// The function gets cities data from json file and appends them to the DOM
const getCities = () => {
  $.ajax({
    method: 'GET',
    url: './assets/data.json',
    success: (data) => {
      citiesData = data;
      for (let index = 0; index < citiesData.length; index++) {
        const li = document.createElement("li");
        const h4 = document.createElement("h4");
        const description = document.createElement("div");
        const img = document.createElement("img");
        const cityDescription = document.createElement("p");

        h4.innerHTML = citiesData[index].name;
        img.src = citiesData[index].imageUrl;
        cityDescription.innerHTML = citiesData[index].description;

        description.appendChild(img);
        description.appendChild(cityDescription)

        li.appendChild(h4);
        li.appendChild(description);

        cities.appendChild(li);
        li.classList.add("city");
        h4.classList.add("city-name");
        img.classList.add("city-image");
        cityDescription.classList.add("city-description");
        description.classList.add("description");
        li.setAttribute("onclick", `initMap(${index})`);
      }
      initMap(-1);
    }
  });
}

// the function inits the map
 const initMap = async (index) => {
  const { Map } = await google.maps.importLibrary("maps");
  if (index != -1) {
    const position = citiesData[index].location;
    map = new Map(document.getElementById("map"), {
      zoom: 13,
      center: position,
    });
    showMarkers(index);
  }
  else {
    map = new Map(document.getElementById("map"), {
      zoom: 7,
      center: { lat: 31.697536992353175, lng: 35.009235713099564 },
    });
  }
}

//the function adds 4 markers to the map according to the current city
const showMarkers = (index) => {
  for (let i = 0; i < 4; i++) {
    const marker = new google.maps.Marker({
      map: map,
      position: citiesData[index].activities[i].location,
    });
    google.maps.event.addListener(marker, 'mouseover', function () {
      title.innerHTML = citiesData[index].activities[i].name;
      text.innerHTML = citiesData[index].activities[i].description;
      explanation.style.visibility = 'visible';
    });

    google.maps.event.addListener(marker, 'mouseout', function () {
      explanation.style.visibility = 'hidden';
    });
  }
}

getCities();