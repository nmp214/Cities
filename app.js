const cities = document.getElementById("cities");
const explanation = document.getElementById("explanation");
const title = document.getElementById("title");
const text = document.getElementById("text");
let citiesData = [];
let map;
let lastIndex = 0;

// The function gets cities data from json file
const getCities = () => {
  $.ajax({
    method: 'GET',
    url: './assets/data.json',
    success: (data) => {
      citiesData = data;
      initCities();
      initMap(-1);  //In the first initialization the index is -1
    }
  });
}

// The function creates elements for each city
const initCities = () => {
  for (let index = 0; index < citiesData.length; index++) {
    const li = document.createElement("li");
    const name = document.createElement("h4");
    const description = document.createElement("div");
    const img = document.createElement("img");
    const cityDescription = document.createElement("p");

    name.innerHTML = citiesData[index].name;
    img.src = citiesData[index].imageUrl;
    cityDescription.innerHTML = citiesData[index].description;

    description.appendChild(img);
    description.appendChild(cityDescription)

    li.appendChild(name);
    li.appendChild(description);

    cities.appendChild(li);
    li.classList.add("city");
    name.classList.add("city-name");
    img.classList.add("city-image");
    cityDescription.classList.add("city-description");
    description.classList.add("description");
    li.setAttribute("onclick", `initMap(${index})`);
  }
}

// The function inits the map
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
  // if this is the first initialization, the position is in the middle of Israel
  else {
    map = new Map(document.getElementById("map"), {
      zoom: 7,
      center: { lat: 31.697536992353175, lng: 35.009235713099564 },
    });
  }
}

//The function adds 4 markers to the map according to the current city
const showMarkers = (index) => {
  changeColor(index);
  for (let i = 0; i < 4; i++) {
    const marker = new google.maps.Marker({
      map: map,
      position: citiesData[index].activities[i].location,
    });
    google.maps.event.addListener(marker, 'mouseover', function () {
      console.log('hover marker');
      title.innerHTML = citiesData[index].activities[i].name;
      text.innerHTML = citiesData[index].activities[i].description;
      explanation.style.visibility = 'visible';
    });

    google.maps.event.addListener(marker, 'mouseout', function () {
      explanation.style.visibility = 'hidden';
    });
  }
}

// The function changes the color of selected city
const changeColor = (index) => {
  const cities = document.getElementsByClassName('city');
  cities[lastIndex].style.backgroundColor = '#FFF3D6';
  cities[index].style.backgroundColor = '#FFFAF2';
  lastIndex = index;
}

getCities();