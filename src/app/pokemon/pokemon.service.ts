import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Pokemon } from './pokemon';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl = 'api/pokemons';  // URL de l'API en mémoire

  constructor(private http: HttpClient) {}

  getPokemonList(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>('api/pokemons').pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }

  getPokemonById(pokemonId: number): Observable<Pokemon|undefined> {
    return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, undefined))
    );
  }

  serachPokemonList(term:string): Observable<Pokemon[]>{

    if(term.length<=1){
      return of([]);
    }
    return this.http.get<Pokemon[]>(`api/pokemons/?name=${term}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }
  updatePokemon(pokemon: Pokemon):Observable<null> {
    const httpOptions={
      headers: new HttpHeaders({'Content-Type':'application/json'})
    };
    return this.http.put('api/pokemons',pokemon, httpOptions).pipe(
      tap((response)=>this.log(response)),
      catchError((error)=>this.handleError(error,undefined))
    );   
  }
  addPokemon(pokemon:Pokemon):Observable<Pokemon>{
    const httpOptions={
      headers: new HttpHeaders({'Content-Type':'application/json'})
    };
    return this.http.post<Pokemon>('api/pokemons', pokemon, httpOptions).pipe(
      tap((response)=>this.log(response)),
      catchError((error)=>this.handleError(error,undefined))
    )
  }

  deletePokemonById(pokemonId: number):Observable<null>{
    return this.http.delete(`api/pokemons/${pokemonId}`).pipe(
    tap((response)=>this.log(response)),
    catchError((error)=>this.handleError(error,undefined)))

  }
  private log(response: any) {
    console.table(response);
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }
  getPokemonTypeList(): string[] {
    return [
      'Plante', 
      'Feu', 
      'Eau', 
      'Insecte',
      'Normal',
      'Electrik', 
      'Poison', 
      'Fée',
      'Vol',
      'Combat',
      'Psy'
    ];
  }
}
