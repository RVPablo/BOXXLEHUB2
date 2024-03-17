let countPlayer = 0;
let countBox = 0;
let countTarget = 0;
let countTargetOk = 0;
let cordTargetX = []
let cordTargetY = []
let moveTimes = 0;
let currLevel = [];


function initMap() {
    let map1 = document.getElementById('map1');
    currLevel = JSON.parse(JSON.stringify(levels[nlevel]));
    map1.innerHtml = '';
    while (map1.firstChild) {
        map1.removeChild(map1.firstChild)
    }

    cordTargetX = [];
    cordTargetY = [];
    countTarget = 0;
    countBox = 0;
    countPlayer = 0;
    countTargetOk = 0;
    moveTimes = 0;

    for (let i = 0; i < 16; i++) {
        let col = document.createElement("div");
        col.id = "col" + i;
        map1.appendChild(col);
        for (let j = 0; j < 16; j++) {
            let cellule = document.createElement("div");
            cellule.className = "colcase";
            cellule.id = "cell" + j + "-" + i;

            let imageFileName;

            switch (levels[nlevel][j][i]) {
                case EMPTY:
                    imageFileName = "pictures/nice grass.jpg";
                    break;
                case WALL:
                    imageFileName = "pictures/nice wall (1).jpg";
                    break;
                case TARGET:
                    countTarget++;
                    imageFileName = "pictures/cross.jpg";
                    cordTargetX[countTarget] = i;
                    cordTargetY[countTarget] = j;
                    break;
                case BOX:
                    countBox++;
                    imageFileName = "pictures/tonneu.jpg";
                    break;
                case PLAYER:
                    countPlayer++;
                    imageFileName = "pictures/steve.jpg";
                    break;
            }

            let image1 = new Image();
            image1.src = imageFileName;
            cellule.appendChild(image1);

            col.appendChild(cellule);
        }
    }
    if ((countBox != countTarget) || (countPlayer != 1)) {
        map1.innerHtml = '';
        while (map1.firstChild) {
            map1.removeChild(map1.firstChild)
        }

        let messageError = document.createElement("div");
        messageError.className = "msgerr";
        if (countBox != countTarget) {
            messageError.innerHTML = "This level doesnt work, you have " + countBox + " boxes and " + countTarget + " targets. <br/>";
        }
        if (countPlayer != 1) {
            messageError.innerHTML = messageError.innerHTML + "Problem on this level, you have " + countPlayer + " player, You must just have one player.";
        }
        map1.appendChild(messageError);
    }
}


function drawBlock(nextY, nextX, prevVal) {
    let cellule = document.getElementById('cell' + nextY + "-" + nextX);
    cellule.innerHTML = "";

    switch (prevVal) {
        case EMPTY:
            imageFileName = "pictures/nice grass.jpg";
            break;
        case WALL:
            imageFileName = "pictures/nice wall (1).jpg";
            break;
        case TARGET:
            imageFileName = "pictures/cross.jpg";
            break;
        case BOX:
            imageFileName = "pictures/tonneu.jpg";
            break;
        case PLAYER:
            imageFileName = "pictures/steve.jpg";
            break;
    }

    let image1 = new Image();
    image1.src = imageFileName;
    cellule.appendChild(image1);
}


function changeLevel(i) {

    nlevel = nlevel + i;
    if (nlevel < 0) {
        nlevel = 0;
        return;
    }
    let len = levels.length;
    if (nlevel > len - 1) {
        nlevel = len - 1;
    }
    initMap();
    playerFirstPos();
}

initMap();