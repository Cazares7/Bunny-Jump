//VARIABLES
var gameCanvas = document.getElementById('graphics');
var graphX = gameCanvas.getContext('2d');
var boxCollider = new BoxCollider(16, 32, 0, 4);
var player = new Object("Images/Character/adventurer-idle-00.png", 100, 100, boxCollider);
var block = new Object("Images/Tileset/block.png", 110, 300, new BoxCollider(16, 16, 0, 0));
var isLeft = false;
var isRight = false;
var isSpace = false;
player.Velocity_Y = 0;
player.Gravity = 20;
player.Weight = 0.1;

//EVENTS
function keyDown(e) {
    if (String.fromCharCode(e.keyCode) == "'") isRight = true;

    if (String.fromCharCode(e.keyCode) == "%") isLeft = true;

    if (String.fromCharCode(e.keyCode) == " ") isSpace = true;

    //  console.log('Floom');
}
function keyUp(e) {
    if (String.fromCharCode(e.keyCode) == "'") isRight = false;

    if (String.fromCharCode(e.keyCode) == "%") isLeft = false;

    if (String.fromCharCode(e.keyCode) == " ") isSpace = false;

}

MainLoop();
function MainLoop() {
    //Pre variable adjustments


    //LOGIC
    if (isLeft) player.Velocity_X = -3;
    if (isRight) player.Velocity_X = 3;
    if (!isLeft && !isRight) player.Velocity_X = 0;

    if (player.Velocity_Y < player.Gravity) player.Velocity_Y += player.Weight;

    if (player.isColliding(block) && (player.y + player.collider.y_Offset) + player.collider.height < block.y + player.Velocity_Y + player.collider.y_Offset) {
        player.y = block.y - player.collider.height;
        player.y -= player.collider.y_Offset;

        player.Velocity_Y = 0;
    }

    if (isSpace && player.Velocity_Y == 0) {
        player.Velocity_Y = -5;
    }

    player.x += player.Velocity_X;
    player.y += player.Velocity_Y;

    graphX.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    graphX.drawImage(player.Sprite, player.x, player.y);
    graphX.drawImage(block.Sprite, block.x, block.y);

    setTimeout(MainLoop, 1000 / 60);
}

function Object(img, _x, _y, _boxCollider) {
    this.Sprite = new Image();
    this.Sprite.src = img;
    this.x = _x;
    this.y = _y;
    this.collider = _boxCollider;
    this.Previous_X;
    this.Previous_Y;
    this.Velocity_X;
    this.Velocity_Y;
    this.Gravity = 0;
    this.Weight = 0;

    this.isColliding = function (obj) {
        if ((this.x + this.collider.x_Offset) > (obj.x + obj.collider.x_Offset) + obj.collider.width)
            return false;
        if ((this.x + this.collider.x_Offset) + this.collider.width < (obj.x + obj.collider.x_Offset))
            return false;
        if ((this.y + this.collider.y_Offset) > (obj.y + obj.collider.y_Offset) + obj.collider.height)
            return false;
        if ((this.y + this.collider.y_Offset) + this.collider.height < (obj.y + obj.collider.y_Offset))
            return false;

        return true;
    }
}

function BoxCollider(_width, _height, _x_Offset, _y_Offset) {
    this.width = _width;
    this.height = _height;
    this.x_Offset = _x_Offset;
    this.y_Offset = _y_Offset;
}