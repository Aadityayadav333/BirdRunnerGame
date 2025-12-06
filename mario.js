// Show mobile controls on touch devices
if ('ontouchstart' in window) {
    const mobileControls = document.getElementById('mobile-controls');
    if (mobileControls) {
        mobileControls.classList.remove('hidden');
    }
}

// Mobile Touch Controls
let touchControls = {
    left: false,
    right: false,
    jump: false,
    enter: false,
    down: false
};

function setupMobileControls() {
    const btnLeft = document.getElementById('btn-left');
    const btnRight = document.getElementById('btn-right');
    const btnJump = document.getElementById('btn-jump');
    const btnEnter = document.getElementById('btn-enter');
    
    if (btnLeft) {
        btnLeft.addEventListener('touchstart', (e) => {
            e.preventDefault();
            touchControls.left = true;
        });
        btnLeft.addEventListener('touchend', (e) => {
            e.preventDefault();
            touchControls.left = false;
        });
    }
    
    if (btnRight) {
        btnRight.addEventListener('touchstart', (e) => {
            e.preventDefault();
            touchControls.right = true;
        });
        btnRight.addEventListener('touchend', (e) => {
            e.preventDefault();
            touchControls.right = false;
        });
    }
    
    if (btnJump) {
        btnJump.addEventListener('touchstart', (e) => {
            e.preventDefault();
            touchControls.jump = true;
        });
        btnJump.addEventListener('touchend', (e) => {
            e.preventDefault();
            touchControls.jump = false;
        });
    }
    
    if (btnEnter) {
        btnEnter.addEventListener('touchstart', (e) => {
            e.preventDefault();
            touchControls.enter = true;
            touchControls.down = true;
        });
        btnEnter.addEventListener('touchend', (e) => {
            e.preventDefault();
            touchControls.enter = false;
            touchControls.down = false;
        });
    }
}

setupMobileControls();

