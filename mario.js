// Show mobile controls on touch devices
if ('ontouchstart' in window) {
    document.getElementById('mobile-controls').classList.remove('hidden');
}

// Mobile Touch Controls
let touchControls = {
    left: false,
    right: false,
    jump: false,
    enter: false
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
            setTimeout(() => touchControls.enter = false, 200);
        });
    }
}

// Start game immediately
startGame();

// Kaboom Game
function startGame() {
    kaboom({
        global: true,
        fullscreen: true,
        scale: 2,
        clearColor: [0, 0, 0, 1]
    });

    // Speed Identifiers - Progressive difficulty
    const levelConfig = [
        { moveSpeed: 120, jumpForce: 360, enemySpeed: 20, fallDeath: 400 }, // Level 1
        { moveSpeed: 130, jumpForce: 370, enemySpeed: 30, fallDeath: 450 }, // Level 2
        { moveSpeed: 140, jumpForce: 380, enemySpeed: 40, fallDeath: 500 }, // Level 3
        { moveSpeed: 150, jumpForce: 390, enemySpeed: 50, fallDeath: 550 }, // Level 4
        { moveSpeed: 160, jumpForce: 400, enemySpeed: 60, fallDeath: 600 }  // Level 5
    ];

    const bigJumpForce = 550;
    let currentJumpforce = 360;
    let isJumping = true;

    loadRoot('https://i.imgur.com/');
    loadSprite('coin', 'wbKxhcd.png');
    loadSprite('red-bird', 'KPO3fR9.png'); // Red player bird
    loadSprite('blue-bird', 'SvV4ueD.png'); // Blue enemy bird
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
    loadSprite('blue-surprise', 'RMqCc1G.png');

    scene("game", ({ level, score }) => {
        layers(["bg", "obj", "ui"], "obj");

        // 5 Progressive Levels
        const maps = [
            // LEVEL 1 - Easy
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
            // LEVEL 2 - Medium
            [
                '                                                            ',
                '                                                            ',
                '                     z======z=======                        ',
                '                                    =====   # xx    x  %    ',
                '                                                            ',
                '   %  =*=%=                 !!!!!!!!zzz^^====     %         ',
                '                                                            ',
                '                           -+                               ',
                '                   ^     ^                         ()       ',
                '==========      =zz=======      ======    ======  ==     ===',
                '£                                                          £',
                '£                                               %%         £',
                '£                                                          £',
                '£                      !                                   £',
                '£                                                          £',
                '£   @@@@@@                   **    x x                     £',
                '£                                x x x     %               £',
                '£                              x x x x      x            -+£',
                '£                   z     z   x x x x       x            ()£',
                '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'
            ],
            // LEVEL 3 - Hard
            [
                '£                                                          £',
                '£                 %                              %%        £',
                '£    xxxxxxx                                               £',
                '£         xxx             !                                £',
                '£                                                          £',
                '£   @@@@@@        xxx           **    x x                  £',
                '£                                x x x     %               £',
                '£      xxxxxx                  x x x x      x            -+£',
                '£                   z     z   x x x x       x              £',
                '!!!!!    !!!!!  !!!!!!!!       !!!!!!!!!!!!!!   !!  !! z!!',
                '£                                                          £',
                '£   xxxxx                   **    x x                      £',
                '£                                x x x     %             ()£',
                '£                              x x x x      x    zzz     -+£',
                '£                   z     z  @@@@@@@@@     x             ()£',
                '!!!!!!!!!!     !!!!!!!!       !!!!!!!!!!!!!!   !!  !!  z!!!'
            ],
            // LEVEL 4 - Very Hard
            [
                '                                                            ',
                '                                                            ',
                '                     z======z=======                        ',
                '                                    =====   # xx    x  %    ',
                '                                                            ',
                '   %  =*=%=                 !!!!!!!!zzz^^====     %         ',
                '              zzzzzzzzz                                     ',
                '                           -+                               ',
                '                   ^     ^                         ()       ',
                '==========      =zz=======      ======    ======  ==     ===',
                '£                                                          £',
                '£                                               %%         £',
                '£            ###         %                                 £',
                '£                      !                                   £',
                '£                                                          £',
                '£   @@@@@@                   **    x x                   ()£',
                '£                                x x x     %               £',
                '£                              x x x x      x            -+£',
                '£                   z     z   x x x x       x            ()£',
                '!!!!!!!!!!     !!!!!! !!!!!!!!!!!! !!!!!!!!!!!!!  zzz     !!'
            ],
            // LEVEL 5 - Expert
            [
                '                                                            ',
                '                                                            ',
                '                     z======z=======                        ',
                '                                    =====   # xx    x  %    ',
                '                                                            ',
                '   %  =*=%=                 !!!!!!!!zzz^^====     %         ',
                '                                                            ',
                '                           -+                               ',
                '                   ^     ^                         ()       ',
                '==========      =zz=======      ======    ======  ==     ===',
                '£                                                          £',
                '£                       zzzzzzzzzzzzzzzzz        %%        £',
                '£                    zzzzzzzzzz                            £',
                '£                      !                                   £',
                'zzzzzzzz£                                                  £',
                '£   @@@@@@                   **    zzzzzzzzzx              £',
                '£                                x x x     zzzz%           £',
                '£                              x x x x      x            -+£',
                '£                   z     z   x x x x       x       zz   ()£',
                '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'
            ]
        ];

        const levelCfg = {
            width: 20,
            height: 20,
            '=': [sprite('block'), solid()],
            '

        const gameLevel = addLevel(maps[level], levelCfg);
        const currentLevel = levelConfig[level];

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
            sprite('red-bird'),
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
                    currentJumpforce = currentLevel.jumpForce;
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
            d.move(-currentLevel.enemySpeed, 0);
        });

        player.collides('dangerous', (d) => {
            if (isJumping) {
                destroy(d);
                scoreLabel.value += 10;
                scoreLabel.text = scoreLabel.value;
            } else {
                go('lose', { score: scoreLabel.value });
            }
        });

        player.action(() => {
            camPos(player.pos);
            if (player.pos.y >= currentLevel.fallDeath) {
                go('lose', { score: scoreLabel.value });
            }
        });

        let onPipe = false;
        let pipeEntered = false;
        
        player.collides('pipe', () => {
            if (!pipeEntered) {
                onPipe = true;
                // Show level complete message
                const levelCompleteMsg = add([
                    text('Level Complete! Press DOWN/ENTER or tap ENTER button', 16),
                    pos(width() / 2, 30),
                    origin('center'),
                    layer('ui'),
                    'levelMsg'
                ]);
                
                setTimeout(() => {
                    destroy(levelCompleteMsg);
                }, 3000);
            }
        });
        
        // Reset onPipe flag when player moves away
        player.action(() => {
            const pipeObjects = get('pipe');
            let nearPipe = false;
            
            pipeObjects.forEach(pipe => {
                const dist = player.pos.dist(pipe.pos);
                if (dist < 50) {
                    nearPipe = true;
                }
            });
            
            if (!nearPipe) {
                onPipe = false;
            }
        });

        // Keyboard controls
        keyDown('left', () => {
            player.move(-currentLevel.moveSpeed, 0);
        });

        keyDown('right', () => {
            player.move(currentLevel.moveSpeed, 0);
        });

        keyPress('down', () => {
            if (onPipe && !pipeEntered) {
                pipeEntered = true;
                if (level + 1 < maps.length) {
                    go('game', {
                        level: level + 1,
                        score: scoreLabel.value
                    });
                } else {
                    go('win', { score: scoreLabel.value });
                }
            }
        });

        keyPress('enter', () => {
            if (onPipe && !pipeEntered) {
                pipeEntered = true;
                if (level + 1 < maps.length) {
                    go('game', {
                        level: level + 1,
                        score: scoreLabel.value
                    });
                } else {
                    go('win', { score: scoreLabel.value });
                }
            }
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
            if (touchControls.left) {
                player.move(-currentLevel.moveSpeed, 0);
            }
            if (touchControls.right) {
                player.move(currentLevel.moveSpeed, 0);
            }
            if (touchControls.jump && player.grounded()) {
                isJumping = true;
                player.jump(currentJumpforce);
                touchControls.jump = false;
            }
            if (touchControls.enter && onPipe && !pipeEntered) {
                pipeEntered = true;
                if (level + 1 < maps.length) {
                    go('game', {
                        level: level + 1,
                        score: scoreLabel.value
                    });
                } else {
                    go('win', { score: scoreLabel.value });
                }
                touchControls.enter = false;
            }
        });
    });

    scene('lose', ({ score }) => {
        add([text('GAME OVER', 32), origin('center'), pos(width() / 2, height() / 2 - 30)]);
        add([text('Score: ' + score, 24), origin('center'), pos(width() / 2, height() / 2 + 10)]);
        add([text('Press SPACE or tap to restart', 16), origin('center'), pos(width() / 2, height() / 2 + 50)]);
        
        keyPress('space', () => {
            go('game', { level: 0, score: 0 });
        });
        
        // Mobile restart
        if ('ontouchstart' in window) {
            window.addEventListener('touchstart', () => {
                go('game', { level: 0, score: 0 });
            }, { once: true });
        }
    });

    scene('win', ({ score }) => {
        add([text('CONGRATULATIONS!', 32), origin('center'), pos(width() / 2, height() / 2 - 50)]);
        add([text('You completed all 5 levels!', 24), origin('center'), pos(width() / 2, height() / 2 - 10)]);
        add([text('Final Score: ' + score, 24), origin('center'), pos(width() / 2, height() / 2 + 30)]);
        add([text('Press SPACE or tap to play again', 16), origin('center'), pos(width() / 2, height() / 2 + 70)]);
        
        keyPress('space', () => {
            go('game', { level: 0, score: 0 });
        });
        
        // Mobile restart
        if ('ontouchstart' in window) {
            window.addEventListener('touchstart', () => {
                go('game', { level: 0, score: 0 });
            }, { once: true });
        }
    });

    start("game", { level: 0, score: 0 });
}
: [sprite('coin'), 'coin'],
            '%': [sprite('surprise'), solid(), 'coin-surprise'],
            '*': [sprite('surprise'), solid(), 'mushroom-surprise'],
            '}': [sprite('unboxed'), solid()],
            '(': [sprite('pipe-bottom-left'), solid(), scale(0.5)],
            ')': [sprite('pipe-bottom-right'), solid(), scale(0.5)],
            '-': [sprite('pipe-top-left'), solid(), scale(0.5), 'pipe'],
            '+': [sprite('pipe-top-right'), solid(), scale(0.5), 'pipe'],
            '^': [sprite('blue-bird'), solid(), 'dangerous', body()],
            '#': [sprite('mushroom'), solid(), 'mushroom', body()],
            '!': [sprite('blue-block'), solid(), scale(0.5)],
            '£': [sprite('blue-brick'), solid(), scale(0.5)],
            'z': [sprite('blue-bird'), solid(), scale(0.5), 'dangerous', body()],
            '@': [sprite('blue-surprise'), solid(), scale(0.5), 'coin-surprise'],
            'x': [sprite('blue-brick'), solid(), scale(0.5)]
        };

        const gameLevel = addLevel(maps[level], levelCfg);
        const currentLevel = levelConfig[level];

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
                    currentJumpforce = currentLevel.jumpForce;
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
            d.move(-currentLevel.enemySpeed, 0);
        });

        player.collides('dangerous', (d) => {
            if (isJumping) {
                destroy(d);
                scoreLabel.value += 10;
                scoreLabel.text = scoreLabel.value;
            } else {
                go('lose', { score: scoreLabel.value });
            }
        });

        player.action(() => {
            camPos(player.pos);
            if (player.pos.y >= currentLevel.fallDeath) {
                go('lose', { score: scoreLabel.value });
            }
        });

        let onPipe = false;
        player.collides('pipe', () => {
            onPipe = true;
            setTimeout(() => {
                onPipe = false;
            }, 100);
        });

        // Keyboard controls
        keyDown('left', () => {
            player.move(-currentLevel.moveSpeed, 0);
        });

        keyDown('right', () => {
            player.move(currentLevel.moveSpeed, 0);
        });

        keyPress('down', () => {
            if (onPipe) {
                if (level + 1 < maps.length) {
                    go('game', {
                        level: level + 1,
                        score: scoreLabel.value
                    });
                } else {
                    go('win', { score: scoreLabel.value });
                }
            }
        });

        keyPress('enter', () => {
            if (onPipe) {
                if (level + 1 < maps.length) {
                    go('game', {
                        level: level + 1,
                        score: scoreLabel.value
                    });
                } else {
                    go('win', { score: scoreLabel.value });
                }
            }
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
            if (touchControls.left) {
                player.move(-currentLevel.moveSpeed, 0);
            }
            if (touchControls.right) {
                player.move(currentLevel.moveSpeed, 0);
            }
            if (touchControls.jump && player.grounded()) {
                isJumping = true;
                player.jump(currentJumpforce);
                touchControls.jump = false;
            }
            if (touchControls.enter && onPipe) {
                if (level + 1 < maps.length) {
                    go('game', {
                        level: level + 1,
                        score: scoreLabel.value
                    });
                } else {
                    go('win', { score: scoreLabel.value });
                }
                touchControls.enter = false;
            }
        });
    });

    scene('lose', ({ score }) => {
        add([text('GAME OVER', 32), origin('center'), pos(width() / 2, height() / 2 - 30)]);
        add([text('Score: ' + score, 24), origin('center'), pos(width() / 2, height() / 2 + 10)]);
        add([text('Press SPACE or tap to restart', 16), origin('center'), pos(width() / 2, height() / 2 + 50)]);
        
        keyPress('space', () => {
            go('game', { level: 0, score: 0 });
        });
        
        // Mobile restart
        if ('ontouchstart' in window) {
            window.addEventListener('touchstart', () => {
                go('game', { level: 0, score: 0 });
            }, { once: true });
        }
    });

    scene('win', ({ score }) => {
        add([text('CONGRATULATIONS!', 32), origin('center'), pos(width() / 2, height() / 2 - 50)]);
        add([text('You completed all 5 levels!', 24), origin('center'), pos(width() / 2, height() / 2 - 10)]);
        add([text('Final Score: ' + score, 24), origin('center'), pos(width() / 2, height() / 2 + 30)]);
        add([text('Press SPACE or tap to play again', 16), origin('center'), pos(width() / 2, height() / 2 + 70)]);
        
        keyPress('space', () => {
            go('game', { level: 0, score: 0 });
        });
        
        // Mobile restart
        if ('ontouchstart' in window) {
            window.addEventListener('touchstart', () => {
                go('game', { level: 0, score: 0 });
            }, { once: true });
        }
    });

    start("game", { level: 0, score: 0 });
}
