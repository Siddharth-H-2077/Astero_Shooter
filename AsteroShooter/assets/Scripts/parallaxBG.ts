import { _decorator, Component, Node, UITransform, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('parallaxBG')
export class parallaxBG extends Component {
    @property
    ({
        type:Node,
        tooltip:'first img'
    })

    private bg1:Node;

    @property
    ({
        type:Node,
        tooltip:'second img'
    })
    
    private bg2:Node;  
    
    @property
    ({
        type:Node,
        tooltip:'third img'
    })
    
    private bg3:Node;

//Apparantly can't directly set up with a number with = sign so time for a var for some reason? 
//...or im just too dumb to figure it out idk ...
//taking the height for temp locations
    private bgHeight:number;


//making temp location
    private tempStartLocation1=new Vec3;
    private tempStartLocation2=new Vec3;
    private tempStartLocation3=new Vec3;
    
    private speed:number=60;

    private setUpStuff()
    {
        this.bgHeight=this.bg1.getComponent(UITransform).height;
        
        this.tempStartLocation1.y=0;
        this.tempStartLocation2.y=this.tempStartLocation1.y+this.bgHeight;//960
        this.tempStartLocation3.y=this.tempStartLocation2.y+this.bgHeight;//960+960

        this.bg1.setPosition(this.tempStartLocation1);
        this.bg2.setPosition(this.tempStartLocation2);
        this.bg3.setPosition(this.tempStartLocation3);
    }

    onLoad(): void {
        this.setUpStuff();
    }

    
    update(deltaTime: number) 
    {
        this.tempStartLocation1=this.bg1.position;
        this.tempStartLocation2=this.bg2.position;
        this.tempStartLocation3=this.bg3.position;

        //y speed based on update 
         
        this.tempStartLocation1.y -=this.speed*deltaTime;
        this.tempStartLocation2.y -=this.speed*deltaTime;
        this.tempStartLocation3.y -=this.speed*deltaTime;

         
        
        if(this.tempStartLocation1.y<=(0-this.bgHeight))
        {
            this.tempStartLocation1.y=1920;
        }
        if(this.tempStartLocation2.y<=(0-this.bgHeight))
        {
            this.tempStartLocation2.y=1920;
        }
        if(this.tempStartLocation3.y<=(0-this.bgHeight))
        {
            this.tempStartLocation3.y=1920;
        }
        
        this.bg1.setPosition(this.tempStartLocation1);
        this.bg2.setPosition(this.tempStartLocation2);
        this.bg3.setPosition(this.tempStartLocation3);

    }
}


