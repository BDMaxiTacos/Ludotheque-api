/*
  IMPORT DES MODULES
 */
const { app } = require('./modules/Express');
const { Mongoose } = require('./modules/Mongoose');

/*
  IMPORT DES FICHIERS DE CONFIGURATION
 */
const ExpressConfig = require('./config/express.json');

/*
  INCLUSION DES MODULES SECURITE
 */
const AccessList = require('./modules/Security/Access');
const CheckAccess = require('./modules/Security/CheckAccess');

/*
  IMPORT DES SCHEMAS MONGOOSE
 */
const UserSchema = require('./schema/UserSchema');
const GameSchema = require('./schema/GameSchema');
const EditorSchema = require('./schema/EditorSchema');
const LoanSchema = require('./schema/LoanSchema');
const CategorySchema = require('./schema/CategorySchema');
const SubscriptionSchema = require('./schema/SubscriptionSchema');

/*
  IMPORT DES ROUTES BASIQUES
 */
const AuthenticateAPI = require('./routes/Authenticate');
app.use('/api/', AuthenticateAPI);

const UserAPI = require('./routes/Users');
app.use('/users/', UserAPI);

const GameAPI = require('./routes/Games');
app.use('/games/', GameAPI);

const EditorAPI = require('./routes/Editors');
app.use('/editors/', EditorAPI);

const LoanAPI = require('./routes/Loans');
app.use('/loans/', LoanAPI);

const CategoryAPI = require('./routes/Categories');
app.use('/categories/', CategoryAPI);

const SubscriptionAPI = require('./routes/Subscriptions');
app.use('/subscriptions/', SubscriptionAPI);

const StatisticsAPI = require('./routes/Statistics');
app.use('/statistics/', StatisticsAPI);

/*
  IMPORT DES ROUTES DE TEST
 */
const UserTestAPI = require('./tests/class/UsersTest');
app.use('/test/users/', UserTestAPI);

const GameTestAPI = require('./tests/class/GamesTest');
app.use('/test/games/', GameTestAPI);

const EditorTestAPI = require('./tests/class/EditorsTest');
app.use('/test/editors/', EditorTestAPI);

const LoanTestAPI = require('./tests/class/LoansTest');
app.use('/test/loans/', LoanTestAPI);

const CategoryTestAPI = require('./tests/class/CategoriesTest');
app.use('/test/categories/', CategoryTestAPI);

/*
  IMPORT DES ROUTES DE FIXTURES
 */
const FixturesAPI = require('./fixtures/Fixtures');
app.use('/fixtures/', FixturesAPI);

/*
  LANCEMENT DU SERVEUR
 */
app.listen(ExpressConfig.PORT, () => {
  console.log(`Serveur is listening on port ${ExpressConfig.PORT}`);
});
