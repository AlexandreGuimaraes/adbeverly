/*
|==== FUNCTION =======================================================================================================
|
|	  FILE NAME: photoGallery.js
|
|		   NAME: PhotoGallery
|
|        AUTHOR: Nicholas Baer, baern00@gmail.com
|
|    CREATED ON: 7/30/2015
|
| LAST MODIFIED: 8/24/2015
|
|       VERSION: 5.0
|
| 		   BUGS: ---
|
|   DESCRIPTION: This function was built for Precision Structural Engineering for use for their website photo
|                galleries. It is built in such a way that minimal HTML code has to be written to work. Each img tag
|                is handled within this Javascript code like a list element, eliminating the need to build lists
|                using <li> tags as most photo gallery applications do. The gallery name is also handled through
|                Javascript so that the name only has to be written once but is displayed multiple times. Further
|                details and features are broken down piece by piece in comments below.
|
|                What you really need to know about the structure of the function as a whole is that it was built in
|                a specific way to get around the function-only scope of Javascript variables. Using a return
|                function in this way creates a  block scope system so that each iterative variable is actually
|                useful for more than just immediatly inside the loop. More information on this problem can be found
|                here:
|
|                http://stackoverflow.com/questions/750486/javascript-closure-inside-loops-simple-practical-example
|
|                I chose the solution I did because it's more backwards-friendly as far as browser editions go.
|
|====================================================================================================================
*/

