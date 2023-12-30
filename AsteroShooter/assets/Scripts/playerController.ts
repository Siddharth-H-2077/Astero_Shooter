import { _decorator,Collider2D,Component,Contact2DType,IPhysics2DContact,Vec2,} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('playerController')
export class playerController extends Component {
    public newPlayerLoc: Vec2;
    public diff:Vec2;
    public clicked:boolean;
    public playerDied:boolean;

    @property({
        type:Collider2D,
        tooltip:'Collider Goes Here'
    })
    private collider:Collider2D;


    resetPlayer()
    {
        this.newPlayerLoc= new Vec2(0,0);
        this.node.setPosition(this.newPlayerLoc.x,this.newPlayerLoc.y);
    }

    movePlayer()
    {
        if((this.clicked))
        {
            this.node.setWorldPosition(this.newPlayerLoc.x,this.newPlayerLoc.y,0);
            
            //sends player outside the scene
            //this.node.setPosition(this.newPlayerLoc.x,this.newPlayerLoc.y);
        }        
    }

    onBeginContact(selfCollider:Collider2D,otherCollider:Collider2D,contact:IPhysics2DContact|null)
    {
        console.log("Contacted-"+otherCollider.name);
        if(otherCollider.name==="Asteroid<CircleCollider2D>"||otherCollider.name==="Asteroid-001<CircleCollider2D>")
        {   
            this.playerDied=true;
        }
    }
    
    onLoad(): void 
    {
        if(this.collider)
        {
            this.collider.on(Contact2DType.BEGIN_CONTACT,this.onBeginContact,this);
        }
    }

}


