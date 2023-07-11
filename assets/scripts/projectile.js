import {assets} from './globals.js'

export class Projectile extends PIXI.Container{

    speed = 10;
    active = true;

    /**
     * @param {PIXI.Point} src Punto sorgente
     * @param {PIXI.DisplayObject} target Punto destinazione
     */
    constructor(src, target){
        super();

        const projectile = new PIXI.AnimatedSprite(assets.projectile.animations['projectile']);
        projectile.animationSpeed = 0.15;
        projectile.anchor.set(0.5);
        projectile.play();
        this.addChild(projectile);
        projectile.rotation = Math.atan2(target.y - src.y, target.x - src.x);
        this.projectile = projectile;

        const impact = new PIXI.AnimatedSprite(assets.impact.animations['impact']);
        impact.visible = false;
        impact.animationSpeed = 0.15;
        impact.loop = false;
        this.addChild(impact);
        impact.y = -32;
        impact.x = -16;
        this.impact = impact;
        

        this.position.copyFrom(src);
        this.target = target;
    }

    update(delta){

        if(this.active){
            if(this.target.getBounds().contains(this.x, this.y)){

                this.active = false
                this.projectile.destroy();
                this.impact.visible = true;
                this.impact.play();
                this.impact.onComplete = () => this.destroy();
            }else{
                this.projectile.rotation = Math.atan2(this.target.y - this.y, this.target.x - this.x);
                this.x += Math.cos(this.projectile.rotation) * this.speed * delta;
                this.y += Math.sin(this.projectile.rotation) * this.speed * delta;
            }
        }
    }
}