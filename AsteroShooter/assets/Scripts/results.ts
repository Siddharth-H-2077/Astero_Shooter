 import { _decorator, Component, Label,RichText } from 'cc';
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

updateScore(num:number)
{
    this.currentScore=num;
    this.score.string=''+this.currentScore;
}

resetScore()
{
    this.updateScore(0);
    this.hideScore();
}
 
addScore()
{
    this.updateScore(this.currentScore+10);
}

firstscreen()
{
    this.GName.node.active=true;
    this.FScene.node.active=true;
    this.score.node.active=false;
    this.TAgain.node.active=false;
    this.Fscore.node.active=false;
}

hidefirstscreen()
{
this.GName.node.active=false;
this.FScene.node.active=false;
}

hideScore()
{
    this.score.node.active=true;
    this.Fscore.node.active=false;
    this.TAgain.node.active=false;
}

showFinalScore()
{
    this.score.node.active=false;
    this.Fscore.node.active=true;
    this.Fscore.string='Score : ' + this.currentScore;
    this.TAgain.node.active=true;
    this.GName.node.active=true;
}

public gotCoin()
{
    console.log("SCORE ADDED COIN");
    this.addScore();
}
}



