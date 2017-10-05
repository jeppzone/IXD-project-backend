var API_URL = 'http://localhost:3000'
var body = document.querySelector('body');

function getRandomInt(min, max) {
    return Math.random() * (max - min + 1) + min;
}

function createTile(type){
  var types = {
    0: {
      name: 'forest',
      type: '.svg'
    },
    1: {
      name: 'farm',
      type: '.svg'
    }
  }

  var container = document.createElement('div')
  var el = document.createElement('img')
  el.src = './assets/' + types[type].name + types[type].type

  container.className = 'tile ' + types[type].name
  container.appendChild(el)
  return container
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

}, 5000)
