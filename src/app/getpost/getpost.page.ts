import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-getpost',
  templateUrl: './getpost.page.html',
  styleUrls: ['./getpost.page.scss'],
})
export class GetpostPage implements OnInit {
  myForm = new FormGroup({

    name: new FormControl('', [Validators.required, Validators.minLength(3)]),

    file: new FormControl('', [Validators.required]),

    fileSource: new FormControl('', [Validators.required])

  });
  heroes = HEROES;
  hero: Hero = {
    id: 1,
    name: 'windstorm'
  };

  // eslint-disable-next-line @typescript-eslint/naming-convention
  UserId = 78902;
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  get f(){

    return this.myForm.controls;

  }


  onFileChange(event) {


    if (event.target.files.length > 0) {

      const file = event.target.files[0];

      this.myForm.patchValue({

        fileSource: file

      });

    }

  }


  submit(){

    const formData = new FormData();

    formData.append('file', this.myForm.get('fileSource').value);

    //console.log(UserId, )

    this.http.post('http://localhost:8100/places', formData)

      .subscribe(res => {

        console.log(res);

        alert('Uploaded Successfully.');

      });

  }

}
