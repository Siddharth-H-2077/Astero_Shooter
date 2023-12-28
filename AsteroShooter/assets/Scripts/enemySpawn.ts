import { _decorator, Component, Prefab,macro,instantiate } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('enemySpawn')
export class enemySpawn extends Component {
    @property
    ({
        type:Prefab,
        tooltip:'Enemy Prefab goes here'
    })
    public enemyPrefab=null;
    
    @property
    ({
        type:Number,
        tooltip:'enemy spawn rate'
    })
    public spawnRate=2.25;
    
    public enemy;


    spawnEnemy()
    {
        //instansiates the bullet
        this.enemy=instantiate(this.enemyPrefab);
        //places the instansiated object on screen
        this.enemy.setWorldPosition(this.node.getPosition());
        //loads the instansiated boi on screen
        this.node.parent.addChild(this.enemy);
        console.log("+1 bullet on screen");
    }     

    onLoad() 
    {
        //Same code copy pasted from bullet spawner with little changes to make the spawner move
        //params: callback function, rate of fire, how long to repeat,delay 
       this.schedule(this.spawnEnemy,this.spawnRate,macro.REPEAT_FOREVER,0);
    }

    leftRightMove()
    {

    }
}


