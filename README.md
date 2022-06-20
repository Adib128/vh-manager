
## Overview
- I implemented the example of getting "Indian Burial Ground Yurts" from both providers for the night of Jan 6, comparing the margin and return the margin preferable  margin from Fantastic Yurts.
- If I had time I would add the feature of returning the most cheapest packge of rooms and to implement the condition of children Children under the age of 13 must never be alone.
  

### Architecture:
I implemented the architecture Layered Structure that I splited application on layers and I used the dependency injection to perform the injection.
the layers of the application are:
* Controller (communicate with all external sources) 
* Service (Business logic layer)
* Repository (fetch and prepare data.)
* Data Provider (retrieve data from data source)

 ![Architecture Diagram](https://i.postimg.cc/GhmdKg0Z/diagram.png)
  

### packages:

- [PHP-DI](https://php-di.org/): Dpendency injection container.
- [PHP-DI Slim](https://php-di.org/doc/frameworks/slim.html): PHP-DI bridge for Slim framework.
- [Guzzle](https://github.com/guzzle/guzzle) : Guzzle is a PHP HTTP client.
- [Carbon](https://carbon.nesbot.com/) : A simple PHP API extension for DateTime.

### Entry point:
#### File:
``` public/index.php ```
#### URL:
``` http://127.0.0.1:8888/ ```

### Test:
``` ./vendor/bin/phpunit tests ```


### Request example:

#### Request with parameters 
- the postman collection file into the project directory
``` 
http://127.0.0.1:8888/search?adult_number=2&check_in_date=2022-01-06&check_out_date=2022-01-06

```
#### Response
```JSON 
[
    {
        "Name": "Indian Burial Ground Yurts",
        "rooms": [
            {
                "Id": "1",
                "MaxPersons": "5",
                "Price": 200
            }
        ]
    }
]
```
