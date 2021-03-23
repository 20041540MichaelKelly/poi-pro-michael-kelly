# poi-pro-michael-kelly
A project for college, where i will create POI of islands around Ireland.

There is a number of users that have been seeded through json, I found letting this reseed localy 
was a great way to de bug the program and find errors. So poi and users are the main Databases.
sample users: mick@kelly.com, password: secret
              sandra@kelly.com password: secret
              amanda@kelly.com password: secret
              
Admin users: breda@gmail.com password: secret
             myles@kelly.com password: admin
             
Theses are the only 2 admin but there are a lot more users seeded in. The images are stored in cloudinary
where we take the url and store it in the poi-db model. We use mongoose and cloud atlas to store the data.

The application have benn deployed on Glitch and Heroku, also the database uses cloud atlas. you can create, view update and delete Poi's.
You can upload and edit the image associated with Poi. The admin has the power to delete from cloudinary in there image Gallery.
The admin has basic analytics telling them how many users and how many Poi's are stored. 

There is error handling with try and catch throughout, we use await methods alot so there are async handlers. I feel i have ticked all the box's apart
from the hotfix on this. 

The links to Glitch: https://poi-pro-michael.glitch.me/
The link to Heroku: https://poi-pro-michael.herokuapp.com/
The link to youtube video walkthrough:  https://youtu.be/ePq-aZd0Qlg
