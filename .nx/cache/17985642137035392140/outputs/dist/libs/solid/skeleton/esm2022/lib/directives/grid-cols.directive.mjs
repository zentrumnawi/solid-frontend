import { Directive, HostBinding, Input } from '@angular/core';
import { MatGridList } from '@angular/material/grid-list';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import * as i0 from '@angular/core';
import * as i1 from '@angular/material/grid-list';
import * as i2 from '@angular/cdk/layout';
export class GridColsDirective {
  grid;
  breakpointObserver;
  gridWidth;
  gridMarginTop;
  gridCols = { xs: 1, sm: 2, md: 4, lg: 6, xl: 7 };
  get cols() {
    return this.gridCols;
  }
  set cols(map) {
    if (map && 'object' === typeof map) {
      this.gridCols = map;
    }
  }
  constructor(grid, breakpointObserver) {
    this.grid = grid;
    this.breakpointObserver = breakpointObserver;
    if (this.grid != null) {
      this.grid.cols = this.gridCols.md;
    }
  }
  ngOnInit() {
    if (this.grid != null) {
      this.grid.cols = this.gridCols.md;
    }
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((result) => {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.grid.cols = this.gridCols.xs;
          this.gridWidth = '23rem';
        }
        if (result.breakpoints[Breakpoints.Small]) {
          this.grid.cols = this.gridCols.sm;
          this.gridWidth = '34rem';
          this.gridMarginTop = '1vh';
        }
        if (result.breakpoints[Breakpoints.Medium]) {
          this.grid.cols = this.gridCols.md;
          this.gridWidth = '34rem';
          this.gridMarginTop = '1vh';
        }
        if (result.breakpoints[Breakpoints.Large]) {
          this.grid.cols = this.gridCols.lg;
          this.gridWidth = '34rem';
          this.gridMarginTop = '1vh';
        }
        if (result.breakpoints[Breakpoints.XLarge]) {
          this.grid.cols = this.gridCols.xl;
          this.gridWidth = this.grid.cols > 6 ? '80rem ' : '70rem';
          this.gridMarginTop = '4vh';
        }
      });
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: GridColsDirective,
    deps: [{ token: i1.MatGridList }, { token: i2.BreakpointObserver }],
    target: i0.ɵɵFactoryTarget.Directive,
  });
  static ɵdir = i0.ɵɵngDeclareDirective({
    minVersion: '14.0.0',
    version: '16.2.9',
    type: GridColsDirective,
    selector: '[solidSkeletonGridCols]',
    inputs: { cols: ['solidSkeletonGridCols', 'cols'] },
    host: {
      properties: {
        'style.width': 'this.gridWidth',
        'style.marginTop': 'this.gridMarginTop',
      },
    },
    ngImport: i0,
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: GridColsDirective,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: '[solidSkeletonGridCols]',
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [{ type: i1.MatGridList }, { type: i2.BreakpointObserver }];
  },
  propDecorators: {
    gridWidth: [
      {
        type: HostBinding,
        args: ['style.width'],
      },
    ],
    gridMarginTop: [
      {
        type: HostBinding,
        args: ['style.marginTop'],
      },
    ],
    cols: [
      {
        type: Input,
        args: ['solidSkeletonGridCols'],
      },
    ],
  },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC1jb2xzLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc29saWQvc2tlbGV0b24vc3JjL2xpYi9kaXJlY3RpdmVzL2dyaWQtY29scy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsV0FBVyxFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7QUFZdEUsTUFBTSxPQUFPLGlCQUFpQjtJQWtCbEI7SUFDQTtJQWxCa0IsU0FBUyxDQUFVO0lBQ2YsYUFBYSxDQUFVO0lBRS9DLFFBQVEsR0FBZ0IsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUV0RSxJQUFXLElBQUk7UUFDYixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQ1csSUFBSSxDQUFDLEdBQWdCO1FBQzlCLElBQUksR0FBRyxJQUFJLFFBQVEsS0FBSyxPQUFPLEdBQUcsRUFBRTtZQUNsQyxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztTQUNyQjtJQUNILENBQUM7SUFFRCxZQUNVLElBQWlCLEVBQ2pCLGtCQUFzQztRQUR0QyxTQUFJLEdBQUosSUFBSSxDQUFhO1FBQ2pCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFFOUMsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQztTQUNuQztJQUNILENBQUM7SUFFTSxRQUFRO1FBQ2IsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQztTQUNuQztRQUNELElBQUksQ0FBQyxrQkFBa0I7YUFDcEIsT0FBTyxDQUFDO1lBQ1AsV0FBVyxDQUFDLE1BQU07WUFDbEIsV0FBVyxDQUFDLEtBQUs7WUFDakIsV0FBVyxDQUFDLE1BQU07WUFDbEIsV0FBVyxDQUFDLEtBQUs7WUFDakIsV0FBVyxDQUFDLE1BQU07U0FDbkIsQ0FBQzthQUNELFNBQVMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ3BCLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO2dCQUNsQyxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQzthQUMxQjtZQUNELElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO2dCQUNsQyxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztnQkFDekIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7YUFDNUI7WUFDRCxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO2FBQzVCO1lBQ0QsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO2dCQUN6QixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQzthQUM1QjtZQUNELElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO2dCQUNsQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQ3pELElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO2FBQzVCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO3VHQWhFVSxpQkFBaUI7MkZBQWpCLGlCQUFpQjs7MkZBQWpCLGlCQUFpQjtrQkFIN0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUseUJBQXlCO2lCQUNwQzttSUFFNkIsU0FBUztzQkFBcEMsV0FBVzt1QkFBQyxhQUFhO2dCQUNNLGFBQWE7c0JBQTVDLFdBQVc7dUJBQUMsaUJBQWlCO2dCQVNuQixJQUFJO3NCQURkLEtBQUs7dUJBQUMsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0QmluZGluZywgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNYXRHcmlkTGlzdCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2dyaWQtbGlzdCc7XHJcbmltcG9ydCB7IEJyZWFrcG9pbnRPYnNlcnZlciwgQnJlYWtwb2ludHMgfSBmcm9tICdAYW5ndWxhci9jZGsvbGF5b3V0JztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgR3JpZENvbHVtbnMge1xyXG4gIHhzOiBudW1iZXI7XHJcbiAgc206IG51bWJlcjtcclxuICBtZDogbnVtYmVyO1xyXG4gIGxnOiBudW1iZXI7XHJcbiAgeGw6IG51bWJlcjtcclxufVxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tzb2xpZFNrZWxldG9uR3JpZENvbHNdJyxcclxufSlcclxuZXhwb3J0IGNsYXNzIEdyaWRDb2xzRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLndpZHRoJykgZ3JpZFdpZHRoPzogc3RyaW5nO1xyXG4gIEBIb3N0QmluZGluZygnc3R5bGUubWFyZ2luVG9wJykgZ3JpZE1hcmdpblRvcD86IHN0cmluZztcclxuXHJcbiAgcHJpdmF0ZSBncmlkQ29sczogR3JpZENvbHVtbnMgPSB7IHhzOiAxLCBzbTogMiwgbWQ6IDQsIGxnOiA2LCB4bDogNyB9O1xyXG5cclxuICBwdWJsaWMgZ2V0IGNvbHMoKTogR3JpZENvbHVtbnMge1xyXG4gICAgcmV0dXJuIHRoaXMuZ3JpZENvbHM7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoJ3NvbGlkU2tlbGV0b25HcmlkQ29scycpXHJcbiAgcHVibGljIHNldCBjb2xzKG1hcDogR3JpZENvbHVtbnMpIHtcclxuICAgIGlmIChtYXAgJiYgJ29iamVjdCcgPT09IHR5cGVvZiBtYXApIHtcclxuICAgICAgdGhpcy5ncmlkQ29scyA9IG1hcDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZ3JpZDogTWF0R3JpZExpc3QsXHJcbiAgICBwcml2YXRlIGJyZWFrcG9pbnRPYnNlcnZlcjogQnJlYWtwb2ludE9ic2VydmVyXHJcbiAgKSB7XHJcbiAgICBpZiAodGhpcy5ncmlkICE9IG51bGwpIHtcclxuICAgICAgdGhpcy5ncmlkLmNvbHMgPSB0aGlzLmdyaWRDb2xzLm1kO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuZ3JpZCAhPSBudWxsKSB7XHJcbiAgICAgIHRoaXMuZ3JpZC5jb2xzID0gdGhpcy5ncmlkQ29scy5tZDtcclxuICAgIH1cclxuICAgIHRoaXMuYnJlYWtwb2ludE9ic2VydmVyXHJcbiAgICAgIC5vYnNlcnZlKFtcclxuICAgICAgICBCcmVha3BvaW50cy5YU21hbGwsXHJcbiAgICAgICAgQnJlYWtwb2ludHMuU21hbGwsXHJcbiAgICAgICAgQnJlYWtwb2ludHMuTWVkaXVtLFxyXG4gICAgICAgIEJyZWFrcG9pbnRzLkxhcmdlLFxyXG4gICAgICAgIEJyZWFrcG9pbnRzLlhMYXJnZSxcclxuICAgICAgXSlcclxuICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgaWYgKHJlc3VsdC5icmVha3BvaW50c1tCcmVha3BvaW50cy5YU21hbGxdKSB7XHJcbiAgICAgICAgICB0aGlzLmdyaWQuY29scyA9IHRoaXMuZ3JpZENvbHMueHM7XHJcbiAgICAgICAgICB0aGlzLmdyaWRXaWR0aCA9ICcyM3JlbSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyZXN1bHQuYnJlYWtwb2ludHNbQnJlYWtwb2ludHMuU21hbGxdKSB7XHJcbiAgICAgICAgICB0aGlzLmdyaWQuY29scyA9IHRoaXMuZ3JpZENvbHMuc207XHJcbiAgICAgICAgICB0aGlzLmdyaWRXaWR0aCA9ICczNHJlbSc7XHJcbiAgICAgICAgICB0aGlzLmdyaWRNYXJnaW5Ub3AgPSAnMXZoJztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJlc3VsdC5icmVha3BvaW50c1tCcmVha3BvaW50cy5NZWRpdW1dKSB7XHJcbiAgICAgICAgICB0aGlzLmdyaWQuY29scyA9IHRoaXMuZ3JpZENvbHMubWQ7XHJcbiAgICAgICAgICB0aGlzLmdyaWRXaWR0aCA9ICczNHJlbSc7XHJcbiAgICAgICAgICB0aGlzLmdyaWRNYXJnaW5Ub3AgPSAnMXZoJztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJlc3VsdC5icmVha3BvaW50c1tCcmVha3BvaW50cy5MYXJnZV0pIHtcclxuICAgICAgICAgIHRoaXMuZ3JpZC5jb2xzID0gdGhpcy5ncmlkQ29scy5sZztcclxuICAgICAgICAgIHRoaXMuZ3JpZFdpZHRoID0gJzM0cmVtJztcclxuICAgICAgICAgIHRoaXMuZ3JpZE1hcmdpblRvcCA9ICcxdmgnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocmVzdWx0LmJyZWFrcG9pbnRzW0JyZWFrcG9pbnRzLlhMYXJnZV0pIHtcclxuICAgICAgICAgIHRoaXMuZ3JpZC5jb2xzID0gdGhpcy5ncmlkQ29scy54bDtcclxuICAgICAgICAgIHRoaXMuZ3JpZFdpZHRoID0gdGhpcy5ncmlkLmNvbHMgPiA2ID8gJzgwcmVtICcgOiAnNzByZW0nO1xyXG4gICAgICAgICAgdGhpcy5ncmlkTWFyZ2luVG9wID0gJzR2aCc7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICB9XHJcbn1cclxuIl19
