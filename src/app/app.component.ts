import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from './shop/services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projet_fil_rouge_front';
  
  constructor(translate: TranslateService, private userService: UserService) {    
    this.userService.getUser();
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('fr');

     // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('fr');

    translate.setTranslation('fr', {
      app: {
        form: {
          error: {
            firstname: {
              max_length: "Le prénom ne doit pas dépasser 20 caractères",
              min_length: "Le prénom doit faire au moins 3 caractères",
              required: 'Le prénom est requis',
            },
            lastname: {
              max_length: "Le nom ne doit pas dépasser 30 caractères",
              min_length: "Le nom doit faire au moins 2 caractères",
              required: 'Le nom est requis',
            },
            email: {
              unique: "Cet email est déja utilisé",
              type: "Veuillez rentrer un email valide",
            },
            password: {
              min_length: 'Le mot de passe doit faire au moins 8 caractères',
              required: 'Le mot de passe est requis',
            },
            password_confirm: {
              not_same: 'Les mots de passe ne sont pas similaires',
            },
            address: {
              street: "La rue doit faire au moins 4 caractères",
              postalCode: "Le code postal doit faire au moins 5 caractères",
            }
          }
        }
      }
  });
}
}
