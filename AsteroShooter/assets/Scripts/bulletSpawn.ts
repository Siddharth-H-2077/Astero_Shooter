import { _decorator, Component, instantiate, macro, Node, Prefab } from 'cc';
import { playerController } from './playerController';
const { ccclass, property } = _decorator;

@ccclass('bulletSpawn')
export class bulletSpawn extends Component {
    @property
    ({
        type:Prefab,
        tooltip:'Bullet Prefab goes here'
    })
    private bulletPrefab=null;
    
    @property
    ({
        type:Node,
        tooltip:'player controller needed to reference the player location to the spawned bullets'
    })

    private playerRef:Node;

    shootBullet()
    {
        //instansiates the bullet
        var bullet=instantiate(this.bulletPrefab);
        //places the instansiated object on screen
        bullet.setWorldPosition(this.playerRef.getPosition().x,this.playerRef.getPosition().y+50,0);
        //loads the instansiated boi on screen
        this.node.parent.addChild(bullet);
        //console.log("+1 bullet on screen");
    }     

    onLoad() 
    {
        //wasnt able find a way make a coroutine...this was the only example i saw that allows forever spawn of bullet
        //params: callback function, rate of fire, how long to repeat,delay 
        this.schedule(this.shootBullet,0.5,macro.REPEAT_FOREVER,0);
    }

}


