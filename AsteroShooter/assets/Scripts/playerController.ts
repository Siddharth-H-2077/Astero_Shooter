import { _decorator, CCFloat, Component,input,Input,EventMouse,Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('playerController')
export class playerController extends Component {

    @property({
        type:CCFloat,
        tooltip:'how much to the left player can go'
    })
    public leftmax:number=300;

    @property({
        type:CCFloat,
        tooltip:'how much to the right player can go'
    })
    public rightmax:number=300;
    
    public newPlayerLoc: Vec2;

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
            //this.node.setPosition(this.newPlayerLoc.x,this.newPlayerLoc.y);
        }        
    }
    public diff:Vec2;
    public clicked:boolean;

    
     
    
}


