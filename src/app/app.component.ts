import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonModule } from './pokemon/pokemon.module';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http'; // Ajout de HttpClientModule ici
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    PokemonModule,
    HttpClientModule // Importation du module HttpClientModule ici
  ],
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Step 1 : "Hello, Heroku ! 👋"
    this.http
      .get("https://nodejs-pokemon-app-7c787d11ce98.herokuapp.com/")
      .subscribe((res) => console.log(res));

    // Step 2 : "Get JWT token 🔓"
    this.http
      .post<AuthResponse>( // Utilisation de l'interface AuthResponse pour typer la réponse
        "https://nodejs-pokemon-app-7c787d11ce98.herokuapp.com/api/login",
        { username: "pikachu", password: "pikachu" },
        this.httpOptions
      )
      .pipe(
        tap((res) => console.log(res)),
        switchMap((res) => this.fetchPokemonlist(res.token)) // Accès à res.token typé
      )
      .subscribe((res) => console.log(res));
  }

  // Step 3 : "Get pokemon list 🎉"
  fetchPokemonlist(token: string) {
    const httpOptionsWithJWT = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };

    return this.http.get(
      "https://nodejs-pokemon-app-7c787d11ce98.herokuapp.com/api/pokemons",
      httpOptionsWithJWT
    );
  }
}

// Interface pour typer la réponse de la requête POST
interface AuthResponse {
  token: string;
}
