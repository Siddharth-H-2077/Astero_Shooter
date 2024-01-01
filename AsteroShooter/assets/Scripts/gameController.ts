import { _decorator, CCInteger, Component, director, EventTouch, Node, Vec2} from 'cc';
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
    private target;

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

    @property({
        type:CCInteger,
        tooltip:'Level Select'
    })
    private win;
    //reference to handle all the inputs 
    protected onLoad()
    {
        this.player.doubleBullet=false;
        this.player.gotCoin=false;
        this.player.playerDied=false;
        this.playGame();
        this.InitMouseListener();
    }

    protected update()
    {
        if(this.target<=this.result.currentScore)
        {
            //WIN SCREEN
            this.win=this.win+1;
            this.resultGame();
        }
        else if(this.player.playerDied)
        {
            //LOSE SCREEN
            this.win=0;
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
    private InitMouseListener()
    {
        this.node.on(Node.EventType.TOUCH_START,this.onMouseDown,this);
        this.node.on(Node.EventType.TOUCH_CANCEL,this.onMouseUp,this);
        this.node.on(Node.EventType.TOUCH_MOVE,this.onMouseMove,this);
    }

    //not holding left click
    private onMouseUp(event:EventTouch)
    {
        this.player.clicked=false;
    }
    //while holding left click
    private onMouseDown(event:EventTouch)
    {
        this.player.clicked=true;
    }
    //while moving with left click held down    
    private onMouseMove(event:EventTouch)
    {
        this.player.newPlayerLoc = new Vec2 (event.getLocation().x,event.getLocation().y);
        this.player.diff= event.getStartLocation()

        this.player.movePlayer();
    }
    
    private resultGame()
    {
        director.pause();
        //director.loadScene('uiscene');
        if(this.win>=3)
        {
            this.result.showFinalscoreW();
            director.preloadScene('playscene-002');
        }
        else if(this.win===2)
        {
            this.result.showFinalscoreW();
            director.preloadScene('playscene-001');
        }
        else if(this.win===1)
        {
            this.result.showFinalscoreW();
            director.preloadScene('playscene');        
        }
        else
        {
            this.result.showFinalScoreL();
            director.preloadScene('uiscene');        
        }
        this.node.on(Node.EventType.TOUCH_START,this.cScene,this);
        
    }

    private cScene()
    {
        if(this.win>=3)
        {
            director.loadScene('playscene-002');
        }
        else if(this.win===2)
        {
            director.loadScene('playscene-001');
        }
        else if(this.win===0)
        {
            director.loadScene('uiscene');        
        }
        else
        {
            director.loadScene('playscene');        
        }        
    }

    private playGame()
    {
        director.resume();
        this.result.firstscreen();
        setTimeout(()=>
        {
            this.result.resetScore();
            this.result.hidefirstscreen();
            this.result.hideScore();
            this.player.resetPlayer();    
        },1000)
        
    }
}

