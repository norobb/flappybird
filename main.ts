namespace SpriteKind {
    export const Feld = SpriteKind.create()
}
// Debug-Ausgabe
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprites.destroy(sprite)
})
let highscore = 0
let Hinderniss: Sprite = null
effects.confetti.startScreenEffect(200)
scene.setBackgroundImage(assets.image`Hintergrund`)
let Gustav_Gans = sprites.create(assets.image`Duck`, SpriteKind.Player)
controller.moveSprite(Gustav_Gans, 0, 100)
scroller.scrollBackgroundWithSpeed(-50, 0)
Gustav_Gans.setStayInScreen(true)
info.setLife(3)
info.setScore(0)
animation.runImageAnimation(
Gustav_Gans,
assets.animation`Duck_animation`,
100,
true
)
game.onUpdateInterval(1000, function () {
    Hinderniss = sprites.create(assets.image`Snake`, SpriteKind.Enemy)
    Hinderniss.setPosition(scene.screenWidth(), randint(10, scene.screenHeight()))
    Hinderniss.vx = -50
    info.changeScoreBy(1)
})
forever(function () {
    pause(10)
    Gustav_Gans.y += 0.6
    while (info.life() == 0) {
        while (info.score() > info.highScore()) {
            highscore = info.score()
            game.splash("Highscore:", highscore)
        }
    }
})
