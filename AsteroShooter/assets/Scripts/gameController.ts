import { _decorator, Component, director, EventKeyboard, EventMouse, EventTouch, Input, input, KeyCode, Node, Vec2  } from 'cc';
import { parallaxBG } from './parallaxBG';
import { results } from './results';
import { playerController } from './playerController';
const { ccclass, property } = _decorator;

@ccclass('gameController')
export class gameController extends Component {

    //player reference
    @property({
        type:playerController,
        tooltip:'player'
    })

    public player:playerController;
    
    //UI layer reference
    @property
    ({
        type:results
    })
    
    //parallax reference
    public result:results
    @property({
        type :parallaxBG,
        tooltip:'moving background with the script'
    })
    public background:parallaxBG;

    //reference to handle all the inputs 
    onLoad()
    {
        this.InitKeyboardListener();
        this.InitMouseListener();
        this.result.resetScore();
        this.player.resetPlayer();
        director.pause();
    }

    InitKeyboardListener()
    {   
        input.on(Input.EventType.KEY_DOWN,this.keyPress,this);
    }

    InitMouseListener()
    {
        input.on(Input.EventType.TOUCH_START,this.onMouseDown,this);
        input.on(Input.EventType.TOUCH_CANCEL,this.onMouseUp,this);
        input.on(Input.EventType.TOUCH_MOVE,this.onMouseMove,this);
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
        this.player.currentPlayerLoc = new Vec2(event.getStartLocation());
        this.player.newPlayerLoc = new Vec2 (event.getLocationInView().x,event.getLocationInView().y);
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
                console.log("score++");
                this.result.addScore();
                break;
            case KeyCode.ENTER:
                this.StartGame();
        }
    }
    
    resultGame()
    {
        this.result.showFinalScore();
        director.pause();
    }

    StartGame()
    {
        this.result.resetScore();
        this.result.hideScore();
        this.player.resetPlayer();
        director.resume();
    }
}


