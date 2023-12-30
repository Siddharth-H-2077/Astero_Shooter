import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('changeScript')
export class changeScript extends Component {


//inside the uigame scene
protected onLoad(): void {
    //preloading play scene 
    director.preloadScene('playscene');
    this.node.on(Node.EventType.TOUCH_START,this.cScene,this);
}
public cScene()
{
    //to load up the playscene
    director.loadScene('playscene');
}
}


