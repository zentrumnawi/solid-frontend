import {Component, HostListener, ViewChild} from '@angular/core';
import {MatStepper} from "@angular/material/stepper";
import {HttpClient} from "@angular/common/http";
import {Page, pages} from "./determination-helper.pages";
import {Observable, of} from "rxjs";
import {map, tap} from "rxjs/operators";

export enum KEY {
  RIGHT_ARROW = 'ArrowRight',
  LEFT_ARROW = 'ArrowLeft'
}

@Component({
  selector: 'app-determination-helper',
  templateUrl: './determination-helper.component.html',
  styleUrls: ['./determination-helper.component.scss'],
})
export class DeterminationHelperComponent {
  public MaxStep = 0;
  @ViewChild('stepper', {static: true}) public Stepper!: MatStepper;
  public Steps = pages;


  constructor(http: HttpClient) {
    this.Steps.forEach(step => {
      http.get(step.contentPath, {responseType: 'text'}).toPromise().then(v => step.content = v);
    })
  }

  @HostListener('window:keyup', ['$event'])
  public keyEvent(event: KeyboardEvent) {
    if (event.key === KEY.LEFT_ARROW) {
      this.Stepper.previous();
    } else if (event.key === KEY.RIGHT_ARROW) {
      this.Stepper.next();
    }
  }

  public onNextStepClick(stepId: number) {
    if (this.MaxStep < stepId) {
      this.MaxStep = stepId;
    }
  }

  public showGlossaryEntry($event: MouseEvent, glossaryId: string) {
    // TODO: this method should navigate to the glossary entry
  }

  public onPanEnd($event: any) {
    if ($event.deltaX > 100) {
      this.Stepper.previous();
    } else if ($event.deltaX < -100) {
      this.Stepper.next();
    }
  }
}
