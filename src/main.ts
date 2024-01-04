// The size and coordinate of a block.
interface BlockCoord {
    x: number;
    y: number;
    width: number;
    height: number;
}

enum BlockType {
    Empty,
    Wall,
}

// A single block occupies 10px. It could be a wall, pellet,
// or spawning area. The screen should be adjusted to accomodate
// with the amount of block that exists.
class Block {
    private type: BlockType;
    private coord: BlockCoord;

    constructor(type: BlockType, x: number, y: number) {
        this.type = type;
        
        // Width and height are fixed in size.
        this.coord = { x: x, y: y, width: 10, height: 10 };
    }

    public draw(context: CanvasRenderingContext2D) {
        if (this.type == BlockType.Wall) {
            context.fillRect(this.coord.x * this.coord.width,
                this.coord.y * this.coord.height, this.coord.width,
                this.coord.height);
        }
        
        // TODO: This might cause a bug.
        if (this.type == BlockType.Empty) {
            context.clearRect(this.coord.x * this.coord.width,
                this.coord.y * this.coord.height, this.coord.width,
                this.coord.height)
        }

        // context.beginPath();
        // context.closePath();
    }

    public changeType(type: BlockType) {
        this.type = type;
    }
}

class FoodManApp {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    private blocks: Block[][] = [];
    // private paint: boolean;

    // private clickX: number[] = [];
    // private clickY: number[] = [];
    // private clickDrag: boolean[] = [];

    constructor() {
        let canvas = document.getElementById("canvas") as HTMLCanvasElement;
        let context = canvas.getContext("2d") as CanvasRenderingContext2D;

        context.lineCap = "round";
        context.lineJoin = "round";
        context.strokeStyle = "black";
        context.lineWidth = 1;

        this.canvas = canvas;
        this.context = context;

        // Initiate empty blocks using width and height.
        let blockWidthAmount = (canvas.width - (canvas.width % 10)) / 10;
        let blockHeightAmount = (canvas.height - (canvas.height % 10)) / 10;
        
        for (let x = 0; x < blockWidthAmount; x++) {
            this.blocks[x] = [];
            for (let y = 0; y < blockHeightAmount; y++) {
                this.blocks[x][y] = new Block(BlockType.Empty, x, y);
            }
        }

        // Random block test. IT WORKS!
        // this.blocks[1][3].changeType(BlockType.Wall);
        // this.blocks[6][8].changeType(BlockType.Wall);
        // this.blocks[10][3].changeType(BlockType.Wall);
        // this.blocks[33][21].changeType(BlockType.Wall);

        // Block all the borders.
        let wallReplace = (block, index, arr) => {
            //block.changeType(BlockType.Wall);
            arr[index].changeType(BlockType.Wall);
        };

        // X is vertical, and Y is horizontal.
        this.blocks[0].forEach(wallReplace);
        this.blocks[blockWidthAmount - 1].forEach(wallReplace);

        for (let x = 0; x < blockWidthAmount; x++) {
            this.blocks[x][0].changeType(BlockType.Wall);
            this.blocks[x][blockHeightAmount - 1].changeType(BlockType.Wall);
        }

        // TODO: Need separate file for mapping. Possibly json.
        // Because everything was set as blocks, it was best that
        // the maps were made in separate file. This makes things
        // easier when we need to, say, create different maps.
        // 
        // Do keep in mind that








        this.redraw();
        this.createUserEvents();
    }

    private createUserEvents() {
        let canvas = this.canvas;
        
        // canvas.addEventListener("mousedown", this.pressEventHandler);
        // canvas.addEventListener("mousemove", this.dragEventHandler);
        // canvas.addEventListener("mouseup", this.releaseEventHandler);
        // canvas.addEventListener("mouseout", this.cancelEventHandler);

        // canvas.addEventListener("touchstart", this.pressEventHandler);
        // canvas.addEventListener("touchmove", this.dragEventHandler);
        // canvas.addEventListener("touchend", this.releaseEventHandler);
        // canvas.addEventListener("touchcancel", this.cancelEventHandler);

    }

    private redraw() {
        for (let x = 0; x < this.blocks.length; x++) {
            for (let y = 0; y < this.blocks[x].length; y++) {
                this.blocks[x][y].draw(this.context);
            }
        }

        // let clickX = this.clickX;
        // let context = this.context;
        // let clickDrag = this.clickDrag;
        // let clickY = this.clickY;

        // for (let i = 0; i < clickX.length; ++i) {
        //     context.beginPath();
        //     if (clickDrag[i] && i) {
        //         context.moveTo(clickX[i - 1], clickY[i - 1]);
        //     } else {
        //         context.moveTo(clickX[i] - 1, clickY[i]);
        //     }

        //     context.lineTo(clickX[i], clickY[i]);
        //     context.stroke();
        // }
        // context.closePath();
    }

    // private addClick(x: number, y: number, dragging: boolean) {
    //     this.clickX.push(x);
    //     this.clickY.push(y);
    //     this.clickDrag.push(dragging);
    // }

    // private releaseEventHandler = () => {
    //     this.paint = false;
    //     this.redraw();
    // };

    // private cancelEventHandler = () => {
    //     this.paint = false;
    // };

    // private pressEventHandler = (e: MouseEvent | TouchEvent) => {
    //     let mouseX = (e as TouchEvent).changedTouches ?
    //                  (e as TouchEvent).changedTouches[0].pageX :
    //                  (e as MouseEvent).pageX;
    //     let mouseY = (e as TouchEvent).changedTouches ?
    //                  (e as TouchEvent).changedTouches[0].pageY :
    //                  (e as MouseEvent).pageY;
    //     mouseX -= this.canvas.offsetLeft;
    //     mouseY -= this.canvas.offsetTop;

    //     this.paint = true;
    //     this.addClick(mouseX, mouseY, false);
    //     this.redraw();
    // };

    // private dragEventHandler = (e: MouseEvent | TouchEvent) => {
    //     let mouseX = (e as TouchEvent).changedTouches ?
    //                  (e as TouchEvent).changedTouches[0].pageX :
    //                  (e as MouseEvent).pageX;
    //     let mouseY = (e as TouchEvent).changedTouches ?
    //                  (e as TouchEvent).changedTouches[0].pageY :
    //                  (e as MouseEvent).pageY;
    //     mouseX -= this.canvas.offsetLeft;
    //     mouseY -= this.canvas.offsetTop;

    //     if (this.paint) {
    //         this.addClick(mouseX, mouseY, true);
    //         this.redraw();
    //     }
    //     e.preventDefault();
    // };
}

new FoodManApp();
