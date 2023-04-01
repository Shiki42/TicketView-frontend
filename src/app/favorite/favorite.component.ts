import { Component } from '@angular/core';

interface FavoriteEvent {
  id : string;
  date: Date;
  event: string;
  category: string;
  venue: string;
}

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent {
  favoriteEvents: FavoriteEvent[] = [];
  showAlert = false;
  alertMessage = 'Removed from Favorites!';

  ngOnInit() {
    this.loadFavoriteEvents();
  }

  loadFavoriteEvents() {
    const favoriteEventsKey = 'favorite_events';
    this.favoriteEvents = JSON.parse(localStorage.getItem(favoriteEventsKey) || '[]');
  }

  removeFavoriteEvent(eventToRemove: string) {
    const favoriteEventsKey = 'favorite_events';
    this.favoriteEvents = this.favoriteEvents.filter((e) => e.id !== eventToRemove);
    localStorage.setItem(favoriteEventsKey, JSON.stringify(this.favoriteEvents));
    this.showAlert = true;
  }
  closeAlert() {
    this.showAlert = false;
  }
}
