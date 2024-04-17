import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})export class AppComponent implements OnInit  {
   constructor(private router:Router,private location: Location){}
  login:String="";
  ngOnInit(): void {
    if(localStorage.getItem('Login') !== 'Sucessful' ){
      if(this.location.path()==="/register"){
        this.router.navigate(['/register']);
      }else{
        this.router.navigate(['/login']);
      }
      

    }
   this.login= localStorage.getItem('Login')=="Sucessful"?"Sucessful":"failed";
  }
  title = 'Assignment2 - 101400831 - Mohammadali Talaei';

  logout():void{

    
    localStorage.removeItem('Login')
    window.location.reload()
    

  }

  
  
}