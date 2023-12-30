import {_decorator, CCFloat, Component, Vec2,Collider2D,IPhysics2DContact,Contact2DType,Prefab,instantiate } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('pickUp')
export class pickUp extends Component {
    @property({
        type:Prefab
        ,tooltip:'Particles Go here'
    })
    public splosion:Prefab;

    @property
    ({
        type:CCFloat,
        tooltip:'The speed of pickup'
    })
    public speed;

    public collider;
    public tempLocation:Vec2;

    onLoad(): void {
        this.collider=this.getComponent(Collider2D);
        this.collider.on(Contact2DType.BEGIN_CONTACT,this.onReduceLife,this);

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
            //console.log("Enemy killed");
        }
    }

    //check bullet collision
    public checkCollision()
    {
        setTimeout(()=>
        {
            var spln=instantiate(this.splosion);
            spln.setWorldPosition(this.node.getPosition());
            this.node.parent.addChild(spln);

            this.killEnemy();
        },1);
    }

    //destroy bullet
    public killEnemy()
    {
        this.node.destroy();
    }
        //check bullet collision
        onReduceLife(selfCollider:Collider2D,otherCollider:Collider2D,contact:IPhysics2DContact|null)
        {
            setTimeout(() => {
                this.checkCollision();
            },1);
        }
}


