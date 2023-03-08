import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'solid-skeleton-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
})
export class MessageListComponent implements AfterViewInit, OnChanges {
  @Input() messages: any;
  @Input() tabIndex: any;

  private messageInStorage: any;

  constructor() {
    this.messageInStorage = localStorage.getItem('solid_skeleton_messages');
  }

  ngAfterViewInit(): void {
    if (this.messages[0].type != 'CL') {
      const msgObj = JSON.parse(this.messageInStorage);
      msgObj.forEach((msg: any) => {
        if (msg.type != 'CL') msg.unread = false;
      });
      localStorage.setItem('solid_skeleton_messages', JSON.stringify(msgObj));
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.messages[0].type == 'CL' && changes.tabIndex.currentValue == 3) {
      const msgObj = JSON.parse(this.messageInStorage);
      msgObj.forEach((msg: any) => {
        msg.unread = false;
      });
      localStorage.setItem('solid_skeleton_messages', JSON.stringify(msgObj));
    } else return;
  }
}
