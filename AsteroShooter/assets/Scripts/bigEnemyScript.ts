import { _decorator, CCFloat, Component, Vec2,Collider2D,IPhysics2DContact,Contact2DType, Sprite, instantiate, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('bigEnemyScript')
export class bigEnemyScript extends Component {
    
    
    @property({
        type:Prefab
        ,tooltip:'splosion Goes here'
    })
    public splosion:Prefab;

    @property({
        type:Sprite
        ,tooltip:'BEEG BOY'
    })
    public beeg:Sprite;

    @property({
        type:Sprite
        ,tooltip:'smol boy'
    })
    public smol:Sprite;

    @property
    ({
        type:CCFloat,
        tooltip:'The speed of enemy'
    })
    public speed;

    @property
    ({
        type:CCFloat,
        tooltip:'The speed of enemy'
    })
    public life;

    public collider;
    public tempLocation:Vec2;

    onLoad(): void {
        this.beeg.node.active=true;
        this.smol.node.active=false;
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
        this.life-=1;
        setTimeout(()=>
        {
            if(this.life!=0)
            {
                var spln=instantiate(this.splosion);
                spln.setWorldPosition(this.node.getPosition());
                this.node.parent.addChild(spln);

                this.beeg.node.active=false;
                this.smol.node.active=true;    
            }
            if(this.life<=0)
            {
                var spln=instantiate(this.splosion);
                spln.setWorldPosition(this.node.getPosition());
                this.node.parent.addChild(spln);

                this.killEnemy();
            }
        }
        ,3)
    }

    //destroy bullet
    public killEnemy()
    {
        this.node.destroy();
    }

        //check bullet collision
        onReduceLife(selfCollider:Collider2D,otherCollider:Collider2D,contact:IPhysics2DContact|null)
        {
            //console.log(selfCollider.name+"-Bain IM in MINECRAFT-");
            //destroys asteroid after 1 milli second 
            setTimeout(() => {
            this.checkCollision();
            },3);
    
        }
}


