import {Component, HostListener, ViewChild} from '@angular/core';
import {MatStepper} from "@angular/material";

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
  @ViewChild('stepper') public Stepper: MatStepper;

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
}
