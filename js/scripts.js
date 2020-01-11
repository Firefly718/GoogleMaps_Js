let map        = null,
    marker     = null,
    infowindow = null,
    geocoder   = null;
    select     = document.getElementById('city');

function initMap() {
    // let center = {lat: 47.102182, lng: 37.540413};

    geocoder = new google.maps.Geocoder();

    select.removeAttribute('hidden');

    select.dispatchEvent(new Event('change'));
    // map = new google.maps.Map(document.getElementById('map'), {
    //     center: center,
    //     zoom: 13
    // });

    // marker = new google.maps.Marker({
    //     position: center,
    //     icon: 'img/marker.svg',
    //     map: map
    // });

    // infowindow = new google.maps.InfoWindow({
    //     content: `
    //     <div class="infowindow">
    //     <b>Mariupol</b>
    //     <p>Hello!</p>
    //     </div>
    //     `
    // });

    // infowindow.open(map, marker);
    // marker.addListener('click', function() {
    //     infowindow.open(map, marker);
    // });  
}


select.addEventListener('change', (e) => {
    
    let baAddress = e.target.value,
        baCity    = e.target.querySelector(`[value="${baAddress}"]`).innerText;

    geocoder.geocode({ address : baAddress}, (results, status) => {
        if (status == 'OK') {
            let center = {
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng()
            }

            if (map) {
                map.setCenter(center);
            } else {
                map = new google.maps.Map(document.getElementById('map'), {
                    center: center,
                    zoom: 13
                });
            }

            if (marker) {
                marker.setPosition(center);
            } else {
                marker = new google.maps.Marker({
                    position: center,
                    icon: 'img/marker.svg',
                    map: map
                });
            }

            if (!infowindow) {
                infowindow = new google.maps.InfoWindow();
             
                infowindow.open(map, marker);
                marker.addListener('click', () => {
                    infowindow.open(map, marker);
                });
            }

            infowindow.setContent(`
            <div class="infowindow">
            <b>${baCity}</b>
            <p>${baAddress}</p>
            </div>`
            );

        } else {
            alert("Ляжь поспи и всё пройдёт");
        }
    })

})