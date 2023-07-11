export class Enemy extends PIXI.Container{
    constructor(){
        super();

        const graphics = new PIXI.Graphics();
        graphics.beginFill(0xDE3249);
        graphics.drawRect(-25, -25, 50, 50);
        graphics.endFill();

        this.addChild(graphics);

        this.elapsed = 0;
    }

    update(delta){
        this.elapsed += delta;
        this.x += Math.sin(this.elapsed / 10)*10;
        this.y += Math.cos(this.elapsed / 10)*10;
    }
}