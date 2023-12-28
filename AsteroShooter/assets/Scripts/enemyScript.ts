import { _decorator, Component, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('enemyScript')
export class enemyScript extends Component {
    @property
    ({
        type:Number,
        tooltip:'The speed of enemy'
    })
    public speed;
   
    public tempLocation:Vec2;

    onLoad(): void {
        this.tempLocation= new Vec2(this.node.getPosition().x,this.node.getPosition().y);
    }
    
    //to move enemy
    //same script as base bullet script
    update(deltaTime: number) 
    {
        this.tempLocation.y -=this.speed*deltaTime;
        this.node.setPosition(this.tempLocation.x,this.tempLocation.y);
        if(this.tempLocation.y<-569)
        {
            this.killEnemy();
            console.log("Enemy killed");
        }
    }

    //check bullet collision
    public checkCollision()
    {

    }

    //destroy bullet
    public killEnemy()
    {
        this.node.destroy();
    }
}


