function initMap() {
    let center = {lat: 47.102182, lng: 37.540413};
    let map = new google.maps.Map(document.getElementById('map'), {
        center: center,
        zoom: 13
    });

    let marker = new google.maps.Marker({
        position: center,
        icon: 'img/marker.svg',
        map: map
    });

    let infowindow = new google.maps.InfoWindow({
        content: `
        <div class="infowindow">
        <b>Mariupol</b>
        <p>Hello!</p>
        </div>`
    });

    infowindow.open(map, marker);
    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
    

}