import { Component } from '@angular/core';

@Component({
  selector: 'app-modal-dog',
  templateUrl: './modal-dog.component.html',
  styleUrls: ['./modal-dog.component.css']
})
export class ModalDogComponent {

  showModal : boolean;
  
  onClick(event)
  {
    this.showModal = true; 
  }

  hide()
  {
    this.showModal = false;
  }

}
