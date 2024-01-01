import { _decorator, CCFloat, Component, Vec2,Collider2D,Contact2DType,IPhysics2DContact,find } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('bulletScript')
export class bulletScript extends Component {
    @property
    ({
        type:CCFloat,
        tooltip:'The speed of bullet'
    })
    private speed;
   
    private game;
    //private enemyHit;

    private tempLocation:Vec2;
    private collider;

    onLoad(): void 
    {
        //referencing gameController
        this.game=find("GameController").getComponent("gameController");

        this.collider=this.getComponent(Collider2D);
        this.collider.on(Contact2DType.BEGIN_CONTACT,this.onBulleted,this);
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
           // console.log("Bullet killed");
        }
    }

    //check bullet collision
    onBulleted(selfCollider:Collider2D,otherCollider:Collider2D,contact:IPhysics2DContact|null)
    {
       //console.log("Bulletted-"+otherCollider.name);
        //destroys bullet after 1 micro second 
        setTimeout(() => {
            this.game.result.addScore();
            //stack overflow had no explaination for using set timeout but when you normally use this.node.destroy() the game breaks
            //otherCollider.node.destroy();
            this.node.destroy();
        },0.001);

    }

    //destroy bullet
    private killBullet()
    {
        this.node.destroy();
    }
 }


