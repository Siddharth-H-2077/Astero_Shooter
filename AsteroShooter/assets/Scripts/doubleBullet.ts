import { _decorator, Component, instantiate, macro, Node, Prefab } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('doubleBullet')
export class doubleBullet extends Component {
    
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
    
    doubleBullets()
    {
        var bullet=instantiate(this.bulletPrefab);
        var bullet2=instantiate(this.bulletPrefab);
        bullet.setWorldPosition(this.playerRef.getPosition().x+30,this.playerRef.getPosition().y+50,0);
        bullet2.setWorldPosition(this.playerRef.getPosition().x-30,this.playerRef.getPosition().y+50,0);
        this.node.parent.addChild(bullet);
        this.node.parent.addChild(bullet2);
    }
    onLoad() 
    {
        //wasnt able find a way make a coroutine...this was the only example i saw that allows forever spawn of bullet
        //params: callback function, rate of fire, how long to repeat,delay 
        this.schedule(this.doubleBullets,0.5,macro.REPEAT_FOREVER,0);
    }
}


