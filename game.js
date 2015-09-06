var keycode = require('keycode')

var canvas = document.getElementById('game')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

var game = require('gameloop')({
  renderer: canvas.getContext('2d')
})

var keys = {}
document.addEventListener('keydown', function (e) {
  keys[keycode(e)] = true
  if (e.keyCode === 40 || e.keyCode === 38 || e.keyCode === 37 || e.keyCode === 39 || e.keyCode === 32) {
    e.preventDefault()
  }
}, false)

document.addEventListener('keyup', function (e) {
  delete keys[keycode(e)]
}, false)

var player = {
  x: 100,
  y: 100,
  width: 20,
  height: 20,
  speed: 4,
  velocity: {
    x: 0,
    y: 0
  },
  move: function () {
    if (keys.up) player.velocity.y = -player.speed
    if (keys.down) player.velocity.y = player.speed
    if (keys.right) player.velocity.x = player.speed
    if (keys.left) player.velocity.x = -player.speed
  },
  update: function (dt) {
    player.x += player.velocity.x || 0
    player.y += player.velocity.y || 0
    player.velocity.x *= 0.9
    player.velocity.y *= 0.9
  },
  draw: function (context) {
    context.fillStyle = '#4f8d3e'
    context.fillRect(player.x, player.y, player.width, player.height)
  }
}

game.on('update', function (dt) {
  player.move()
  player.update(dt)
})

game.on('draw', function (context) {
  context.fillStyle = '#d3ea2e'
  context.fillRect(0, 0, canvas.width, canvas.height)
  player.draw(context)
})

game.start()
