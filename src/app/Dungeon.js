import React from "react";
import ReactDOM from "react-dom";
const css = require('./app.Sass')

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Well from 'react-bootstrap/lib/Well';
import Table from 'react-bootstrap/lib/Table';

class Dungeon extends React.Component
{
  constructor(){
    super();
    this.state = {playerName:'Yonatan H Fessehaye',damage:0,points:0,level:0,choosenWeapon:0,weapon:[90,90,90],counter:0,gridCells:72,enemies:[],zombies:['https://openclipart.org/image/2400px/svg_to_png/205559/Monster.png','https://cdn.pixabay.com/photo/2013/07/12/19/01/monster-154205_960_720.png','https://i.pinimg.com/originals/8c/76/b1/8c76b1c568aee57a0216a9ae22763846.jpg','http://i.imgur.com/h4SAuZP.png','http://vignette2.wikia.nocookie.net/monsterhunter/images/b/bc/Rathalos-2.png','https://vignette3.wikia.nocookie.net/monsterhunter/images/0/08/MH4-Tetsucabra_Render_001.png/revision/latest?cb=20150113025750','http://vignette1.wikia.nocookie.net/monsterhunter/images/e/ef/3rdGen-Lagiacrus_Render_001.png','http://vignette4.wikia.nocookie.net/dragonquest/images/1/17/DQVIII_-_Shadow.png','http://www.fun-lover.com/graphic-shop/Halloween/images/Creatures/monster-166.png','http://i.imgur.com/H8Xsd9E.png','https://vignette3.wikia.nocookie.net/monsterhuntertheory/images/9/92/Silver_Rathalos_Render_2nd_Gen.png/revision/latest?cb=20130302174311']};
  }

  componentWillMount(){
    var enemy=[];
    for(var i=0;i<12;i++)
    enemy.push(Math.floor(Math.random() * (((i+1)*12) - (i*12)) + (i*12)));
    this.setState({enemies:enemy});
   }
  damageAndPoints()
        {
    var lev = this.state.level; var lost = 0; var point = Math.floor(Math.random() * ((lev + 20) - (0-lev)) + (0-lev));
    var damages = this.state.damage - ( Math.floor(Math.random() * ((lev + 5) - (lev)) + (lev)));
    point = this.state.points + point;
    var weapon = this.state.weapon;
       if(weapon[0]>0)
         weapon[0] = weapon[0]- (lev+5);
        else if(weapon[1]>0)
          weapon[1] = weapon[1]-(lev+4);
        else if(weapon[2]>0)
          weapon[2] = weapon[2]-(lev+3);
        else
        {this.setState({level: "You Lost"});alert("You have Lost :( ");}
          for(var i = 0;i<3;i++)
            if(weapon[i]<0)
              weapon[i]=0;
         this.setState({weapons: weapon, points: point, damage:damages});
       }
  renderCells(arrayVal, index){
    var enemyCells = this.state.enemies;
    var cellId = 'id'+index;
    var valDex = enemyCells.indexOf(index);
    var zombie ='';

    if(valDex>=0)
return (<Col xs={1} md={1}><a ref={cellId} href="#" className="unitOne" ><img  className="unitThree" width="100%" height="100%" ref={index} onClick={this.attackEnemy.bind(this, index)} src={this.state.zombies[valDex]}></img></a></Col>);
    else
return(<Col xs={1} md={1}><a ref={cellId} href="#" className="unitOne" onClick={this.gameTime.bind(this, cellId)}></a></Col>)
     }

  attackEnemy(id){
   var valDex = 0; var lev = this.state.level;
   var count = this.state.counter;
   var enemiesLeft = this.state.enemies;
   if(this.state.enemies.indexOf(id) >= 0)
    {

    valDex=this.state.enemies.indexOf(id);
    this.refs[id].src = this.state.zombies[valDex];
      if((this.state.counter<5) & (this.state.enemies[lev]==id))
      {
      if(this.state.counter ==0)
      {this.refs[id].style.webkitTransform = "rotate(20deg)";
       this.damageAndPoints();}
      else if(this.state.counter == 1)
      {this.refs[id].style.webkitTransform = "rotate(-20deg)";
       this.damageAndPoints();}
      else if(this.state.counter == 2)
      {this.refs[id].style.webkitTransform = "rotate(40deg)";
       this.damageAndPoints();}
      else if(this.state.counter == 3)
      {this.refs[id].style.webkitTransform = "rotate(-60deg)";
       this.damageAndPoints();}
      else if(this.state.counter == 4)
      {this.refs[id].style.webkitTransform = "scale(2, 0.5)";
       this.damageAndPoints();}
      this.setState({counter: (count+1)});
      }
      else if(this.state.counter == 5)
      {
      this.refs[id].remove(); lev = this.state.level + 1;
      this.setState({counter: 0, level: lev});
      this.refs['id'+id].style.background = 'transparent';
        if(this.state.level==6)
          {this.setState({level: "You have Won"}); alert(" You have Won")}
     }
      else
        alert("Kill the previous Monster first");
    }
    else
     this.refs[id].remove();

  }
  setWeapon(id)
  {
    this.setState({choosenWeapon: id});
    console.log(id);
  }
  gameTime(cellId)
    {
    this.refs[cellId].style.background  = 'transparent';
     var weapons = this.state.weapon;
       if(weapons[0]>0)
         weapons[0] = weapons[0]-2;
        else if(weapons[1]>0)
          weapons[1] = weapons[1]-2;
        else if(weapons[2]>0)
          weapons[2] = weapons[2]-2;
      this.setState({weapon: weapons});
    }
  render(){
    let returned=[];
    for(var i=0;i<84;i++)
        returned.push("id"+i);
    return (
      <div>
       <Well className="container">
       <div><Grid>
      <Row className="show-grid">
      <Col sm={6} md={3}><code>Instruction:</code><br/>Click on the boxes below to find and fight the monsters with one of your weapons.</Col>

      <Col sm={6} md={3}><code>Weapons Available:</code><br/><img   width="40px" height="40px" src="https://vignette1.wikia.nocookie.net/elderscrolls/images/c/c7/Glass_battleaxe_skyrim.png/revision/latest?cb=20130120152447"></img><a href="#" ref="weaponOne">{this.state.weapon[0]}</a> &nbsp; <img  ref="weaponOne" width="40px" height="40px"  src="http://www.haloforever.com/images/scattershot-weapon-halo-4-big.png"></img> <a  href="#" ref="weaponTwo">{this.state.weapon[1]}</a>&nbsp; <img  ref="weaponOne" width="40px" height="40px"  src="http://vignette4.wikia.nocookie.net/halo/images/7/7d/H5G_Render_Suppressor.png/revision/latest?cb%5Cx3d20160422000447"></img> <a  href="#" ref="weaponThree">{this.state.weapon[2]}</a>&nbsp; </Col>
        <Col sm={4} md={2}><code>Game Level:</code><br/>{this.state.level + 1}</Col>
        <Col sm={4} md={2}><code>Points: </code><br/>{this.state.points}</Col>
        <Col sm={4} md={2}><code>Damage: </code><br/>{this.state.damage}</Col>
      </Row>
      </Grid></div></Well>
      <Jumbotron className="container">
       <div id="gameBoard">
          <Grid>
          <Row className="show-grid">
          {returned.map(this.renderCells,this)}
          </Row>
          </Grid>
       </div>
      </Jumbotron>
     </div>
     )
  }
}
ReactDOM.render(<Dungeon />,document.getElementById('root'))
