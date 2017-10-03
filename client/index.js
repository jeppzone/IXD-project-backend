var API_URL = 'http://localhost:3000'
var body = document.querySelector('body');

function getRandomInt(min, max) {
    return Math.random() * (max - min + 1) + min;
}

function createTile(type){
  var types = {
    0: 'forest',
    1: 'farm'
  }

  var el = document.createElement('div')
  el.className = 'tile ' + types[type]
  el.style.opacity = getRandomInt(0.6,1)
  return el
}

function append(el){
  body.appendChild(el)
}

function fetch(){
  return axios.get(API_URL + '/board')
}

var fetching = false
var interval = setInterval(function(){
  if (fetching) {
    return
  }
  fetching = true
  fetch().then(function(res){
    body.innerHTML = ''
    var arr = res.data.board
    arr.forEach(function(val){
      append(createTile(val))
    })

    fetching = false
  })

}, 1000)
