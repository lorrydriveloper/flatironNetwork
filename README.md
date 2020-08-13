# <center>Flatiron Network</center>
<center><img src="https://i.imgur.com/VBolm77.png" alt="drawing" width="800"/></center>

## [Video Demostration](https://youtu.be/w1s3MoTHuHY)

Today's blog is about the last project I have created for the Flatiron Curriculum. It's the first time I have worked with JS more in deep than few DOM manipulations in previous projects, and I have to say I fell in love whit it. I don't know why people blame the language when it is compelling and powerful. I love the functions as first-class and are compelling, the Prototypal inheritance, and the closures and its implication. Most of us feel like JavaScript is "Weird" and all those things. Still, when we start to learn Ruby and later Ruby on Rails when we have a doubt, or something was entirely reasonable that you went to the documentation and looked at what do you want to accomplish. I guess that you don't even know that there is an official documentation/specification for JavaScript apart of if you use the MDN that it is an excellent resource. 
With all that say, I'm going to introduce my project.

## The Problem

I always thought that it is not easy to find Flatiron Grads
to share its knowledge and advice. There are a lot of social media with
different habits for each individual, some like more Facebook over Twitter (or
vice versa), or they prefer Instagram or Slack, or they are Strong on LinkedIn
or YouTube. Still, none are on the same page, and you don't know who was doing the same path as you some the advice of a Data Science sure doesn't apply for aUX/UI designer and so on.

## The Partial Solution

