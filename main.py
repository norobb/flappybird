# Tetris Musik
def play_tetris_music():
    music.play_melody("C5 B A G F E D C ", 120)
def on_on_overlap(sprite, otherSprite):
    info.change_life_by(-1)
    game.splash("Ouch! Leben abgezogen!")  # Debug-Ausgabe
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap)
Hinderniss: Sprite = None
effects.confetti.start_screen_effect(200)
scene.set_background_image(assets.image("""
    Hintergrund
    """))
Gustav_Gans = sprites.create(assets.image("""
    Duck
    """), SpriteKind.player)
controller.move_sprite(Gustav_Gans, 0, 100)
scroller.scroll_background_with_speed(-50, 0)
Gustav_Gans.set_stay_in_screen(True)
info.set_life(3)
animation.run_image_animation(Gustav_Gans,
    assets.animation("""
        Duck_animation
        """),
    100,
    True)
def on_update_interval():
    global Hinderniss
    Hinderniss = sprites.create(assets.image("""
        Snake
        """), SpriteKind.enemy)
    Hinderniss.set_position(scene.screen_width(), randint(10, scene.screen_height()))
    Hinderniss.vx = -50
game.on_update_interval(2000, on_update_interval)
def on_forever():
    pause(10)
    Gustav_Gans.y += 0.6
forever(on_forever)
# Starte die Musik, wenn das Spiel beginnt
play_tetris_music()