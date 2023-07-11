import {assets} from './globals.js'
import {Tower} from './tower.js'
import {Enemy} from './enemy.js'
import {Projectile} from './projectile.js'

async function start(){
    const app = new PIXI.Application({ resizeTo: window });
    document.body.appendChild(app.view);

    await loadAssets();

    const texture = PIXI.Texture.from('assets/images/background/grass.png');
    const tilingSprite = new PIXI.TilingSprite(
        texture,
        app.screen.width,
        app.screen.height,
    );
    app.stage.addChild(tilingSprite);

    

    const tower = new Tower();
    tower.position.set(window.innerWidth / 2, window.innerHeight / 2);
    app.stage.addChild(tower);

    const enemy = new Enemy();
    app.stage.addChild(enemy);

    app.renderer.view.addEventListener('mousedown', (event) => {
        enemy.x = event.x;
        enemy.y = event.y;
        tower.shoot(enemy)
        .then((projectile) => app.stage.addChild(projectile));
    });

    

    
    app.ticker.add((delta) => {
        for(const obj of app.stage.children){
            if(obj.destroyed){
                app.stage.removeChild(obj);
            }else{
                if(obj instanceof Projectile || obj instanceof Enemy)
                    obj.update(delta);
            }            
        }
    });

}

async function loadAssets(){
    assets.tower = await PIXI.Assets.load('assets/images/tower/tower.json');
    assets.weapon = await PIXI.Assets.load('assets/images/tower/weapon.json');
    assets.projectile = await PIXI.Assets.load('assets/images/tower/projectile.json');
    assets.impact = await PIXI.Assets.load('assets/images/tower/impact.json');
}

// Call start
(async() => {await start();})();