## Modular Javascript

incase you want to make your routes become modular, you have to separate each routes and integrate as single variable. So instead justv calling raw route, you have to merge it into one route first than call it on entry point `index.js`

-> routes
    -> userRouter.js
    -> transactionRouter.js
    -> index.js

```js
index.js 


const userRoute = require('./userRouter.js')
const transactionRoute = require('./transactionRouter.js')

const router = express.Router();

router.use('/user', userRoute);
router.use('/transaction', transactionRoute);



const apiRouter = express.Router();
apiRouter.use('/api', transactionRouter);

module.exports = apiRouter;

```