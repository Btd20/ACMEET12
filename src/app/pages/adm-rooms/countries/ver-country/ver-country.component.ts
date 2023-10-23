import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Country } from '../../../../interfaces/country';
import { CountryService } from '../../../../services/country.service';

@Component({
  selector: 'app-ver-country',
  templateUrl: './ver-country.component.html',
  styleUrls: ['./ver-country.component.css']
})
export class VerCountryComponent {
  countryId: number;
  country!: Country;

  country$!: Observable<Country>

  constructor(private _countryService: CountryService,
    private aRoute: ActivatedRoute) {
    this.countryId = +this.aRoute.snapshot.paramMap.get('countryId')!; //Obtener la id pasada
  }

  ngOnInit(): void {
    this.obtenerCountry();
  }

  obtenerCountry() {
    this._countryService.getCountry(this.countryId).subscribe(data => {
      this.country = data;
    });
  }
}
