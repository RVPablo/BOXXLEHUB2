let done = false;
let movable = true;
let winLevel = false;
let currkeypress;
let currX, currY;
let nextCurrX, nextCurrY;
let tCoordX = [];
let tCoordY = [];
let indexBlock = 0;
let player = PLAYER;

function playerFirstPos() {
    for (let i = 0; i < levels[nlevel].length; i++) {
        for (let j = 0; j < levels[nlevel][i].length; j++) {
            if (levels[nlevel][i][j] === player) {
                currX = j;
                currY = i;
                return true;
            }
        }
    }
}

function getPrevVal(prevCoordX, prevCoordY, prevVal) {
    for (let i = 1; i <= cordTargetX.length; i++) {
        if (prevCoordX == cordTargetX[i]) {
            if (prevCoordY == cordTargetY[i]) {
                return TARGET;
            }
        }
    }
    return EMPTY;
}

function step(timestamp) {
    if (!done) {
        tCoordX[indexBlock] = nextCurrX;
        tCoordY[indexBlock] = nextCurrY;

        switch (currkeypress) {
            case "up":
                nextCurrY = nextCurrY - 1;
                break;
            case "down":
                nextCurrY = nextCurrY + 1;
                break;
            case "left":
                nextCurrX = nextCurrX - 1;
                break;
            case "right":
                nextCurrX = nextCurrX + 1;
                break;
        }

        let nextCellContent = currLevel[nextCurrY][nextCurrX];

        var prevX, prevY;
        if (indexBlock > 0) {
            prevX = tCoordX[indexBlock - 1];
            prevY = tCoordY[indexBlock - 1];
        }

        if (nextCellContent === BOX) {
            if (indexBlock > 0) {
                let otherVal = currLevel[nextCurrY][nextCurrX];
                if (otherVal === BOX) {
                    movable = false;
                    done = true;
                }
            }
            indexBlock++;
            tCoordX[indexBlock] = nextCurrX;
            tCoordY[indexBlock] = nextCurrY;
        } else if ((nextCellContent === 0) || (nextCellContent === 4)) {
            indexBlock++;
            tCoordX[indexBlock] = nextCurrX;
            tCoordY[indexBlock] = nextCurrY;
            movable = true;
            done = true;
        } else if (nextCellContent === 1) {
            movable = false;
            done = true;
        }

        step(timestamp + indexBlock);
    }

    if (done && movable) {
        if (indexBlock > 0) {
            prevX = tCoordX[indexBlock - 1];
            prevY = tCoordY[indexBlock - 1];
            prevVal = currLevel[prevY][prevX];
            curVal = currLevel[tCoordY[indexBlock]][tCoordX[indexBlock]];

            if (prevVal == BOX && curVal == TARGET) {
                countTargetOk++;
            }

            prevSubVal = getPrevVal(prevX, prevY, "");

            if (prevVal == BOX && prevSubVal == TARGET) {
                countTargetOk--;
            }
            if (countTargetOk == countTarget) {
                winLevel = true;
            }
        } else {
            prevX = tCoordX[indexBlock];
            prevY = tCoordY[indexBlock];
            prevVal = getPrevVal(prevX, prevY, EMPTY);
            moveTimes++;
            if (winLevel) {
                winLevel = false;
                alert("Well done, you've won !");
                changeLevel(1);
            }
        }

        nextX = tCoordX[indexBlock];
        nextY = tCoordY[indexBlock];
        currLevel[nextY][nextX] = prevVal;

        drawBlock(nextY, nextX, prevVal);

        if (indexBlock > 0) {
            currX = nextX;
            currY = nextY;
            indexBlock--;
        }
        return true;
    } else if (indexBlock == 0) {
    }
}

document.onkeydown = checkKey;
function checkKey(e) {
    nextCurrX = currX;
    nextCurrY = currY;
    tCoordX = [];
    tCoordY = [];
    indexBlock = 0;

    if (e.keyCode == '38') {
        currkeypress = "up";
        window.requestAnimationFrame(step);
    }
    else if (e.keyCode == '40') {
        currkeypress = "down";
        window.requestAnimationFrame(step);
    }
    else if (e.keyCode == '37') {
        currkeypress = "left";
        window.requestAnimationFrame(step);
    }
    else if (e.keyCode == '39') {
        currkeypress = "right";
        window.requestAnimationFrame(step);
    }
    done = false;
}

playerFirstPos();
