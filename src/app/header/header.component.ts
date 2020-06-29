import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() username;
  pageTitle="Welcome"
  constructor() { }

  ngOnInit(): void {

    console.log(this.username);
  }

}
