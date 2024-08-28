import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { PokemonService } from '../pokemon/pokemon.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokemonTypeColorPipe } from '../pokemon/pokemon-type-color.pipe';
import { LoaderComponent } from '../pokemon/loader/loader.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, PokemonTypeColorPipe, LoaderComponent],
  providers: [PokemonService],
})
export class LoginComponent implements OnInit {
  message: string = 'Vous êtes déconnecté. (pikachu/pikachu)';
  name: string;
  password: string;
  auth: AuthService;

  constructor(
    private authService: AuthService, 
    private router: Router
  ) { }

  ngOnInit() {
    this.auth = this.authService;
  }

  setMessage() {
    if(this.auth.isLoggedIn) {
      this.message = 'Vous êtes connecté.';
    } else {
      this.message = 'Indentifiant ou mot de passe incorrect.'
    }
  }

  login() {
    this.message = 'Tentative de connexion en cours...';
    this.auth.login(this.name, this.password)
      .subscribe((isLoggedIn: boolean) => {
        this.setMessage();
        if(isLoggedIn) {
          this.router.navigate(['/pokemons']);
        } else {
          this.password = '';
          this.router.navigate(['/login']);
        }
      })
  }

  logout() {
    this.auth.logout();
    this.message = 'Vous êtes déconnecté.';
  }

}