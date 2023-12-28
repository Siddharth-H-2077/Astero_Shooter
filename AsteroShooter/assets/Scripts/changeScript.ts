import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('changeScript')
export class changeScript extends Component {

protected onLoad(): void {
    director.preloadScene('playscene');
    this.node.on(Node.EventType.TOUCH_START,this.cScene,this);
}
public cScene()
{
    director.loadScene('playscene');
}
}


