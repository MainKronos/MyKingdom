import {assets} from './globals.js'
import {Projectile} from './projectile.js'

export class Tower extends PIXI.Container{

    constructor(){
        super();

        const tower = new PIXI.Sprite(assets.tower.textures['tower_lvl1']);
        tower.anchor.set(0.5);
        tower.y=9;
        this.addChild(tower);

        const weapon = new PIXI.AnimatedSprite(assets.weapon.animations["weapon"]);
        weapon.anchor.set(0.5);
        weapon.onComplete = () => weapon.currentFrame = 0;
        weapon.animationSpeed = 0.5;
        weapon.loop = false;
        this.weapon = weapon;
        this.addChild(weapon);
    }
    
    /**
     * @param {PIXI.DisplayObject} target Bersaglio 
     */
    async shoot(target){
        let pos = this.toGlobal(new PIXI.Point(0,0));
        this.weapon.rotation = Math.atan2(pos.y - target.y, pos.x - target.x);

        return new Promise((resolve) => {
            this.weapon.onFrameChange = (currentFrame) => {
                if(currentFrame == 2)
                    resolve(new Projectile(pos, target));
            };
            this.weapon.play();
        });
    }
}