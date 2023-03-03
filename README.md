# Global-Infra-Tech
# Instructions
1. run npm install
2. create a .env file in the root of the project
3. create an Atlas cluster  
4. select connect your application to your cluster using MongodDB's native drivers
5. copy the connection string into the .env file follow the .envExample file
6. run npm start to run the project

#Testing 
The application runs on port 3000 and has 6 endpoints

1. POST to add a new record to the database go to route localhost:3000/news/api/add add a Content-type: application/json to the headers and then select body Json format
and add the following for example:
{
    "title": "Some title",
    "shortDescription": "some desc",
    "text": "some text",
    "date": "2023-03-04"
}
2. PATCH to update a certain record copy the id of that record and go to localhost:3000/news/api/ and add the id after /
Example:
localhost:3000/news/api/640247f6e88f476fa62dc792
Content-type: application/json to the headers and then select body Json format
and add the following for example:
{
    "title": "Some other title",
    "shortDescription": "some other desc",
    "text": "some othertext",
    "date": "2021-03-04"
}
3. DELETE to delete a certain news record copy the id of that record and go to localhost:3000/news/api/ and add the id after /
Example: 
# localhost:3000/news/api/640247f6e88f476fa62dc792
4. GET to get all news go to localhost:3000/news/api 
5. GET to get all news sorted got to localhost:3000/news/api/sorted as there you can add query parameters to sort by date add ?date=true, after the end of the URL, to sort
by title add ?title=true to specify an order by which to sort add ?order=1 1 for ascending and -1 for descending if no order query parameter is provided the default is 
1(ascending)
Example sorting by date and title in descending order
#localhost:3000/news/api/sorted?date=true&title=true&order=-1
6. GET to get filtered news go to localhost:3000/news/api/filtered there you can add query parameters to filter by date and title, you can filter by date that is greater 
than the provided date in the query parameter, by date that is less than the provided date in the query parameter, and by title
Example of a query that filters data based on title, date greather than and less than:
#localhost:3000/news/api/filtered?title=Title&gteDate=2021-04-03&ltDate=2023-03-03

The accepted date format for get filtered news, creating new news and updating news is ISO 8601 date, YYYY-MM-DD