setTimeout(function() {
var gallery = [],
	n = 0,
	imgSize = 0,
	// Used to define one variable for both for loops. Both for loops must have same number of iterations.
	// This variable is based on the number of galleries.
	count = document.getElementsByClassName('imgGallery').length;

function photoGallery(i) {
	return function() {

	  // Dynamically adds repeating elements. Doing it this way cleans up the HTML code since these elements repeat anyway.
	  document.getElementsByClassName('imgGalleryExpanded')[i].appendChild(document.createElement("div")).className = 'imgData';
	  document.getElementsByClassName('imgGalleryExpanded')[i].appendChild(document.createElement("div")).className = 'imgTitle';
	  document.getElementsByClassName('imgGalleryExpanded')[i].appendChild(document.createElement("button")).className = 'galleryBack';
	  document.getElementsByClassName('imgGalleryExpanded')[i].appendChild(document.createElement("button")).className = 'galleryNext';

	  // Dynamically sets the html for the ImgTitle to match the name given to the imgGallery
	  document.getElementsByClassName('imgGalleryExpanded')[i].getElementsByClassName('imgTitle')[0].innerHTML = document.getElementsByClassName('imgGallery')[i].getAttribute('name');

	  // Variable defined to tell the function how many <img>'s are present so it loops around correctly.
	  var galleryLength = (document.getElementsByClassName('galleryImgs')[i].getElementsByTagName('img').length - 1);

	  // Listens for clicks on gallery thumbnails. Uses an if statement to check if the gallery improperly
	  // has an open class when no galleries are open. If not, adds open class to open gallery.
	  document.getElementsByClassName('imgGallery')[i].addEventListener('click', function() {
		if (this.classList.contains('open')) {
		  this.classList.remove('open');
		} else {
		  this.classList.add('open');
		  setTimeout(boundingBox(),290);
		}
	  });

	  // The below code is used to assign the gallery count and loacation displayed below the gallery image. It is
	  // displayed using a CSS pseudo element on the back button. 1 is added to each value to display each value with
	  // the starting point as one instead of zero. It is repeat in the back and next functions, as well as the close
	  // function, to change on click. Unfortunatly, CSS transtitions are not supported on pseudo element content values,
	  // so this is the only dynamic peice that doesn't fade in and out properly.
	  document.getElementsByClassName('imgGalleryExpanded')[i].getElementsByClassName('galleryBack')[0].setAttribute('data-count', (n+1) + '/' + (galleryLength+1));

	  // Removes active class when overlay detects a mouseup event. Note: anywhere on overlay is fine.
	  // The X in the corner is done with CSS pseudo elements and is completely asthetic.
	  // Also resets n and opacities per gallery so that each time you open a gallery you start
	  // on the first image. The touchend fucntion is a duplicate function to listen to touch end
	  // on mobile.
	  document.addEventListener('mouseup',function(e){
		  if (e.target.parentNode.className != 'galleryImgs' && e.target.className != 'galleryNext' && e.target.className != 'galleryBack') {
			for (var u = 0; u < document.getElementsByClassName('imgGallery').length; u++) {
				document.getElementsByClassName('imgGallery')[u].classList.remove('open');
			};
			n = 0;

			setTimeout(function() {
				document.getElementsByClassName('imgGalleryExpanded')[i].getElementsByClassName('galleryBack')[0].setAttribute('data-count', (n+1) + '/' + (galleryLength+1));
			},290);

			for (var p = 0; p < document.getElementsByClassName('galleryImgs')[i].getElementsByTagName('img').length; p++) {
				document.getElementsByClassName('galleryImgs')[i].getElementsByTagName('img')[p].style.opacity= 0;
			};

			document.getElementsByClassName('galleryImgs')[i].getElementsByTagName('img')[n].style.opacity = 1;
		  };
		});

		document.addEventListener('touchend',function(e){
		  if (e.target.parentNode.className != 'galleryImgs' && e.target.className != 'galleryNext' && e.target.className != 'galleryBack') {
			for (var u = 0; u < document.getElementsByClassName('imgGallery').length; u++) {
				document.getElementsByClassName('imgGallery')[u].classList.remove('open');
			};
			n = 0;

			setTimeout(function() {
				document.getElementsByClassName('imgGalleryExpanded')[i].getElementsByClassName('galleryBack')[0].setAttribute('data-count', (n+1) + '/' + (galleryLength+1));
			},290);

			for (var p = 0; p < document.getElementsByClassName('galleryImgs')[i].getElementsByTagName('img').length; p++) {
				document.getElementsByClassName('galleryImgs')[i].getElementsByTagName('img')[p].style.opacity= 0;
			};

			document.getElementsByClassName('galleryImgs')[i].getElementsByTagName('img')[n].style.opacity = 1;
		  };
		});

	  // Sets the first image's opacity to 1 on function load. Ensures that the first image is visible fomr start.
	  document.getElementsByClassName('galleryImgs')[i].getElementsByTagName('img')[0].style.opacity = 1;

	  // Check to make sure a name is given to the gallery. If, it applies that name to the inner gallery element.
	  if (typeof(document.getElementsByClassName('galleryImgs')[i]) != 'undefined') {
		document.getElementsByClassName('galleryImgs')[i].setAttribute('name', document.getElementsByClassName('imgGallery')[i].getAttribute('name'));
	  };

	  // This function determines the placement, size, and content of the name box on the opened gallery. The full size of the image is obtained through
	  // .getBoundingClientRect() and then checked to see if the height or width is larger i.e. portrait or landscape.
	  function boundingBox() {
		  // A bounding rectanlge is obtained for each galleries first image
		  imgSize = document.getElementsByClassName('galleryImgs')[i].getElementsByTagName('img')[n].getBoundingClientRect();

		  // Using the bounding rectanle, the image is determined to be portrait or landscape. Then the images height and width
		  // are set to be a percentage of the viewport with limts at either end.
		  // For portrait;
		  if (imgSize.height > imgSize.width) {
			  if (window.innerWidth*.8 > 700) {
				  document.getElementsByClassName('galleryImgs')[i].getElementsByTagName('img')[n].style.height = '85%';
				  document.getElementsByClassName('galleryImgs')[i].getElementsByTagName('img')[n].style.width = 'auto';
			  } else if (window.innerWidth*.8 < 300) {
				  document.getElementsByClassName('galleryImgs')[i].getElementsByTagName('img')[n].style.height = '225px';
				  document.getElementsByClassName('galleryImgs')[i].getElementsByTagName('img')[n].style.width = 'auto';
			  } else {
				  document.getElementsByClassName('galleryImgs')[i].getElementsByTagName('img')[n].style.height = (window.innerWidth*.8)*.75 + 'px';
				  document.getElementsByClassName('galleryImgs')[i].getElementsByTagName('img')[n].style.width = 'auto';
			  }
			// For landscape;
		  } else {
			  if (window.innerWidth*.8 > 800) {
				  document.getElementsByClassName('galleryImgs')[i].getElementsByTagName('img')[n].style.width = '85%';
				  document.getElementsByClassName('galleryImgs')[i].getElementsByTagName('img')[n].style.height = 'auto';
			  } else if (window.innerWidth*.8 < 300) {
				  document.getElementsByClassName('galleryImgs')[i].getElementsByTagName('img')[n].style.width = '300px';
				  document.getElementsByClassName('galleryImgs')[i].getElementsByTagName('img')[n].style.height = 'auto';
			  } else {
				  document.getElementsByClassName('galleryImgs')[i].getElementsByTagName('img')[n].style.width = (window.innerWidth*.8) + 'px';
				  document.getElementsByClassName('galleryImgs')[i].getElementsByTagName('img')[n].style.height = 'auto';
			  }
		  };

		  // Once the image has been resized, it's new bounding rectangle is observed
		  imgSize = document.getElementsByClassName('galleryImgs')[i].getElementsByTagName('img')[n].getBoundingClientRect();

		  // If the img has a 'data' attribute, the .imgData <div>'s height and width properties are set equal to the image's
		  // respective properties that were obtained through the use of the bounding rectangle. The .imgData has it's 'data'
		  // attribute set to be that of the <img>
		  if (document.getElementsByClassName('galleryImgs')[i].getElementsByTagName('img')[n].hasAttribute('data')) {
			  document.getElementsByClassName('imgGalleryExpanded')[i].getElementsByClassName('imgData')[0].style.opacity = 1;
			  document.getElementsByClassName('imgGalleryExpanded')[i].getElementsByClassName('imgData')[0].style.width = imgSize.width  + 2 + 'px';
			  document.getElementsByClassName('imgGalleryExpanded')[i].getElementsByClassName('imgData')[0].style.transform =
			  	'translate(-50%,'+(imgSize.top + imgSize.height - document.getElementsByClassName('imgData')[0].clientHeight + 1)  +'px)'
			  ;

			  document.getElementsByClassName('imgGalleryExpanded')[i].getElementsByClassName('imgData')[0].setAttribute('data',
				document.getElementsByClassName('galleryImgs')[i].getElementsByTagName('img')[n].getAttribute('data')
			  );
		  // If the <img> has no 'data' attribute, the .imgData <div>'s opacity is set to zero and hidden.
		  } else {
			 document.getElementsByClassName('imgGalleryExpanded')[i].getElementsByClassName('imgData')[0].style.opacity = 0;
		  }
	  };

	  setTimeout(boundingBox,0);
	  window.addEventListener('resize',boundingBox);

	  // The function of the next button. The if statement is in place so that once the gallery reaches the
	  // end of the images, as defined by galleryLength, it loops back around and starts over. Each click also refires
	  // the boundingBox function to check if the new <img> has a 'data' attribute.
	  document.getElementsByClassName('imgGalleryExpanded')[i].getElementsByClassName('galleryNext')[0].addEventListener('click', function() {
		if (n < galleryLength) {
		  n++;

		  document.getElementsByClassName('galleryImgs')[i].getElementsByTagName('img')[n - 1].style.opacity = 0;
		  document.getElementsByClassName('galleryImgs')[i].getElementsByTagName('img')[n].style.opacity = 1;
		} else {
		  n = 0;
		  document.getElementsByClassName('galleryImgs')[i].getElementsByTagName('img')[galleryLength].style.opacity = 0;
		  document.getElementsByClassName('galleryImgs')[i].getElementsByTagName('img')[n].style.opacity = 1;
		}
		document.getElementsByClassName('imgGalleryExpanded')[i].getElementsByClassName('galleryBack')[0].setAttribute('data-count', (n+1) + '/' + (galleryLength+1));

		boundingBox();

	  });

	  // The function of the back button. Similar to the next button, the if statement included is in place
	  // for looping. If n goes below zero, the if statment gets n to the galleryLength before changing
	  // the image's opacity.  Each click also refires the boundingBox function to check if the new <img> has a 'data' attribute.
	  document.getElementsByClassName('imgGalleryExpanded')[i].getElementsByClassName('galleryBack')[0].addEventListener('click', function() {
		if (n > 0) {
		  n--;
		  document.getElementsByClassName('galleryImgs')[i].getElementsByTagName('img')[n + 1].style.opacity = 0;
		  document.getElementsByClassName('galleryImgs')[i].getElementsByTagName('img')[n].style.opacity = 1;
		} else {
		  n = galleryLength;
		  document.getElementsByClassName('galleryImgs')[i].getElementsByTagName('img')[0].style.opacity = 0;
		  document.getElementsByClassName('galleryImgs')[i].getElementsByTagName('img')[n].style.opacity = 1;
		}
		document.getElementsByClassName('imgGalleryExpanded')[i].getElementsByClassName('galleryBack')[0].setAttribute('data-count', (n+1) + '/' + (galleryLength+1));

		boundingBox();

	  });

	};
  }

  // Mulitple for loops in place to "break" Javascript's function-only variable scope. More information
  // on this can be found at the page located at the http link at the top of this function.
  for (var i = 0; i < count; i++) {
	gallery[i] = photoGallery(i);
  }

  for (var j = 0; j < count; j++) {
	gallery[j]();
  }



}, 0);
