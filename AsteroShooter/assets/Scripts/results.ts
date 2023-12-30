 import { _decorator, Component, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('results')
export class results extends Component {
@property
({
    type:Label,
    tooltip:'Final Score to show'
})
private Fscore:Label;

@property
({
    type:Label,
    tooltip:'Try Again'
})
private TAgain:Label;

@property
({
    type:Label,
    tooltip:'Current Score To show in Game'
})
private score:Label;

@property
({
    type:Label,
    tooltip:'First scene'
})
private FScene:Label;

@property({
    type:Label,
    tooltip:'Game Name'
})
private GName:Label;

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
}


