import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Provider } from '../../providers/provider/provider'
import { Chart } from 'chart.js';
declare var Paho : any;



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  })

export class HomePage {
  @ViewChild('doughnutCanvas') doughnutCanvas;

  private mqttStatus: string = 'Disconnected';
  private mqttClient: any = null;
  public message: any = '';
  private messageToSend: string = 'Your message';
  private topic: string = 'swen325/a3';
  private clientId: string = 'robsonJaco'

 
  doughnutChart: any;
  constructor(public navCtrl: NavController, public provider: Provider) {
  }
  
  ionViewDidLoad(){
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
 
      type: 'doughnut',
      data: {
          labels: ["Bedroom", "Toilet", "Dining room", "Living Room", "Kicthen"],
          datasets: [{
              label: '# of Votes',
              data: [this.provider.countBedroom, 
                this.provider.countToilet,
                this.provider.countDining, 
                this.provider.countLiving,
                this.provider.countKitchen
                ],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)'
              ],
              hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56",
                  "#FF6384",
                  "#36A2EB"
              ]
          }]
      }

  });
  }


  public connect = () => {
  	this.mqttStatus = 'Connecting...';
  	//this.mqttClient = new Paho.MQTT.Client('m10.cloudmqtt.com', 31796, '/mqtt', this.clientId);
  	this.mqttClient = new Paho.MQTT.Client('barretts.ecs.vuw.ac.nz', 8883, '/mqtt', this.clientId);
 	
	// set callback handlers
	this.mqttClient.onConnectionLost = this.onConnectionLost;
	this.mqttClient.onMessageArrived = this.onMessageArrived;

	// connect the client
	console.log('Connecting to mqtt via websocket');
	this.mqttClient.connect({timeout:10, useSSL:false, onSuccess:this.onConnect, onFailure:this.onFailure});
  this.provider.startTimer();
}

  public disconnect () {
  	if(this.mqttStatus == 'Connected') {
  		this.mqttStatus = 'Disconnecting...';
  		this.mqttClient.disconnect();
  		this.mqttStatus = 'Disconnected';
  	}
  }

  public sendMessage () {
  	if(this.mqttStatus == 'Connected') {
  		this.mqttClient.publish(this.topic, this.messageToSend);
  	}
  }

  public onConnect = () => {
  	console.log('Connected');
  	this.mqttStatus = 'Connected';
  	// subscribe
  	this.mqttClient.subscribe(this.topic);
  }

  public onFailure = (responseObject) => {
  	console.log('Failed to connect');
  	this.mqttStatus = 'Failed to connect';
  }

  public onConnectionLost = (responseObject) => {
   	if (responseObject.errorCode !== 0) {
   		this.mqttStatus = 'Disconnected';
  	} 	
  }

  public onMessageArrived = (message) => {
  	console.log('Received message');
    //this.message = message.payloadString;
    this.provider.setMessage(message.payloadString);
  }
}
