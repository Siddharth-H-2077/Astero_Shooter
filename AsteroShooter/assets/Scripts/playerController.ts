import { _decorator,Collider2D,Component,Contact2DType,IPhysics2DContact,Vec2,} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('playerController')
export class playerController extends Component {
    public newPlayerLoc: Vec2;
    public diff:Vec2;
    public clicked:boolean;
    public playerDied:boolean;
    public gotCoin:boolean;
    public doubleBullet:boolean;


    @property({
        type:Collider2D,
        tooltip:'Collider Goes Here'
    })
    private collider:Collider2D;


    public resetPlayer()
    {
        this.newPlayerLoc= new Vec2(0,0);
        this.node.setPosition(this.newPlayerLoc.x,this.newPlayerLoc.y);
    }

    public movePlayer()
    {
        if((this.clicked))
        {
            this.node.setWorldPosition(this.newPlayerLoc.x,this.newPlayerLoc.y,0);
            
            //sends player outside the scene
            //this.node.setPosition(this.newPlayerLoc.x,this.newPlayerLoc.y);
        }        
    }

    protected onBeginContact(selfCollider:Collider2D,otherCollider:Collider2D,contact:IPhysics2DContact|null)
    {
        //console.log("Contacted-"+otherCollider.name);
        if(otherCollider.name==="Asteroid<CircleCollider2D>"||otherCollider.name==="Asteroid-001<CircleCollider2D>"||otherCollider.name==="SpecialAsteroid<CircleCollider2D>"||otherCollider.name==="GoldenBoy<CircleCollider2D>")
        {   
            this.playerDied=true;
        }
        else if(otherCollider.name==="Coin<CircleCollider2D>")
        {   
            this.gotCoin=true;
        }
        else if(otherCollider.name==="DoubleBullet<CircleCollider2D>")
        {   
            this.doubleBullet=true;
        }
    }
    
    protected onLoad(): void 
    {
        if(this.collider)
        {
            this.collider.on(Contact2DType.BEGIN_CONTACT,this.onBeginContact,this);
        }
    }

}


