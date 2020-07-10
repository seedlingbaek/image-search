var accessKey = "Et_v1QYgpMGLpSTlHFgx6LZwZIsILqHWL8UQcoyBzco"
var api = "https://api.unsplash.com/"


function searchCollections() {
  var collectionName = $("select").val();

  var collectionsURL =  api+"search/collections?client_id="+accessKey+"&query="+collectionName;

  fetch(collectionsURL)
  .then(function(data) {
    // promise
    return data.json();
  })
  .then(function(data) {


    // var collectionsID = [];
    // first page
    data.results.forEach(collection => {
      // collectionID = collection.id;
      searchImages(collection.id);
    })

    // if (data.total_pages > 1) {
    //
    //   for (var i = 2; i < data.total_pages+1; i++) {
    //
    //     fetch(collectionsURL+"&page="+i)
    //     .then(function(data) {
    //
    //       return data.json();
    //     })
    //     .then(function(data) {
    //
    //       data.results.forEach(collection => {
    //         // collectionID = collection.id;
    //         searchImages(collection.id);
    //       })
    //     })
    //   }
    // }



  })
}

function searchImages(id) {
  var query = $("input").val();
  var queryURL = api+"search/photos?query="+query+"&collections="+id+"&client_id="+accessKey;
  var queryImages = []
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
          <img src="${photo.urls.small}">

        <div>
        `;

        $("#result").append(result);
        console.log(photo);

        let modal = `
        <div id="${photo.id}" class="myModal">
          <span class="close" onclick=closeModal("${photo.id}")>&times;</span>
          <img class="modal-content" src="${photo.urls.full}">
          <div id="user">username="${photo.user.name}"</div>
          <div class="container">
          <ul>
          <li>Camera Make:${photo.exif.make}</li>
          <li>Camera Modeal: ${photo.exif.modal} </li>
          <li>Exposure Time: ${photo.exif.exposure_time} </li>
          <li>Aperture: ${photo.exif.aperture} </li>
          <li>Focal Length: ${photo.exif.focal_length} </li>
          <li>ISO: ${photo.exif.iso} </li>
          </ul>
          </div>
        </div>
        `

        $("#result").after(modal);
      })

    }
    else {
      $("#result").html(<h1>No Photos Found</h1>);
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
