import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



/*
  Generated class for the Provider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Provider {
  public batLevDining: any;
  public batLevkitchen: any;
  public batLevLiving: any;
  public batLevBedroom: any;
  public batLevToilet: any;

  public mins: number = 0;
  public secs: any;

  public countKitchen: number = 1;
  public countLiving: number = 1;
  public countBedroom: number = 1;
  public countDining: number = 1;
  public countToilet: number = 1;





  public lastMoveLocation: any;
  private timer: number = 0;

  constructor() {

  }

  startTimer(){
    setInterval(function(){
      this.timer++;
      this.mins = Math.floor(this.timer / 60);
      this.secs = this.timer - this.mins * 60;
      if(this.timer == 300){
        alert("No motion detected in the last 5 mins ")
      
      }
    }.bind(this),
    1000)
  }

  setMessage = (message : String) => {
    console.log(message)
    if(message.search('toilet') != -1){
      this.batLevToilet = message.substring(message.length -2).replace(",", " ");
      var index = message.lastIndexOf(',');
      var movement = message.charAt(index-1).replace(",", " ");
      if(movement == '1'){
        this.lastMoveLocation = "toilet";
        this.timer = 0; 
        this.countToilet++;
        return;
      }
    }
    else if(message.search('living') != -1){
      this.batLevLiving = message.substring(message.length -2).replace(",", " ");
      var index = message.lastIndexOf(',');
      var movement = message.charAt(index-1)
      if(movement == '1'){
        this.lastMoveLocation = "living room";
        this.timer = 0; 
        this.countLiving++
      }
    }
    else if(message.search('dining') != -1){
      this.batLevDining = message.substring(message.length -2).replace(",", " ");
      var index = message.lastIndexOf(',');
      var movement = message.charAt(index-1)
      if(movement == '1'){
        this.lastMoveLocation = "dining room";
        this.timer = 0; 
        this.countDining++
        return;

      }
    }
    else if(message.search('bedroom') != -1){
      
      this.batLevBedroom = message.substring(message.length -2).replace(",", " ");
      var index = message.lastIndexOf(',');
      var movement = message.charAt(index-1)
      console.log(movement)
      if(movement == '1'){
        console.log("beroopooom")
        this.countBedroom++;
        this.lastMoveLocation = "bedroom";
        this.timer = 0; 
        return;

      }
    } 
    else if(message.search('kitchen') != -1){
      this.batLevkitchen = message.substring(message.length -2).replace(",", " ");
      var index = message.lastIndexOf(',');
      var movement = message.charAt(index-1)
      if(movement == '1'){
        console.log("kitchhheeen")
        this.countKitchen++;
        this.lastMoveLocation = "kitchen";
        this.timer = 0; 
        return;

      }
    }
    
    console.log(this.batLevToilet);
  }
  
}
