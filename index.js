function redirect() {
  var query = $("input").val();
  var select = $("select").val();
  localStorage.setItem('input', query);
  localStorage.setItem('select', select);
  window.location.href="search/results.html";
}
