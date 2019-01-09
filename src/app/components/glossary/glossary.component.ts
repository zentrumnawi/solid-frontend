import { Component} from '@angular/core';
import {GlossaryService} from '../../services/glossary.service';
import {BaseComponent} from '../../shared/abstract/base.component';

@Component({
  selector: 'app-glossary',
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.scss']
})
export class GlossaryComponent extends BaseComponent {
  public Entries: any;
  constructor(
    service: GlossaryService,
  ) {
    super();
    this.addOnInit(async () => {
      this.Entries = Object.entries(await service.getGlossaryEntries());
    });
  }
}
