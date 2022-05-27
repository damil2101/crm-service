import app from './app';
import env from './environments';

// Port configuration
var port = env.getPort();

//Launch app
app.listen(port, () => {
    console.log("Running crm-service on port" + port)
});


