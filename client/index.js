var API_URL = 'http://localhost:3000'
var body = document.querySelector('body');

function getRandomInt(min, max) {
    return Math.random() * (max - min + 1) + min;
}

function createTile(type){
  var types = {
    0: 'forest',
    1: 'farm',
    2: 'ground'
  }

  if (type === 0 || type === 1){
    var el = document.createElement('img')
    el.src = './assets/' + types[type] + '.svg'
  } else {
    var el = document.createElement('div')
  }
  el.className = 'tile ' + types[type]
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
      if (val === 1){
        append(createTile(2))
        append(createTile(2))
        append(createTile(2))
      }
    })
    fetching = false
  })

}, 5000)
