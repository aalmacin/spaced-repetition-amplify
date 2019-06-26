import { Component, OnInit, Input } from '@angular/core';
import { CardService } from '../card.service';

@Component({
  selector: 'tr[app-card-management-item]',
  templateUrl: './card-management-item.component.html',
  styleUrls: ['./card-management-item.component.scss']
})
export class CardManagementItemComponent implements OnInit {
  @Input()
  public card: any;

  public viewMode = true;

  public deleted = false;

  constructor(private cardService: CardService) {}

  ngOnInit() {}

  startEditMode() {
    this.viewMode = false;
  }

  saveChanges(id: string, frontValue: string, backValue: string) {
    this.viewMode = true;
    this.cardService.updateCard(id, frontValue, backValue).then(() => alert('Updated Card'));
  }

  deleteCard(id: string) {
    const confirmedDeletion = confirm('Are you sure you want to delete card?');
    if (confirmedDeletion) {
      this.cardService.deleteCard(id);
      this.deleted = true;
    }
  }
}
