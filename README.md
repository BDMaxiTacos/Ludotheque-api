# Ludothèque
## Initialisation du projet
### Base de données

La base de données utilisée est une base `MongoDB`. Elle est accessible par le biais des informations suivantes :

```
Adresse : romainmunier.ovh
Port : 27030
Base de données : LUDOAPI_{INITIALES}
```

#### Création d'un utilisateur

Lors de la première utilisation d'une base de données `MongoDB`, il est nécessaire de créer un utilisateur. Pour ce faire, il s'agit d'utiliser la commande suivante :

```
use LUDOAPI_{INITIALES};
db.createUser( { user: "ludoapi",
                 pwd: "2JOypQS87KSuJO5P8Y2trNh8tTR6VHvp",
                 roles: ["readWrite"] })
```

#### Informations d'authentification

Pour vous connecter à votre base de données `MongoDB` depuis **Mongoose**, utilisez les informations de connexion suivantes :

```
Identifiant : ludoapi
Mot de passe : 2JOypQS87KSuJO5P8Y2trNh8tTR6VHvp
```

#### Mettre en place la connexion

Pour mettre en place la connexion à `MongoDB`, copiez le fichier nommé `default_mongoose.json` situé dans le répertoire ci-dessous :
```
/init/config/default_mongoose.json
```

Dans le dossier suivant, **en veillant bien à le nommer `mongoose.json`** :
```
/config/mongoose.json
```

### Schéma de base de données

#### Utilisateurs (`Users`)

```json
{
  "firstname": String,
  "lastname": String,
  "address": String,
  "phone": String,
  "mail": String,
  "subscriptionDate": Date,
  "subscriptionType": String,
  "birthday": Date,
  "image": String,
  "roles": [
    {
      "name": String
    }
  ]
}
```

#### Roles (`Role`)

```json
{
  "name": String
}
```