'use strict';

//list of cars
//useful for ALL exercises
var cars = [{
  'id': 'p306',
  'vehicule': 'peugeot 306',
  'pricePerDay': 20,
  'pricePerKm': 0.10
}, {
  'id': 'rr-sport',
  'pricePerDay': 60,
  'pricePerKm': 0.30
}, {
  'id': 'p-boxster',
  'pricePerDay': 100,
  'pricePerKm': 0.45
}];

//list of rentals
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var rentals = [{
  'id': '1-pb-92',
  'driver': {
    'firstName': 'Paul',
    'lastName': 'Bismuth'
  },
  'carId': 'p306',
  'pickupDate': '2016-01-02',
  'returnDate': '2016-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '2-rs-92',
  'driver': {
    'firstName': 'Rebecca',
    'lastName': 'Solanas'
  },
  'carId': 'rr-sport',
  'pickupDate': '2016-01-05',
  'returnDate': '2016-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '3-sa-92',
  'driver': {
    'firstName': ' Sami',
    'lastName': 'Ameziane'
  },
  'carId': 'p-boxster',
  'pickupDate': '2015-12-01',
  'returnDate': '2015-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}];
//list of actors for payment
//useful from exercise 5
var actors = [{
  'rentalId': '1-pb-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '2-rs-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '3-sa-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}];

console.log(rentals[0].price);


function reduction(day)
{
  var reduction=0;
  if(day>1)
  {
    reduction=10/100;
  }
  if(day>4)
  {
    reduction=30/100;
  }
  if(day>10)
  {
    reduction=50/100;
  }
  return reduction;
}
//exercice1
for(var i=0;i<rentals.length;i++)
{
  var carID=rentals[i].carId;
  var km=rentals[i].distance;
  var oneDay=24*60*60*1000;
  var firstDate=new Date(rentals[i].returnDate);
  var secondDate=new Date(rentals[i].pickupDate);
  var day=1+Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
  //rentals[i].returnDate-rentals[i].pickupDate;
  for(var j=0;j<cars.length;j++)
  {
    if(carID==cars[j].id)
    {
      var pricePerKm=cars[j].pricePerKm;
      var pricePerDay=cars[j].pricePerDay;
    }
  }
  rentals[i].price=pricePerKm*km+pricePerDay*day;
  //exercice2
  /*var reduction=0;
  if(day>1)
  {
    reduction=10/100;
  }
  if(day>4)
  {
    reduction=30/100;
  }
  if(day>10)
  {
    reduction=50/100;
  }*/

  rentals[i].price=pricePerKm*km+pricePerDay*day-pricePerDay*day*reduction(day);
  //exercice3
  var commission=0.3*rentals[i].price;
  var insurance=0;
  var assistance=0;
  var drivy=0;
  insurance=commission/2;
  assistance=day;
  drivy=commission-(insurance+assistance);
  rentals[i].commission.insurance=insurance;
  rentals[i].commission.assistance=assistance;
  rentals[i].commission.drivy=drivy;
  //exercice4
  if(rentals[i].options.deductibleReduction==true)
  {
    rentals[i].price+=4*day;
    rentals[i].commission.drivy+=4*day;
  }
  //exercice5
  console.log(actors[0].payment.who);
  for(var k=0;k<actors.length;k++)
  {
    if(actors[k].rentalId==rentals[i].id)
    {
      for(var l=0;l<actors[k].payment.length;l++)
      {
        if(actors[k].payment[l].who=="driver")
        {
          actors[k].payment[l].amount=rentals[i].price;
        }
        if(actors[k].payment[l].who=="owner")
        {
          actors[k].payment[l].amount=rentals[i].price-commission;
        }
        if(actors[k].payment[l].who=="insurance")
        {
          actors[k].payment[l].amount=insurance;
        }
        if(actors[k].payment[l].who=="assistance")
        {
          actors[k].payment[l].amount=assistance;
        }
        if(actors[k].payment[l].who=="drivy")
        {
          actors[k].payment[l].amount=rentals[i].commission.drivy;
        }
      }

    }
  }
}


//list of rental modifcation
//useful for exercise 6
var rentalModifications = [{
  'rentalId': '1-pb-92',
  'returnDate': '2016-01-04',
  'distance': 150
}, {
  'rentalId': '3-sa-92',
  'pickupDate': '2015-12-05'
}];

console.log(cars);
console.log(rentals);
console.log(actors);
console.log(rentalModifications);
