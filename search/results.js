var accessKey = "Et_v1QYgpMGLpSTlHFgx6LZwZIsILqHWL8UQcoyBzco";
var api = "https://api.unsplash.com/"

function onLoad() {
  searchCollections();
}
function searchCollections() {
  var collectionName = $("select").val();

  // for demo purpose, only access the first 25 collections
  var collectionsURL =  api+"search/collections?per_page=25&client_id="+accessKey+"&query="+collectionName;

  fetch(collectionsURL)
  .then(function(data) {
    // promise
    // check header
    console.log(data);
    console.log(data.body);
    return data.json();
  })
  .then(function(data) {
    console.log(data);
    data.results.forEach(collection => {

      searchImages(collection.id);
    })


  })
}

function searchImages(id) {
  var query = $("input").val();
  var queryURL = api+"search/photos?per_page=30&query="+query+"&collections="+id+"&client_id="+accessKey;
  var queryImages = []
  // only the first page result images will be fetched
  fetch(queryURL)
  .then(function(data) {
    return data.json();
  })
  .then(function(data) {
    if (data.total !== 0) {
      // console.log(data.results);
      data.results.forEach(photo => {
        var info = photo.exif;
        console.log(photo.id);

        let result = `
        <div class="grid-item">
          <img src="${photo.urls.small}" onclick=openModal("${photo.id}")>

        <div>
        `;

        $("#result").append(result);
        console.log(photo);

        let modal = `
        <div id="${photo.id}" class="myModal">
          <span class="close" onclick=closeModal("${photo.id}")>&times;</span>
          <img class="modal-content" src="${photo.urls.full}">
          <div id="user">username="${photo.user.name}"</div>

        </div>
        `

        $("#result").after(modal);

        // if has exif info;
        // if (photo.exif)
        // let exif = `
        // <div class="container">
        // <ul>
        // <li>Camera Make:${photo.exif.make}</li>
        // <li>Camera Modeal: ${photo.exif.modal} </li>
        // <li>Exposure Time: ${photo.exif.exposure_time} </li>
        // <li>Aperture: ${photo.exif.aperture} </li>
        // <li>Focal Length: ${photo.exif.focal_length} </li>
        // <li>ISO: ${photo.exif.iso} </li>
        // </ul>
        // </div>`
      })

    }



  })
  
}

function openModal(id) {
  var modal = document.getElementById(id);
  modal.style.display = "block";


}
function closeModal(id) {
  var modal = document.getElementById(id);
  modal.style.display = "none";
}
