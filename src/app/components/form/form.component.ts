import { SchoolTripInterface } from './../../models/schoolTrip.model';
import { Component, OnInit } from '@angular/core';
import { schoolTrip } from '../../../mocks/school-trip.mock';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  schoolTripMock: SchoolTripInterface[];
  formGroup: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.schoolTripMock = schoolTrip;
    //Criamos o formGroup em branco logo que é construido o componente
    this.formGroup = this.formBuilder.group({});
  }
  ngOnInit(): void {
    //Chamamos a função que faz preencher o formGroup
    this.generateFormBuilder(this.schoolTripMock);
  }
  generateFormBuilder(request: SchoolTripInterface[]): void {
    //Percorre o primeiro array do mock (2)
    request.map((resp, index) => {
      //Cria um array vazio, e mapeia os itens do grupo, inserindo dentro desse array um formControl boolean
      const ordersArray: any = [];
      resp.items.map(() => {
        ordersArray.push(new FormControl(false)); //False é o valor do checkbox padrão
      });
      //Depois de preenchido o array, vamos jogar dentro do nosso formgroup
      this.formGroup.addControl(
        `formControl_${index}`,
        new FormControl(resp.title)
      );
      this.formGroup.addControl(
        `formControl_${index}_Array`,
        new FormArray(ordersArray)
      );
    });
    console.log(this.formGroup.value);
  }
  /**
   * Função que é acionada quando enviado o formulario
   */
  onSubmit(): void{
    console.log(this.formGroup.value);
  }
}
