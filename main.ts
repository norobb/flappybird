namespace SpriteKind {
    export const Pipe = SpriteKind.create()
}

const GAP = 44
const SPEED = -50
const FLAP = -90
const GRAVITY = 300

const pipeBottom = assets.image`Hinderniss_unten`
const pipeTop = pipeBottom.clone()
pipeTop.flipY()

scene.setBackgroundImage(assets.image`Hintergrund`)
scroller.scrollBackgroundWithSpeed(SPEED, 0)
info.setScore(0)

const duck = sprites.create(assets.image`Duck`, SpriteKind.Player)
duck.setPosition(40, scene.screenHeight() / 2)
let started = false
duck.sayText("A drücken")
animation.runImageAnimation(duck, assets.animation`Duck_animation`, 100, true)

function flap() {
    if (!started) {
        started = true
        duck.sayText("")
        duck.ay = GRAVITY
    }
    duck.vy = FLAP
}
controller.A.onEvent(ControllerButtonEvent.Pressed, flap)
controller.up.onEvent(ControllerButtonEvent.Pressed, flap)

function spawnPipes() {
    const gapY = randint(GAP / 2 + 10, scene.screenHeight() - GAP / 2 - 10)
    const x = scene.screenWidth() + pipeBottom.width / 2
    const top = sprites.create(pipeTop, SpriteKind.Pipe)
    const bottom = sprites.create(pipeBottom, SpriteKind.Pipe)
    top.setPosition(x, gapY - GAP / 2 - pipeTop.height / 2)
    bottom.setPosition(x, gapY + GAP / 2 + pipeBottom.height / 2)
    top.vx = SPEED
    bottom.vx = SPEED
    sprites.setDataBoolean(top, "scorer", true) // nur das obere Rohr zählt Punkte
}

sprites.onOverlap(SpriteKind.Player, SpriteKind.Pipe, function () {
    game.gameOver(false)
})

game.onUpdate(function () {
    if (duck.top < 0 || duck.bottom > scene.screenHeight()) {
        game.gameOver(false)
    }
    for (const pipe of sprites.allOfKind(SpriteKind.Pipe)) {
        if (pipe.right < 0) {
            sprites.destroy(pipe)
        } else if (sprites.readDataBoolean(pipe, "scorer") && pipe.right < duck.left) {
            sprites.setDataBoolean(pipe, "scorer", false)
            info.changeScoreBy(1)
        }
    }
})

game.onUpdateInterval(1500, function () {
    if (started) spawnPipes()
})
