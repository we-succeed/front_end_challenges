# Project_Zoo Tycoon

This is mini project practicing OOP concept of JavaScript.<br />
## Plan
* ~~Scrub image resources if animals~~
* Design app workflows
* Understanding OOP in JS
* Start coding

## Resources
Imgage : https://www.pngegg.com/ko/png-bfcwi
homeBackgroundImage : https://www.teahub.io/down/ihwTwii_zoo-tycoon-wallpaper-in-zoo-tycoon-ultimate-animal/
mainBackgroundImage: https://www.vecteezy.com/vector-art/3228448-different-outdoor-landscape-scenes-with-cartoon-character
Image cutting tool : Photoshop

## Design
* Each category's max capacity is 10
* Each animal has name, foodLevel, own character(active, lazy, immature, sensitive, eccentric, moody)
* User can feed animals if animal's foodLevel is below...

1. home page = zoo background. enter `start` to start
2. main page = control section on header or aside, main zoo on main
3. import or create animal with `add` button
  3-1. click `add` will show detail card (name, category)
  3-2. click `confirm` will create the animal with random foodLevel and character
  3-3. `cannot add` if the capacity is 10 and disabled the category
4. remove animal with `remove` button
  4-1. click `remove` will show all lists of animals
  4-2. click animal want to remove
  4-3. click `confirm` will remove the animal
5. feed animals if animal's foodLevel is below.. ?
  5-1. click feed on animal card OR `autoFeed` button on control section

