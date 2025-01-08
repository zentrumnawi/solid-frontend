import { Directive, HostBinding, Input, OnInit } from '@angular/core';
import { MatGridList } from '@angular/material/grid-list';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

export interface GridColumns {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}
@Directive({
  selector: '[solidSkeletonGridCols]',
})
export class GridColsDirective implements OnInit {
  @HostBinding('style.width') gridWidth?: string;
  @HostBinding('style.marginTop') gridMarginTop?: string;

  private gridCols: GridColumns = { xs: 1, sm: 2, md: 4, lg: 6, xl: 7 };

  public get cols(): GridColumns {
    return this.gridCols;
  }

  @Input('solidSkeletonGridCols')
  public set cols(map: GridColumns) {
    if (map && 'object' === typeof map) {
      this.gridCols = map;
    }
  }

  public constructor(
    private grid: MatGridList,
    private breakpointObserver: BreakpointObserver,
  ) {
    if (this.grid != null) {
      this.grid.cols = this.gridCols.md;
    }
  }

  public ngOnInit(): void {
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
}
