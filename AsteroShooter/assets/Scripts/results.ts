 import { _decorator, Component, find, Label,RichText } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('results')
export class results extends Component {
@property
({
    type:RichText,
    tooltip:'Final Score to show'
})
private Fscore:RichText;

@property
({
    type:RichText,
    tooltip:'Try Again'
})
private TAgain:RichText;

@property
({
    type:RichText,
    tooltip:'Current Score To show in Game'
})
private score:RichText;

@property
({
    type:RichText,
    tooltip:'First scene'
})
private FScene:RichText;

@property({
    type:RichText,
    tooltip:'Game Name'
})
private GName:RichText;

public currentScore:number;

public updateScore(num:number)
{
    this.currentScore=num;
    this.score.string=''+this.currentScore;
}

public resetScore()
{
    this.updateScore(0);
    this.hideScore();
}
 
public addScore()
{
    this.updateScore(this.currentScore+10);
}

public firstscreen()
{
    this.GName.node.active=true;
    this.FScene.node.active=true;
    this.score.node.active=false;
    this.TAgain.node.active=false;
    this.Fscore.node.active=false;
}

public hidefirstscreen()
{
this.GName.node.active=false;
this.FScene.node.active=false;
}

public hideScore()
{
    this.score.node.active=true;
    this.Fscore.node.active=false;
    this.TAgain.node.active=false;
}
//lose final score screen
public showFinalScoreL()
{
    this.score.node.active=false;
    this.Fscore.node.active=true;
    this.Fscore.string='Score : ' + this.currentScore;
    this.TAgain.node.active=true;
    this.GName.node.active=true;
}

public showFinalscoreW()
{
    this.score.node.active=false;
    this.Fscore.node.active=true;
    this.Fscore.string='Score : ' + this.currentScore;
    this.TAgain.string='Click to go Next Level';
    this.TAgain.node.active=true;
    this.GName.node.active=true;
}

public gotCoin()
{
    console.log("SCORE ADDED COIN");
    this.addScore();
}
}



