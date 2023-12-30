import { _decorator, CCInteger, Component, director, EventTouch, Input, input,  Node, Vec2} from 'cc';
import { parallaxBG } from './parallaxBG';
import { results } from './results';
import { playerController } from './playerController';
import { bulletSpawn } from './bulletSpawn';
import { PowerDecider } from './PowerDecider';
const { ccclass, property } = _decorator;

@ccclass('gameController')
export class gameController extends Component {

    //Target Score
    @property({
        type:CCInteger,
        tooltip:'Target Score'
    })
    public target;

    //player reference
    @property({
        type:playerController,
        tooltip:'player'
    })

    private player:playerController;

    //bullet Spawn
    @property({
        type:bulletSpawn,
        tooltip:'player bullets'
    })

    private bulletSpawn:bulletSpawn;
    
    //UI layer reference
    @property({
        type:results,
        tooltip:'UI RESULTS ON SCENE GO HERE'
    })
    
    private result:results

    //parallax reference
    @property({
        type :parallaxBG,
        tooltip:'moving background with the script'
    })
    private background:parallaxBG;

    @property({
        type :PowerDecider,
        tooltip:'moving background with the script'
    })
    private Power:PowerDecider;

    //reference to handle all the inputs 
    onLoad()
    {
        this.player.doubleBullet=false;
        this.player.gotCoin=false;
        this.player.playerDied=false;
        this.playGame();
        this.InitMouseListener();
    }

    update()
    {
        if(this.target<=this.result.currentScore)
        {
            //WIN SCREEN
            this.resultGame();
        }
        else if(this.player.playerDied)
        {
            //LOSE SCREEN
            this.resultGame();
        }
        if(this.player.gotCoin)
        {
            setTimeout(()=>
            {
                this.result.gotCoin();
            },0.3);
            this.player.gotCoin=false;
        }
        if(this.player.doubleBullet)
        {
            this.Power.activate=true;
            setTimeout(()=>
            {
                this.Power.Activate();
            },0.3);
            this.player.doubleBullet=false;

        }

    }
    
    //mouse will work only on the area of the game controller.
    InitMouseListener()
    {
        this.node.on(Node.EventType.TOUCH_START,this.onMouseDown,this);
        this.node.on(Node.EventType.TOUCH_CANCEL,this.onMouseUp,this);
        this.node.on(Node.EventType.TOUCH_MOVE,this.onMouseMove,this);
    }

    //not holding left click
    onMouseUp(event:EventTouch)
    {
        this.player.clicked=false;
    }
    //while holding left click
    onMouseDown(event:EventTouch)
    {
        this.player.clicked=true;
    }
    //while moving with left click held down    
    onMouseMove(event:EventTouch)
    {
        this.player.newPlayerLoc = new Vec2 (event.getLocation().x,event.getLocation().y);
        this.player.diff= event.getStartLocation()

        this.player.movePlayer();
    }
    
    resultGame()
    {
        director.pause();
        //director.loadScene('uiscene');
        this.result.showFinalScore();

        this.node.on(Node.EventType.TOUCH_START,this.cScene,this);
        director.preloadScene('uiscene');        
    }

    private cScene()
        {
            director.loadScene('uiscene');
        }

    playGame()
    {
        director.resume();

        this.result.resetScore();
        this.result.hidefirstscreen();
        this.result.hideScore();
        this.player.resetPlayer();

    }
}

