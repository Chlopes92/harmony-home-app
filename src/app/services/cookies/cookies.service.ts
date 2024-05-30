import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  constructor() { }

  // Méthode pour définir un cookie avec un nom, une valeur et une durée en jours.
  setCookie(name: string, value: boolean, days: number): void {
    const date = new Date(); // Crée une nouvelle instance de Date pour définir la date d'expiration du cookie.
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Définit le temps en millisecondes pour le nombre de jours spécifiés.
    const expires = `expires=${date.toUTCString()}`; // Convertit la date en une chaîne UTC pour l'utiliser dans le cookie.
    // Définit le cookie avec le nom, la valeur, la date d'expiration et le chemin racine.
    document.cookie = `${name}=${value}; ${expires}; path=/`;
  }

  // Méthode pour récupérer la valeur d'un cookie par son nom.
  getCookie(name: string): boolean | null {
    const nameEQ = `${name}=`; // Préfixe pour identifier le début du cookie.
    const ca = document.cookie.split(';'); // Divise tous les cookies en un tableau de paires clé-valeur.
    for (let i = 0; i < ca.length; i++) { // Boucle à travers tous les cookies.
      let c = ca[i];
      while (c.charAt(0) === ' ') { // Supprime les espaces blancs au début.
        c = c.substring(1);
      }
      if (c.indexOf(nameEQ) === 0) { // Vérifie si ce cookie commence par le nom recherché.
        return c.substring(nameEQ.length, c.length) === 'true'; // Retourne la valeur du cookie convertie en booléen.
      }
    }
    return null; // Retourne null si le cookie n'est pas trouvé.
  }

  // Méthode pour supprimer un cookie en définissant une date d'expiration passée.
  deleteCookie(name: string): void {
    // Définit le cookie avec une date d'expiration passée pour le supprimer.
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`; 
  }
}
