import { OnInit } from '@angular/core';
import { MatGridList } from '@angular/material/grid-list';
import { BreakpointObserver } from '@angular/cdk/layout';
import * as i0 from '@angular/core';
export interface GridColumns {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}
export declare class GridColsDirective implements OnInit {
  private grid;
  private breakpointObserver;
  gridWidth?: string;
  gridMarginTop?: string;
  private gridCols;
  get cols(): GridColumns;
  set cols(map: GridColumns);
  constructor(grid: MatGridList, breakpointObserver: BreakpointObserver);
  ngOnInit(): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<GridColsDirective, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    GridColsDirective,
    '[solidSkeletonGridCols]',
    never,
    { cols: { alias: 'solidSkeletonGridCols'; required: false } },
    {},
    never,
    never,
    false,
    never
  >;
}