OK, OK, I know this is just a partial solution, but it has a good reason for that. I only implemented some of the solutions that a more sophisticated app will need, and this is just proof of concepts for a  maybe multidisciplinary and complex App, where more Ux/UI could be involved(I want to seek collaboration some of the UX/UI Design London's students to work together)

## The implementation so far.

As I said, this is more a Playground project where I worked
to get used to new technologies. Like Geolocation and Geode coding, JavaScript and Google Maps and Google Dev Console, and my loved Ruby on Rails as API, if before I was in love now, I'm married with a mortgage, three children and a dog, hahaha.

First, as always, Rails make things super easy and quick,
set up a new API backend only cost you a few seconds and a line on the terminal to make it alive.

`rails new {Your project name} --api --database=postgresql`

The second flag `--database=postgresql` is to use as DB
PostgreSQL as by default Rails use SQLite3 what is perfect for Development, but it can be a pain when it is time to Deploy, for that reason I always recommend go with PostgreSQL because it will be easier to deploy when is time to so.

In the beginning, I got overwhelmed by the problem and its
magnitude. I always feel like that when I start a project and even more when
new technology where I'm not confident is involved, so my friend Impostor
Sindrome still appears, but I had been taught well, so I  always break down the problem in small pieces, and easy to accomplish.

I would like to explain how I solve the Geolocation problem,
and it's integration with Google Maps. First, the gem I used is called Ruby
Geocoder and can be used with ActiveRecord what it makes super convenient for our problem. Early in your model migration, you should have a column for
Latitude and Longitude and, of course, the pieces for an address. For this
project, I just use the user given address for the Geolocation. Still, it can
use IP, or event the 'Plus Code' that Google Maps provides you for any location.

You don't need to configure lots of things to make it work, but you can use different lookups providers; to keep it simple, I don't go to dive on it. what you need next is to geolocate by the given address, and that is done easily with ActiveRecord:
in your `#app/models/YourModel.rb` you should have this code.
``` 
geocoded_by :address
before_validation :geocode
validates :latitude, :presence :true
```


The documentation says `after_validation :geocode`, but I
noticed that it can end on lots of no geolocated addresses in your DB. What is
not really what we want, so I think it is better to be sure that only
well-formatted data is saved on DB, if not alert to your user to use a more
general address that can be geolocated.
But wait, `geocode_by :address` what that comes. Well, it is a method you should create for your class instance to join all the pieces of and address to a searchable string like this:


```
  def address
    [street, city,postcode, state, country].compact.join(', ')
  end
```



We are now sure that we are saving our well-formatted data
on the DB, so it's time to move to the Frontend and the Google Maps.

### The Map

To be honest, I was scared to work with google maps and it's API as I have the mental model that it will be difficult and you have to be a professional developer to do so, far from reality.
To be honest, I was scared to work with google maps, and it's API as I have the mental model that it will be difficult and you have to be a professional developer to do so, far from reality.
First, I create a module on my `frontend/modules/` called map.js where after I create a class method to display the map on the DOM.

To be honest, I was scared to work with google maps, and it's API as I have the mental model that it will be difficult and you have to be a professional developer to do so, far from reality.

Before anything, you should have config your Goggle Dev console and enable Maps JavaScript API and have a valid API and add this script to your HTML

` <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY"
   async defer></script>`
	 
To be honest, I was scared to work with google maps, and it's API as I have the mental model that it will be difficult and you have to be a professional developer to do so, far from reality.

Before anything, you should have config your Goggle Dev console and enable Maps JavaScript API and have a valid API and add this script to your HTML

` <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY"
   async defer></script>`
	 
First, I create a module on my `frontend/modules/` called map.js, where I created a class Map and its methods to display the map on the DOM.
``` 
  class Map {
  static map;
  static markers;
  static init(gradsArray) {
    this.map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 35, lng: -50 },
      zoom: 3,
    });

    this.markers = gradsArray.map(this.createMarker);

  }

  static closeMarkers(map, markers) {
    markers.forEach(function (marker) {
      map.zoom = 7;
      marker.infowindow.close(map, marker);
    });
  }
  static createMarker(grad) {
    let icon = {
      url:
        "https://coursereport-s3-production.global.ssl.fastly.net/rich/rich_files/rich_files/999/s200/flatironschool.png", // url
      scaledSize: new google.maps.Size(18, 18), // scaled size
      origin: new google.maps.Point(0, 0), // origin
      anchor: new google.maps.Point(0, 0), // anchor
    };
    const infowindow = new google.maps.InfoWindow({
      content: HTMLBuilder.gradCard(grad),
    });
    let marker = new google.maps.Marker({
      position: {
        lat: grad.latitude,
        lng: grad.longitude,
      },
      map: Map.map,
      title: grad.name,
      infowindow: infowindow,
      icon: icon,
    });
    marker.addListener("click", function () {
      Map.closeMarkers(this.map, Map.markers);
      infowindow.open(this.map, marker);
    });
    return marker;
  }
}

export default Map; 

```

It's less code that what I expect to make it works and I going to break down and explained.
First, the class only have three methods and two class variables.

The method init is the responsibility to create the new instance map with nothing on it as you can see here

```
this.map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 35, lng: -50 },
      zoom: 3,
    }); 
```
		
The first parameter the Map constructor takes is where to render the new map instance, and the second is an object of options. Where I just centre the map on with the coordinated of the middle of the Atlantic ocean to be able to see America and Europe and the zoom that is valued from 1 (all world) to 15 (street) and then creates the markers for the given array of objects passed as an argument whit the class method createMarker


```
 static createMarker(grad) {
    let icon = {
      url:
        "https://coursereport-s3-production.global.ssl.fastly.net/rich/rich_files/rich_files/999/s200/flatironschool.png", // url
      scaledSize: new google.maps.Size(18, 18), // scaled size
      origin: new google.maps.Point(0, 0), // origin
      anchor: new google.maps.Point(0, 0), // anchor
    };
    const infowindow = new google.maps.InfoWindow({
      content: HTMLBuilder.gradCard(grad),
    });
    let marker = new google.maps.Marker({
      position: {
        lat: grad.latitude,
        lng: grad.longitude,
      },
      map: Map.map,
      title: grad.name,
      infowindow: infowindow,
      icon: icon,
    });
    marker.addListener("click", function () {
      Map.closeMarkers(this.map, Map.markers);
      infowindow.open(this.map, marker);
    });
    return marker;
  } 
```

This method looks complicated but is straight if you think about it:
First, the method takes as a parameter and object which should have latitude and longitude if we don't want to use a custom icon either have a window that opens when clicking you only have to create a new marker instance.			


```  

  let marker = new google.maps.Marker({
      position: {
        lat: grad.latitude,
        lng: grad.longitude,
      },
      map: Map.map});

``` 
			
and return it, but because we want to customize a bit, we can add these options to the object marker:

```

   title: grad.name,
   infowindow: infowindow,
   icon: icon 


```
			
the title can be a string that in my case is the name of the grad name the icon is created here:

```
  let icon = {
  url:"YOURURLIMAGE",
  scaledSize: new google.maps.Size(18, 18),
  origin: new google.maps.Point(0, 0), 
  anchor: new google.maps.Point(0, 0)}; 

```
		
You can use the same code and only change the Url and the size to make your icon bigger or smaller, and the InfoWindow is created here previously like this:

```
const infowindow = new google.maps.InfoWindow({
      content: HTMLBuilder.gradCard(grad),
    });

```

<center><img src="https://i.imgur.com/PlFktH7.png" alt="drawing" width="800"/></center>
	
Where content can be a plain string or a template string with HTML inside, what is what I did to display the grads cards on it.


```  
   marker.addListener("click", function () {
     Map.closeMarkers(this.map, Map.markers);
     infowindow.open(this.map, marker);
    });

```
		
Finally, we add an Event listener with this build method, that on click opens the infowindow. Ant that's it you have working a beautiful map with custom markers and highly reusable as you only have to pass an array of object to render a new map with new markers on it.

<center><img src="https://i.imgur.com/uSdbAH8.png" alt="drawing" width="800"/></center>

## <center>Thanks for reading and Happy Coding.</center>
