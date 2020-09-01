import { Component, ViewChild } from '@angular/core';
import { DogService } from './dogService/dogService.service';
import { Observable } from 'rxjs/Observable';
import { filter, map, tap } from 'rxjs/operators';

import { DogsList } from './dogsList/dogsList.component';

interface DogsResponseType {
  status: String,
  message: String[]
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: String = 'Dog Gallery';
  dogs: String[];
  images: String[];
  selected: String;

  get timeFormat() {
    return 'medium';
  }

  @ViewChild(DogsList)
  private dogsListComp: DogsList;

  constructor(private dogSvc: DogService) {
  }

  ngOnInit() {
    this.createDogsListAndGallery('');
    this.selected = this.dogs[0];
  }

  createDogsListAndGallery(filter) {
    this.dogSvc.getListOfDogBreeds()
      .pipe(
      map((x: DogsResponseType) => x.message.filter(x => x.includes(filter))),
      tap(x => console.log(x))
      )
      .subscribe((data: String[]) => {
        this.dogs = data
        this.dogSvc.getRandomPic()
          .subscribe((data: DogsResponseType) => {
            this.images = data.message;
          });
      },
      (err) => {
        console.log('error', err)
      });
  }
  dogSelected(breed) {
    this.selected = breed;
    this.dogSvc.getBreedImages(breed)
      .subscribe((data: DogsResponseType) => {
        this.images = data.message;
      });
  }

  randomSelected() {
    this.dogSvc.getRandomPic()
      .subscribe((data: DogsResponseType) => {
        this.images = data.message;
      });
  }

  filterDogsList(value) {
    this.createDogsListAndGallery(value)

  }

}
