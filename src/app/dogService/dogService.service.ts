import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class DogService {
    getListOfDogBreedsUrl = 'https://dog.ceo/api/breeds/list';
    getBreedImagesUrl = 'https://dog.ceo/api/breed/';
    getRandomBreeds = 'https://dog.ceo/api/breeds/image/random/50';
    fetchingImages = false;

    constructor(private http: HttpClient) {

    }

    getListOfDogBreeds() {
        return this.http.get(this.getListOfDogBreedsUrl);
    }

    getRandomPic(): Observable<any> {
        this.fetchingImages = true;
        return this.http.get<any>(this.getRandomBreeds)
        .pipe(
            tap(() => { this.fetchingImages = false })
        );
    }
    
    getBreedImages(breed) {
        this.fetchingImages = true;
        return this.http.get(`${this.getBreedImagesUrl}${breed}/images`)
            .pipe(
                tap(() => { this.fetchingImages = false })
            );
    }
}