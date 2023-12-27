import { _decorator, Component, director, EventKeyboard, EventTouch, Input, input, KeyCode, Node, Vec2} from 'cc';
import { parallaxBG } from './parallaxBG';
import { results } from './results';
import { playerController } from './playerController';
import { bulletScript } from './bulletScript';
const { ccclass, property } = _decorator;

@ccclass('gameController')
export class gameController extends Component {

    //player reference
    @property({
        type:playerController,
        tooltip:'player'
    })

    private player:playerController;
    
    //UI layer reference
    @property
    ({
        type:results
    })
    
    //parallax reference
    private result:results


    @property({
        type :parallaxBG,
        tooltip:'moving background with the script'
    })
    private background:parallaxBG;


    //reference to handle all the inputs 
    onLoad()
    {
        director.pause();
    
        this.InitKeyboardListener();
        this.InitMouseListener();
        this.result.resetScore();
        this.result.firstscreen();
        this.player.resetPlayer();
        
    }

    InitKeyboardListener()
    {   
        input.on(Input.EventType.KEY_DOWN,this.keyPress,this);
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

    //keypress for debugging and testing phase
    keyPress(event:EventKeyboard)
    {
        switch(event.keyCode)
        {
            case KeyCode.ESCAPE:
                this.resultGame();
                break;
            case KeyCode.DIGIT_1:
                this.result.addScore();
                break;
            case KeyCode.ENTER:
                this.StartGame();
        }
    }
    
    resultGame()
    {
        director.pause();

        this.result.showFinalScore();
    }

    StartGame()
    {
        director.resume();

        this.result.resetScore();
        this.result.hidefirstscreen();
        this.result.hideScore();
        this.player.resetPlayer();

    }
}

