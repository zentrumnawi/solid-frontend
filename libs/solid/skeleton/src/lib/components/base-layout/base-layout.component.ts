import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { UpdateService } from '../../services/update.service';
import { SOLID_CORE_CONFIG, SolidCoreConfig } from '@zentrumnawi/solid-core';
import {
  FeedbackService,
  SOLID_SKELETON_FEEDBACK_SERVICE,
} from '../../services/feedback.service';
import { Router } from '@angular/router';
import { IntroService } from '../../services/intro.service';

@Component({
  selector: 'solid-skeleton-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss'],
})
export class BaseLayoutComponent implements OnInit, AfterViewInit {
  public FixedLayout = false;
  @ViewChild('mainmenu', { static: true }) MainMenu?: MatDrawer;
  @ViewChild('glossary', { static: true }) Glossary?: MatDrawer;

  // noinspection JSUnusedLocalSymbols
  constructor(
    @Inject(SOLID_SKELETON_FEEDBACK_SERVICE)
    public feedback: FeedbackService,
    @Inject(SOLID_CORE_CONFIG) public config: SolidCoreConfig,
    update: UpdateService,
    private introService: IntroService,
    private _breakpointObserver: BreakpointObserver,
    private _router: Router
  ) {}

  public ngOnInit() {
    this._breakpointObserver
      .observe(['(min-width: 1000px)'])
      .subscribe((isFixed) => {
        const newFixedLayout = isFixed.matches;
        if (newFixedLayout) {
          if (this.MainMenu) {
            this.MainMenu.open();
          }
          if (this.Glossary) {
            this.Glossary.close();
          }
        } else {
          if (this.MainMenu) {
            this.MainMenu.close();
          }
          if (this.Glossary) {
            this.Glossary.close();
          }
        }
        this.FixedLayout = newFixedLayout;
      });
    if (this.Glossary) {
      console.log(this.Glossary);
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.introService.featureOne((_targetElement: any) => {
        if (_targetElement.id === 'step2') {
          this.Glossary?.toggle();
        }
        if (_targetElement.id === 'step3') {
          this.reportError();
        }
      });
      this.introService.featureTwo();
    }, 2000);
  }

  public async onMenuSelectionChanged() {
    if (!this.FixedLayout && this.MainMenu) {
      await this.MainMenu.close();
    }
    if (!this.FixedLayout && this.Glossary) {
      await this.Glossary.close();
    }
  }
  public onMenuGlossarClick() {
    if (this.Glossary) {
      this.Glossary.open();
    }
    if (!this.FixedLayout && this.MainMenu) {
      this.MainMenu.close();
    }
  }

  public closeMenu() {
    if (this.MainMenu && !this.FixedLayout) this.MainMenu.close();
  }

  public reportError() {
    const location = this.Glossary?.opened ? 'glossary' : this._router.url;
    this.feedback.showDialog(location);
  }
}
