const AppConfig = require('../../config/app.json');

// TODO: Ajouter un champ "compte validé" dans la base de données
// TODO: Gérer le lien pour valider le compte utilisateur

module.exports = function register(USER = {}) {
  return `
    <!DOCTYPE html>
    <html lang="fr">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>${AppConfig.APP_NAME}</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
            <style>
                html, body {
                    height: 100% !important;
                    width: 100% !important;
                    user-select: none !important;
                    overflow-x: hidden !important;
                    margin: 0 !important;
                }
    
                .bg-gray {
                    background-color: #F4F4F4 !important;
                }
    
                h1 {
                    font-size: 4rem !important;
                }
    
                .text-justify {
                    text-align: justify !important;
                }
    
                .h-40 {
                    height: 40% !important;
                }
    
                .h-60 {
                    height: 60% !important;
                }
            </style>
        </head>
        <body class="bg-gray">
            <div class="w-100 h-40 bg-primary position-absolute d-flex justify-content-center align-content-center align-items-center" style="z-index: 1; top: 0; left: 0">
                <h1 style="font-size: 7rem !important;">${AppConfig.DEFAULT_EMOTE}</h1>
            </div>
            <div class="w-100 h-100 position-absolute" style="z-index: 5; top: 30%;">
                <div class="w-100 container card card-body" style="border-color: transparent; border-radius: 0.8rem;">
                    <h1 class="h1 text-center mt-3">
                        Bienvenue !
                    </h1>
                    <h3 class="h3 text-center text-black-50 mt-0">
                        Ludothèque de ${AppConfig.LUDOTHEQUE_LOCATION} ${AppConfig.DEFAULT_EMOTE}
                    </h3>
                    <p class="lead text-justify text-black-50 mt-5">
                        Bonjour ${USER.firstname} ${USER.lastname.toUpperCase()}, nous sommes heureux de vous accueillir dans notre ludothèque ! Vous pouvez y trouver tous les jeux que vous souhaitez, les emprunter le temps d'en profiter le plus possible en famille ou entre amis !
                    </p>
                    <p class="lead text-justify text-black-50 mt-3">
                        Mais avant tout, il est nécessaire que vous confirmiez votre compte afin d'utiliser nos services. Pour ce faire, utilisez le bouton ci-dessous et paramétrez votre compte en suivant les étapes décrites !
                    </p>
    
                    <div class="text-center mt-4">
                        <button class="btn btn-primary w-50">
                            <i class="fas fa-circle-check"></i>&nbsp;
                            Valider mon compte
                        </button>
                    </div>
    
                    <p class="lead text-justify text-black-50 mt-4">
                        Si le bouton proposé ci-dessus ne fonctionne pas, vous pouvez utiliser le lien suivant afin de valider votre compte :
                    </p>
    
                    <a href="#" class="link-primary text-center">### LINK ###</a>
    
                    <p class="lead text-justify text-black-50 mt-4">
                        Si vous avez la moindre question, n'hésitez pas à contacter le support technique afin d'en savoir plus. Nous sommes à votre entière disposition en cas de problème avec notre plateforme.
                    </p>
                    <p class="lead text-justify text-black-50 mt-3">
                        Cordialement,<br>
                        L'Équipe ${AppConfig.APP_NAME}
                    </p>
                </div>
    
                <div class="w-100 container card card-body mt-4 d-flex justify-content-center mb-5" style="border-color: transparent; border-radius: 0.8rem; background-color: rgba(255, 224, 130, 0.7) !important;">
                    <h3 class="h3 lead text-center mt-2 mb-0">Besoins d'aide spécifique ?</h3>
                    <a href="#" class="link-warning text-center mt-0" style="color: #FFA000 !important; font-size: 1.3rem;">Contactez le support technique dès maintenant !</a>
                </div>
            </div>
    
            <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
            <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/js/all.min.js"></script>
        </body>
    </html>

  `;
};
