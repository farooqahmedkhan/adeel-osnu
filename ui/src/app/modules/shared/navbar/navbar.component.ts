import { Component, OnInit } from '@angular/core';

interface MenuItem {
  title: String,
  url: String,
  enabled: Boolean
};

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  public menuItems: Array<MenuItem> = [];
  constructor() { }

  ngOnInit() {
    this.menuItems.push({ title: 'Home', url: '/dashboard', enabled: true});
    this.menuItems.push({ title: 'Applications', url: '/applications', enabled: true});
    this.menuItems.push({ title: 'Templates', url: '/templates', enabled: true});
  }

}
