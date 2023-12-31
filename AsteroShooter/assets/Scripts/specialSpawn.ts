import { _decorator, Component, Prefab,macro,instantiate, Vec2, CCFloat,math } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('specialSpawn')
export class specialSpawn extends Component {
    @property
    ({
        type:Prefab,
        tooltip:'Enemy Prefab goes here'
    })
    public enemyPrefab=null;
    
    @property
    ({
        type:CCFloat,
        tooltip:'enemy spawn rate'
    })
    public spawnRate=2.25;

    @property
    ({
        type:CCFloat,
        tooltip:'enemy interval'
    })
    public IntervalRate=2.25;

    @property
    ({
        type:CCFloat,
        tooltip:'speed'
    })
    public speed=60;
    
    public enemy;
    public cPos:Vec2;
    private reachedCorner:boolean;

    spawnEnemy()
    {
        //instansiates the bullet
        this.enemy=instantiate(this.enemyPrefab);
        //places the instansiated object on screen
        this.enemy.setWorldPosition(this.node.getPosition());
        //loads the instansiated boi on screen
        this.node.parent.addChild(this.enemy);
        //console.log("+1 enemy on screen");
    }     

    onLoad() 
    {
        //Same code copy pasted from bullet spawner with little changes to make the spawner move
        //params: callback function, rate of fire, how long to repeat,delay 
        this.schedule(this.spawnEnemy,this.spawnRate,macro.REPEAT_FOREVER,this.IntervalRate);
        this.cPos=new Vec2(0,500);
        this.reachedCorner=true;
        this.node.setPosition(this.cPos.x,this.cPos.y,0);
    }

    update(deltaTime: number): void 
    {
        this.cPos.x +=this.speed*deltaTime;
        this.node.setPosition(this.cPos.x,this.cPos.y,0);

        this.checkCorner();
    }
    
    public checkCorner()
    {
        if(this.cPos.x>=200)
        {
            this.speed*=-1;
        }
        else if(this.cPos.x<=-200)
        {
            this.speed*=-1;
        }
    }
    
}




