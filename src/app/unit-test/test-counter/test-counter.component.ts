import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-test-counter',
  template: `
  <style>
    :host {
      display: block;
      max-width: 800px;
      width: 80%;
      margin-bottom: 1rem;
      border: 4px solid navy;
      border-radius: 2px;
      padding: 0 1rem;
    }
  </style>
  <h1>Independent counter</h1>
  <p>
    <strong data-testid="count">{{ count }}</strong>
  </p>
  <p>
    <!-- Note: data-testid as attribute is to set to CSS query -->
    <button (click)="increment()" data-testid="increment-button">+</button>
    <button (click)="decrement()" data-testid="decrement-button">-</button>
  </p>
  <p>
    <input type="number" #resetInput data-testid="reset-input" />
    <button (click)="reset(resetInput.value)" data-testid="reset-button">Reset</button>
  </p>
  `,
})
export class TestCounterComponent implements OnInit {

  constructor(){

  }
  
  ngOnInit(): void {
    
  }

  @Input()
  public startCount = 0;

  @Output()
  public countChange = new EventEmitter<number>();

  public count = 0;

  public ngOnChanges(): void {
    this.count = this.startCount;
  }

  public increment(): void {
    this.count++;
    this.notify();
  }

  public decrement(): void {
    this.count--;
    this.notify();
  }

  public reset(newCount: string): void {
    const count = parseInt(newCount, 10);
    if (!Number.isNaN(count)) {
      this.count = count;
      this.notify();
    }
  }

  private notify(): void {
    this.countChange.emit(this.count);
  }
}
