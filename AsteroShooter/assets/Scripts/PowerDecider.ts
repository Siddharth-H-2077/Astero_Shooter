import { _decorator, Component, Node } from 'cc';
import { doubleBullet } from './doubleBullet';
import { bulletSpawn } from './bulletSpawn';
const { ccclass, property } = _decorator;

@ccclass('PowerDecider')
export class PowerDecider extends Component {
    @property({
        type:bulletSpawn,
        tooltip:'Dual shot goes here'
    })
    private SingleShot:bulletSpawn;
    @property({
        type:doubleBullet,
        tooltip:'Dual shot goes here'
    })
    private DoubleShot:doubleBullet;
    public activate:boolean;

    onLoad(): 
    void 
    {
        this.activate=false;
    }
    public Activate()
    {
        if(this.activate)
        {
            this.DoubleShot.node.active=true;
            this.SingleShot.node.active=false;
        }

        else
        {
            this.DoubleShot.node.active=false;
            this.SingleShot.node.active=true;
        }
    }
}


