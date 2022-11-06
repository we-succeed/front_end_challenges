# Search Canada State or City

Resources: https://github.com/jprichardson/node-canada/blob/master/data/cities.json

## This is a project for implementing a search engine with vanilla javascript inspired by one of activity from `30 days javascript`

## Flows
1. Fetching `JSON` when js file is rendering and store data in `canada` object
2. Type city or state of canada on input area
3. Detect `change` or `keyup` events, and filter from `canada` object with `regex` method and return HTML structures
4. Highlights typed words with class `highlight`
5. If input area is null, clear lists and show init list