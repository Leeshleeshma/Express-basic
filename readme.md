JSON, is a lightweight format for storing and transporting data, often used when data is sent from a server to a web page. The JSON format is syntactically identical to the code for creating JavaScript objects. JSON data is written as name/value pairs, just like JavaScript object properties. JSON objects are written inside curly braces. 

![Curl](<Screenshot 2025-11-12 at 11.08.49 AM.png>) 
![port1](<Screenshot 2025-11-12 at 11.09.02 AM.png>) 
![port2](<Screenshot 2025-11-12 at 11.09.15 AM.png>)

## Github Link - 
https://github.com/Leeshleeshma/Express-basic


# Math API Documentation

This API allows the client to calculate the power of a given base raised to a specified exponent. Additionally, clients can request the square root of the base as part of the response.

## Calculate Power
**Request Format:** `/math/power/:base/:exponent`

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Calculates the result of raising a `base` number to an `exponent` power. Optionally, if a query parameter `root` is provided, the square root of the `base` will also be returned in the response.

**Example Request:** `/math/power/4/2`

**Example Response:**
```json
{
    "result": 16
}
```

**Example Request with Root:** `/math/power/4/2?root=true`

**Example Response with Root:**
```json
{
    "result": 16,
    "root": 2
}
```

**Error Handling:**
- Possible 400 (invalid request) errors (all in JSON):
  - If the `base` or `exponent` is not a valid number, returns an error with message `{"error": "Invalid base or exponent. Please provide numeric values."}`
- Possible 500 errors (all in JSON):
  - If something goes wrong on the server, returns error with `{"error": "Something went wrong; please try again."}`

## Notes:
- The `base` and `exponent` must be provided as part of the URL path.
- Both `base` and `exponent` are expected to be numeric. Non-numeric values will result in an error.
- The optional `root` query parameter does not require a value. Its presence in the request query indicates that the square root of the `base` should also be calculated and included in the response.

![Testing](<Screenshot 2025-11-20 at 12.25.55 PM.png>)