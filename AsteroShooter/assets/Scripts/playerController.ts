import { _decorator,Component,Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('playerController')
export class playerController extends Component {
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
            
            //sends player outside the scene
            //this.node.setPosition(this.newPlayerLoc.x,this.newPlayerLoc.y);
        }        
    }
    public diff:Vec2;
    public clicked:boolean;
}


