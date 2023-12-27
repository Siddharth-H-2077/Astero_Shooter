import { _decorator, Component, Vec2 } from 'cc';
import { playerController } from './playerController';
const { ccclass, property } = _decorator;

@ccclass('bulletScript')
export class bulletScript extends Component {
    @property({
        type:Number,
        tooltip:'The speed of bullet'
    })
    public speed;


    @property({
        type:Number,
        tooltip:'spawn rate'
    })
    public spawnRate;

   
    public tempLocation:Vec2;

    onLoad(): void {
        this.tempLocation= new Vec2(this.node.getPosition().x,this.node.getPosition().y);
    }
    
    //to move bullet
    update(deltaTime: number) 
    {
        this.tempLocation.y +=this.speed*deltaTime;
        this.node.setPosition(this.tempLocation.x,this.tempLocation.y);
        if(this.tempLocation.y>500)
        {
            this.killBullet();
            console.log("Bullet killed");
        }
    }

    //check bullet collision
    public checkCollision()
    {

    }

    //destroy bullet
    public killBullet()
    {
        this.node.destroy();
    }
 }


