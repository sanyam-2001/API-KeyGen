# API KeyGen
API KeyGen is a collection of Technologies that help Developers Create and Manage API Keys for their Node.Js Backend Servers.

### KeyGen Primarily works in 2 Phases:
- An [Online Portal](https://api-keygen.herokuapp.com/) for Initialization
- A command line Tool for Authentication
### Utility
Creating and managing API Keys for new Servers can be a bit of hassle because it requires a whole new Database and Couple of Modules to run them.
API KeyGen Automates this process with the Online portal Helping with Creation of APi Keys and NPM Module to Authenticate it.
API KeyGen Really helps speed up development when it comes to API Security and Management,

## Portal
The Portal  at [https://api-keygen.herokuapp.com/](https://api-keygen.herokuapp.com/), acts as a GUI tool to Register Your App and Get new API Keys.
## NPM CLI Tool
`api-keygen-npmcli` is the Command Line Counterpart of KeyGen that helps us to Authenticate Keys
## How To
- To start using the Functionalities, The very First Step is to `Register Your App` on The Portal.
> Your App Name should be Unique and You will be Provided with an `App ID` as a Downloadable Text File
- After you have succesfully Registered your App, Its time to create New API Keys.
> You can Create New API Keys from the Portal itself using your App ID and Password. A New Key Will also Be downloaded as a text File.
- Now its Time to Use the CLI tool
 #### Installation
 `const  authenticator = require('api-keygen-npmcli')`
 #### Usage
 `const authenticator = require('api-keygen-npmcli');`
 Authenticator is a Async Function that requires an AppID and API Key for validation. It returns a `Promise { <pending> }`. It can be Easily Resolved into a Boolean Value.
 #### Example
 For example, a route in your API Looks Like
 ```
app.get('getUsers', (req, res)=>{
	res.json(Users);
});
 ```

To use the Authentication, You will have to send APP ID and Key as Request Params or as Post Body and can be easily processed by `Authenticator`.
```
app.get('getUsers/:appID/:key', (req, res)=>{
	authenticator(req.params.appID, req.params.key).then(result=>{
		if(result){
			//Authenticated
			res.json(Users);
		}
		else{
			//Invalid Credentials
			res.json({err:"Invalid AppID or API Key"});
		}
	});
})
```
 The Module is in Alpha and under Heavy Development
 Expect Major Overhaul Shortly