// Kaboom Game
function startGame() {
    kaboom({
        global: true,
        fullscreen: true,
        scale: 2,
        clearColor: [0, 0, 0, 1]
    });

    // Speed Identifiers
    const moveSpeed = 120;
    const jumpForce = 360;
    const bigJumpForce = 550;
    let currentJumpforce = jumpForce;
    const fallDeath = 400;
    const enemySpeed = 20;

    // Game Variable
    let isJumping = true;

    loadRoot('https://i.imgur.com/');
    loadSprite('coin', 'wbKxhcd.png');
    loadSprite('evil-shroom', 'KPO3fR9.png');
    loadSprite('brick', 'pogC9x5.png');
    loadSprite('block', 'M6rwarW.png');
    loadSprite('mushroom', '0wMd92p.png');
    loadSprite('surprise', 'gesQ1KP.png');
    loadSprite('unboxed', 'bdrLpi6.png');
    loadSprite('pipe-top-left', 'ReTPiWY.png');
    loadSprite('pipe-top-right', 'hj2GK4n.png');
    loadSprite('pipe-bottom-left', 'c1cYSbt.png');
    loadSprite('pipe-bottom-right', 'nqQ79eI.png');
    loadSprite('blue-block', 'fVscIbn.png');
    loadSprite('blue-brick', '3e5YRQd.png');
    loadSprite('blue-steel', 'gqVoI2b.png');
    loadSprite('blue-evil-mushroom', 'SvV4ueD.png');
    loadSprite('blue-surprise', 'RMqCc1G.png');

    scene("game", ({ level, score }) => {
        layers(["bg", "obj", "ui"], "obj");

        const maps = [
            [
                '                                          ',
                '                                          ',
                '                                          ',
                '                                          ',
                '                                          ',
                '   %  =*=%=                               ',
                '                                          ',
                '                           -+             ',
                '                   ^     ^     ()         ',
                '==============================    ====='
            ],
            [
                '                                                            ',
                '                                                                   ',
                '                     z======z=======                                ',
                '                                          =====   # xx    x  %     ',
                '                                          ',
                '   %  =*=%=                 "!!!!!!!zzz^^====="     %               ',
                '                                                                    ',
                '                           -+             ',
                '                   ^     ^                               ()         ',
                '==========      =zz=======      ======    ======    ==          ===',
                '£                                                              £',
                '£                                                    %%        £',
                '£                                                              £',
                '£                      !                                       £',
                '£                                                              £',
                '£   @@@@@@                   **    x x                         £',
                '£                                x x x     %                   £',
                '£                              x x x x      x                -+£',
                '£                   z     z   x x x x       x                ()£',
                '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'
            ],
            [
                '£                                                              £',
                '£                 %                                   %%        £',
                '£    xxxxxxx                                                         £',
                '£         xxx             !                                       £',
                '£                                                              £',
                '£   @@@@@@        xxx           **    x x                         £',
                '£                                x x x     %                   £',
                '£      xxxxxx                        x x x x      x                -+£',
                '£                   z     z   x x x x       x                  £',
                '!!!!!    !!!!!  !!!!!!!!       !!!!!!!!!!!!!!   !!  !! z!!!!!!!!',
                '£                                                              £',
                '£   xxxxx                   **    x x                         £',
                '£                                x x x     %                 ()£',
                '£                              x x x x      x    zzz         -+£',
                '£                   z     z  @@@@@@@@@     x                 ()£',
                '!!!!!!!!!!     !!!!!!!!       !!!!!!!!!!!!!!   !!  !!  z!!!!!!!!'
            ],
            [
                '                                                            ',
                '                                                                   ',
                '                     z======z=======                                ',
                '                                          =====   # xx    x  %     ',
                '                                          ',
                '   %  =*=%=                 "!!!!!!!zzz^^====="     %               ',
                '              zzzzzzzzz                                                      ',
                '                           -+             ',
                '                   ^     ^                               ()         ',
                '==========      =zz=======      ======    ======    ==          ===',
                '£                                                              £',
                '£                                                    %%        £',
                '£            ###         %                                                  £',
                '£                      !                                       £',
                '£                                                              £',
                '£   @@@@@@                   **    x x                         ()£',
                '£                                x x x     %                   £',
                '£                              x x x x      x                -+£',
                '£                   z     z   x x x x       x                  ()£',
                '!!!!!!!!!!     !!!!!! !!!!!!!!!!!! !!!!!!!!!!!!!!!!         zzz    !!'
            ],
            [
                '                                                            ',
                '                                                                   ',
                '                     z======z=======                                ',
                '                                          =====   # xx    x  %     ',
                '                                          ',
                '   %  =*=%=                 "!!!!!!!zzz^^====="     %               ',
                '                                                                    ',
                '                           -+             ',
                '                   ^     ^                               ()         ',
                '==========      =zz=======      ======    ======    ==          ===',
                '£                                                              £',
                '£                                                    %%        £',
                '£                                                              £',
                '£                      !                                       £',
                '£                                                              £',
                '£   @@@@@@                   **    x x                         £',
                '£                                x x x     %                   £',
                '£                              x x x x      x                -+£',
                '£                   z     z   x x x x       x                  £',
                '!!!!!!!      !!!!!!!!!!!!!      zz!!!!!!!!!!!!!!!!                  !!!!!!!!!!!'
            ]
        ];

        const levelCfg = {
            width: 20,
            height: 20,
            '=': [sprite('block'), solid()],
            '$': [sprite('coin'), 'coin'],
            '%': [sprite('surprise'), solid(), 'coin-surprise'],
            '*': [sprite('surprise'), solid(), 'mushroom-surprise'],
            '}': [sprite('unboxed'), solid()],
            '(': [sprite('pipe-bottom-left'), solid(), scale(0.5)],
            ')': [sprite('pipe-bottom-right'), solid(), scale(0.5)],
            '-': [sprite('pipe-top-left'), solid(), scale(0.5), 'pipe'],
            '+': [sprite('pipe-top-right'), solid(), scale(0.5), 'pipe'],
            '^': [sprite('evil-shroom'), solid(), 'dangerous'],
            '#': [sprite('mushroom'), solid(), 'mushroom', body()],
            '!': [sprite('blue-block'), solid(), scale(0.5)],
            '£': [sprite('blue-brick'), solid(), scale(0.5)],
            'z': [sprite('blue-evil-mushroom'), solid(), scale(0.5), 'dangerous'],
            '@': [sprite('blue-surprise'), solid(), scale(0.5), 'coin-surprise'],
            'x': [sprite('blue-brick'), solid(), scale(0.5)]
        };

        const gameLevel = addLevel(maps[level], levelCfg);

        const scoreLabel = add([
            text(score),
            pos(30, 6),
            layer('ui'),
            {
                value: score
            }
        ]);

        add([text('Level ' + parseInt(level + 1) + '/5'), pos(40, 6)]);

        const player = add([
            sprite('evil-shroom'),
            pos(30, 0),
            body(),
            origin('bot'),
            big()
        ]);

        function big() {
            let timer = 0;
            let isBig = false;
            return {
                update() {
                    if (isBig) {
                        currentJumpforce = bigJumpForce;
                        timer -= dt();
                        if (timer <= 0) {
                            this.smallify();
                        }
                    }
                },
                isBig() {
                    return isBig;
                },
                smallify() {
                    this.scale = vec2(1);
                    currentJumpforce = jumpForce;
                    timer = 0;
                    isBig = false;
                },
                biggify(time) {
                    this.scale = vec2(2);
                    timer = time;
                    isBig = true;
                }
            };
        }

        player.on("headbump", (obj) => {
            if (obj.is('coin-surprise')) {
                gameLevel.spawn('$', obj.gridPos.sub(0, 1));
                destroy(obj);
                gameLevel.spawn('}', obj.gridPos.add(0, 0));
            }
            if (obj.is('mushroom-surprise')) {
                gameLevel.spawn('#', obj.gridPos.sub(0, 1));
                destroy(obj);
                gameLevel.spawn('}', obj.gridPos.add(0, 0));
            }
        });

        action('mushroom', (m) => {
            m.move(20, 0);
        });

        player.collides('mushroom', (m) => {
            destroy(m);
            player.biggify(6);
        });

        player.collides('coin', (c) => {
            destroy(c);
            scoreLabel.value++;
            scoreLabel.text = scoreLabel.value;
        });

        action('dangerous', (d) => {
            d.move(-enemySpeed, 0);
        });

        player.collides('dangerous', (d) => {
            if (isJumping) {
                destroy(d);
            } else {
                go('lose', { score: scoreLabel.value });
            }
        });

        player.action(() => {
            camPos(player.pos);
            if (player.pos.y >= fallDeath) {
                go('lose', { score: scoreLabel.value });
            }
        });

        // PIPE TOUCH TO WIN LEVEL
        let onPipe = false;
        player.collides('pipe', () => {
            onPipe = true;
        });

        keyPress('down', () => {
            if (onPipe) {
                go('game', {
                    level: (level + 1) % maps.length,
                    score: scoreLabel.value
                });
            }
        });

        keyPress('enter', () => {
            if (onPipe) {
                go('game', {
                    level: (level + 1) % maps.length,
                    score: scoreLabel.value
                });
            }
        });

        keyDown('left', () => {
            player.move(-moveSpeed, 0);
        });

        keyDown('right', () => {
            player.move(moveSpeed, 0);
        });

        player.action(() => {
            if (player.grounded()) {
                isJumping = false;
            }
        });

        keyPress('space', () => {
            if (player.grounded()) {
                isJumping = true;
                player.jump(currentJumpforce);
            }
        });

        // Mobile touch controls
        player.action(() => {
            // Camera follows player on mobile
            camPos(player.pos);
            
            if (touchControls.left) {
                player.move(-moveSpeed, 0);
            }
            if (touchControls.right) {
                player.move(moveSpeed, 0);
            }
            if (touchControls.jump && player.grounded()) {
                isJumping = true;
                player.jump(currentJumpforce);
                touchControls.jump = false;
            }
            // Mobile pipe entry
            if ((touchControls.enter || touchControls.down) && onPipe) {
                go('game', {
                    level: (level + 1) % maps.length,
                    score: scoreLabel.value
                });
                touchControls.enter = false;
                touchControls.down = false;
            }
        });
    });

    scene('lose', ({ score }) => {
        add([text('GAME OVER', 32), origin('center'), pos(width() / 2, height() / 2 - 30)]);
        add([text('Score: ' + score, 24), origin('center'), pos(width() / 2, height() / 2 + 10)]);
        add([text('Press SPACE to restart', 16), origin('center'), pos(width() / 2, height() / 2 + 50)]);

        keyPress('space', () => {
            go('game', { level: 0, score: 0 });
        });
    });

    start("game", { level: 0, score: 0 });
}

startGame();
