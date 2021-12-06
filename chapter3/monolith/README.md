# monolith

## Running the app
To start the application run `npm start`. The app uses nodemon, changes in the code will automatically restart the server with the new code.

To change the server port, change the `PORT` variable in the `index.js` file.

## API Documentation
The monolith API is composed by Payroll, Invoices and UserNotifications

### Payroll
See the HTTP methods from the payroll API below:

#### POST `/payroll`
Request: 
- `userId`: any string
- `amount`: any double
- `date`: A string with format *YYYY-DD-MM*

Example:

```
  {
    "userId":"111",
    "amount":100.20,
    "date": "2021-10-11"
  }
```

Example with curl:

```sh
 curl -X POST localhost:3000/payroll -d '{"userId":"111", "amount":100.20, "date": "2021-10-11"}' -H "Content-Type: application/json"
```

#### GET `/payroll`
Reponse is an array of payloads.

Example:

```
  [
    {
      "id": "123456-abcdefg",
      "userId":"111",
      "amount":100.20,
      "date": "2021-10-11"
    }
  ]
```

Example with curl:

```sh
 curl localhost:3000/payroll
```

### Invoice
See the HTTP methods from the invoices API below:

#### POST `/invoice`

Request: 
- `userId`: any string

Example:

```
  {
    "userId":100.20
  }
```

Example with curl:

```sh
 curl -X POST localhost:3000/invoice -d '{"userId":"111"}' -H "Content-Type: application/json"
```

#### GET `/invoice`
Reponse is an array of invoices.

Example:

```
  [
    {
      "id": "123456-abcdefg",
      "userId":"111",
      "date": "2021-10-11"
    }
  ]
```

Example with curl:

```sh
 curl localhost:3000/invoice
```

### UserNotification
See the HTTP methods from the UserNotification API below:

#### GET `/userNotification`
Reponse is an array of userNotification.

Example:

```
  [
    {
      "id": "abcdefg-123456",
      "user":"111",
      "date": "2021-10-11"
      "event": "payroll"
      "eventId": "123456-abcdefg"
      "body": "{}"
    }
  ]
```

Example with curl:

```sh
 curl localhost:3000/userNotification
```