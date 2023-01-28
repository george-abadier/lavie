# lavie
Use my dump file will help you to test the APIs 
Note that there is four level authentication in this APIs

First not signing user could access only the routes that without any authentication 

Then user could get and buy and rate and post and have some special routes for him 
that depend on the level field on his schema because the employees have no level 

Then the the normal employee(supporter) this one could do all the user routes except
 that which depend on level field because he has no level and also have some additional
 routes like adding something to the web like product, new plant and data and also 
could deal with the orders from users and answering on technical questions


Then the manager who had all permissions except that depend on level field and could
 also give permissions to some position and also add new position and give him the 
permissions that he want 

I included my database and my thunder client collection to make it easy for you 

And note that there is two get routes should be tested from a browser not from postman
 or thunder client, this two routes is login with Facebook and login with google because 
they need you browser cookies and they return an html page to choose your account or to
 login if you are not then return the user data so it need browser to be tested on 

Wait for more enhancements

I hope you engoy it 😀

