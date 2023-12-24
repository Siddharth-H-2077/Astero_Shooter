 import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('results')
export class results extends Component {
@property({
    type:Label,
    tooltip:'Final Score to show'
})
public Fscore:Label;

@property({
    type:Label,
    tooltip:'Try Again'
})
public TAgain:Label;

@property({
    type:Label,
    tooltip:'Current Score To show in Game'
})
public score:Label;


private currentScore:number;
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
}
}


