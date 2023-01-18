import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private routerPath: Router,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void { }

  goTo(menu: string) {
    const userId = parseInt(this.router.snapshot.params.userId)
    const token = this.router.snapshot.params.userToken
    if (menu === "logIn") {
      this.routerPath.navigate([`/`])
    }
    else if (menu === "evento") {
      this.routerPath.navigate([`/eventos/${userId}/${token}`])
    }
    else if (menu === "cartera") {
      this.routerPath.navigate([`/cartera/${userId}/${token}`])
    }
    else if (menu === "cuenta") {
      this.routerPath.navigate([`/cuenta/${userId}/${token}`])
    }
    else {
      this.routerPath.navigate([`/apuestas/${userId}/${token}`])
    }
  }

}
