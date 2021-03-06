var seekbar;

play = function(catIndex) {
  //element
  function element(word, hint) {
    this.word = word;
    this.hint = hint;
  }

  element.prototype.getWord = function() {
    return this.word;
  }


  element.prototype.getHint = function() {
    return this.hint;
  }

  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z'
  ];

  var javaWords = [new element("private", "hidden from other classes"),
    new element("protected", "hidden from non children"),
    new element("static", "shared between all instances"),
    new element("Interface", "contain only methods definition"),
    new element("Array", "container with fixed size "),
    new element("List", "container with dynamic size"),
    new element("thread", "run concurrently within a program "),
    new element("abstract", "type of class that cannot be instantiated"),
    new element("switch", "condition"),
    new element("String", "type that represent sequence of characters"),
    new element("int", "type that represent sequence of numbers"),
    new element("for", "loop"),
    new element("Object", "default parent of all classes")
  ];

  var sqlWords = [new element(['select', 'item', 'from', 'room', 'where', 'furniture', '=', 'sofa'], "<img id='hint-image' src='img/hints/room-normal.jpg' class='image-responsive'/>"),
    new element(['insert', 'into', 'SolarSystem', '(', 'Planet', ')' , 'values', '(', 'Saturn', ')'], "<img id='hint-image' src='img/hints/solar-normal.jpg' class='image-responsive'/>"),
    new element(['insert', 'into', 'Zoo', 'values', '(', 'Animal', ')' ,'(', 'Lion', ')'], "<img id='hint-image' src='img/hints/zoo-hidden.jpg' class='image-responsive'/>"),
  ];

  sqlAlphabet = ['select', 'from', 'having', 'Zoo', 'insert', 'into', 'values', 'furniture', 'room', 'update', 'set', 'lamp',
    'where', '=', 'planet' , 'item', 'sofa', 'level', 'purple',  '(', ')', 'Animal', 'Saturn' ,  'Lion' , 'door', 'SolarSystem'];

  var htmlWords = [
    new element(["&lt;h1&gt;", "My First", " Heading 1", "&lt;/h1&gt;", "&lt;p&gt;", "My first", "paragraph", "&lt;/p&gt;"], "<h1>My First Heading</h1><p>This is a paragraph.</p>"),
    new element(["&lt;", "img", "src=IMAGE_URL", "&gt;"], "<img src='img/2.png' width='100px' height='100%' >"),
    new element(["&lt;h2&gt;", "This is heading 2", "&lt;/h2&gt;"], "<h2>This is heading 2</h2>"),
    new element(["&lt; ", "h1", "style='color:red;'", "&gt;", "I am red", "&lt;/h1&gt;", "style='color:blue;'", "I am blue"], "<h1 style='color:red;'>I am red</h1><h1 style='color:blue;'>I am blue</h1>"),
    new element(["&lt;p&gt;", "This text is", "normal", "&lt;b&gt;", "This text is", " bold", "&lt;/b&gt;", "&lt;/p&gt;"], "<p>This text is normal</p><p><b>This text is bold</b></p>"),
    new element(["&lt; ", "a href='http://www.w3schools.com'", "&gt;", "This is", " a link", "&lt;/a&gt;"], "<p><a href='http://www.w3schools.com'>this is a link</a></p>"),
    new element(["&lt;p&gt;", "This text is", " normal", "&lt;i&gt;", "This text is", "italic", "&lt;/i&gt;", "&lt;/p&gt;"], "<p>This text is normal</p><p><i>This text is italic</i></p>"),
    new element(["&lt;h2&gt;", "HTML", "&lt;mark&gt;", " marked", "&lt;/mark&gt;", " Formatting", "&lt;/h2&gt;"], "<h2>HTML <mark>Marked</mark> Formatting</h2>"),
    new element(["&lt;p&gt;", "My favorite color is ", "&lt;del&gt;", "blue", "&lt;/del&gt;", " red", "&lt;/p&gt;"], "<p>My favorite color is <del>blue</del> red</p>"),
    new element(["&lt;ul&gt;", "&lt;li&gt;", "Coffee", "Tea", "Milk", "&lt;/li&gt;", "&lt;/ul&gt;"], "<ul><li>Coffee</li><li>Tea</li><li>Milk</li></ul>  "),
    new element(["&lt;", "ol type='I'", "&gt;",  "&lt;li&gt;","Coffee", "Tea", "Milk", "&lt;/li&gt;", "&lt;/ol&gt;"], "<ol type='I'><li>Coffee</li><li>Tea</li><li>Milk</li></ol>  ")
  ];

  var htmlAlphapet = [
    ["&lt;Heading>", "&lt;h1>", "My First", " Heading 1", "&lt;/Heading>", "&lt;/h1>", "&lt;b>", "&lt;p>", "paragraph", "&lt;/b>", "&lt;/p>"],
    ["src=IMAGE_URL", "photo", "&lt;", "image", "source=IMAGE_URL", "picture", ">", "img"],
    ["&lt;h1>", "This is heading 2", "&lt;/h1>", "&lt;h2>", "&lt;Heading>", "&lt;/h2>", "&lt;/Heading>"],
    ["&lt; ", "style='color:green;'", "style='color:red;'", ">", "h1", "I am red", "&lt;/h1>", "style='color:blue;'", "I am blue", "style='color:black;'", "I am black", "I am green", "I am yellow"],
    ["&lt;/p>", "&lt;bold>", "&lt;/b>", "&lt;p>", " bold", "&lt;/bold>", "This text is", "normal", "&lt;b>", "&lt;italic>", "This text is", "&lt;/italic>", "&lt;i>", "&lt;/i>"],
    [" a link", "&lt; ", "&lt;link>", "&lt;/a>", "a href='http://www.w3schools.com'", ">", "&lt;/link>", "&lt;goto>", "&lt;/goto>", "This is", "&lt;a src='Link_url'"],
    ["&lt;bold>", "&lt;p>", "&lt;/p>", "&lt;/bold>", "&lt;i>", "italic", " normal", "&lt;italic>", "This text is", "&lt;/i>", "&lt;/italic>", "&lt;b>", "&lt;/b>", "&lt;/p>"],
    [" marked", "&lt;select>", "HTML", "&lt;h2>", "&lt;/mark>", "&lt;/select>", "&lt;highlight>", "&lt;mark>", "&lt;/highlight>", " Formatting", "&lt;/h2>"],
    ["&lt;/p>", "My favorite color is ", " red", "blue", "&lt;delete>", "&lt;p>", "&lt;del>", "&lt;/delete>", "&lt;/del>", "&lt;remove>", "&lt;/remove>"],
    ["&lt;/ul>", "Coffee", "&lt;ol>", "Tea", "&lt;list>", "&lt;li>", "&lt;/li>", "&lt;/list>", "&lt;unorderd list>", "&lt;/unorderd list>", "Milk", "&lt;Ordered list>", "&lt;ul>", "&lt;/Ordered list>"],
    ["&lt;ul>", "ol type='I'", "Tea", "&lt;ol>", "&lt;li>", "&lt;list>", "&lt;", "Coffee", "&lt;/list>", "&lt;Ordered list>", "Milk", ">", "&lt;/Ordered list>", "&lt;unorderd list>", "&lt;/li>", "&lt;/unorderd list>", "&lt;/ol>"]
  ];

  



  var categories= new Array();; // Array of topics
  var chosenCategory; // Selected catagory
  var getHint; // Word getHint
  var word; // Selected word
  var guess; // Geuss
  var geusses = []; // Stored geusses
  var lives; // Lives
  var counter; // Count correct geusses
  var space; // Number of spaces in word '-'
  var selectedElement; // Currently selected element

  // Get elements
  var showLives = document.getElementById("mylives");
  var showCatagory = document.getElementById("scatagory");
  var getHint = document.getElementById("hint");
  var showClue = document.getElementById("clue");
  var playNext =document.getElementById('next');


  // create alphabet ul
  var buttons = function() {
    myButtons = document.getElementById('buttons');
    letters = document.createElement('ul');
    myButtons.innerHTML="";

    for (var i = 0; i < alphabet.length; i++) {
      letters.id = 'alphabet';
      list = document.createElement('li');
      list.id = 'letter';
      list.innerHTML = alphabet[i];
      check();
      myButtons.appendChild(letters);
      letters.appendChild(list);
    }
  }


  // Select Catagory
  var selectCat = function() {
    if (chosenCategory === categories[0]) {
      catagoryName.innerHTML = "The Chosen Category Is JAVA";
    } else if (chosenCategory === categories[1]) {
      catagoryName.innerHTML = "The Chosen Category Is SQL";
    } else if (chosenCategory === categories[2]) {
      catagoryName.innerHTML = "The Chosen Category Is HTML";
    }
  }

  // Create geusses ul
  result = function() {
    wordHolder = document.getElementById('hold');
    correct = document.createElement('ul');
    wordHolder.innerHTML="";

    for (var i = 0; i < word.length; i++) {
      correct.setAttribute('id', 'my-word');
      guess = document.createElement('li');
      guess.setAttribute('class', 'guess');
      if (word[i] === "-") {
        guess.innerHTML = "-";
        space = 1;
      } else {
        guess.innerHTML = "______";
      }

      geusses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  }

  // Show lives
  comments = function() {
    
    var hasWon = false;
    if (lives < 1) {
      showLives.innerHTML = "Game Over";
      //  alert("game over action");
      $('#divCon #a2').hide();
      $('#divCon #a1').show();
    }

    for (var i = 0; i < geusses.length; i++) {
      if (counter + space === geusses.length) {
        hasWon = true;
        
      }
    }
    if(hasWon)
    {
      celebration();
      if($('#hint-image').attr('src') === "img/hints/room-normal.jpg")
      {
        $('#hint-image').attr('src' , "img/hints/room-selected.jpg");
      }
      else if($('#hint-image').attr('src') === "img/hints/solar-normal.jpg")
      {
        $('#hint-image').attr('src', "img/hints/solar-selected.jpg");
      }
      else if($('#hint-image').attr('src') === "img/hints/zoo-hidden.jpg")
      {
        $('#hint-image').attr('src', "img/hints/zoo-normal.jpg");
      }
      $('#next').show();
      hasWon = false;
    }
  }


  // OnClick Function
  check = function() {
    list.onclick = function() {
      var geuss = (this.innerHTML);
      var strike;
          var element1;

          strike=  document.createElement('span');
          strike.setAttribute('style','color:red;text-decoration:line-through');

        element1= document.createElement('span');
        element1.setAttribute('style','color:black');
      this.setAttribute("class", "active");
      this.onclick = null;
      // var x=document.createTextNode(this.innerHTML);
      var strikedElement=document.createElement('p');
      strikedElement.setAttribute('class','stripped-text');
      strikedElement.innerHTML = this.innerHTML;

    this.innerHTML='';

   this.appendChild(strike);
   strike.appendChild(element1);
   element1.appendChild(strikedElement);
      for (var i = 0; i < word.length; i++) {
        if (word[i].toUpperCase() === geuss.toUpperCase()) {
          geusses[i].innerHTML = geuss;
          counter += 1;

          seekbar.setValue(seekbar.value + (100 / geusses.length));
        }
      }
      var j = (word.indexOf(geuss));
      if (j === -1)
      {
        $('#heart'+lives).removeClass('heart');
        $('#heart'+lives).addClass('end');

        lives -= 1;
        comments();
      } else {
        comments();
      }
    }
  }

 categories.push(javaWords);
    categories.push(sqlWords);
    categories.push(htmlWords);


  // Play
  playLevel = function(categoryIndex) {

    seekbar.setValue(0);
    // alphabet = sqlAlphabet;
    $('#next').hide();

    chosenCategory = categories[categoryIndex]; //Math.floor(Math.random() * categories.length)];


    if (chosenCategory.length > 0) {
      var size = (chosenCategory.length > 10) ? 10 : chosenCategory.length;

      var index = Math.floor(Math.random() * size);


      selectedElement = chosenCategory[index];



      switch (categoryIndex) {
        case 0:
          alphabet = alphabet;
          break;
        case 1:
          alphabet = sqlAlphabet;
          break;
        case 2:
          alphabet = htmlAlphapet[index];
          htmlAlphapet.splice(index, 1);
          break;
      }

      //remove current selection from categories
      chosenCategory.splice(index, 1);


      word = selectedElement.getWord();
      console.log(word);
      var livesDiv = document.getElementById('lives');
      livesDiv.innerHTML="";
      for (var i = 1; i <= 6; i++) {
      var heart = document.createElement('div')
      heart.setAttribute('class','heart');
      heart.setAttribute('id','heart'+i)
      livesDiv.appendChild(heart)
    }



    } else {
      $('#divCon #a2').hide();
      $('#divCon #a1').show();

    }
    geusses = [];
      lives = 6;
      counter = 0;
      space = 0;
      result();
      comments();
      selectCat();
      buttons();
      var catagoryIndex = categories.indexOf(chosenCategory);
      var hintIndex = chosenCategory.indexOf(word);
      showClue.innerHTML = selectedElement.getHint();
  }


  playLevel(catIndex);

  playNext.onclick = function() {
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);

    //change text if this is last level 
    if(chosenCategory.length===1){
      playNext.innerHTML="next Category";
    }
    else{playNext.innerHTML="Play Next";}

    if(chosenCategory.length>0){
      playLevel(catIndex);
    }
    else{
      $('#divCon #a2').hide();
      $('#divCon #a1').show();
    }
  }
}


function showData(categoryId) {
  $('#divCon #a1').slideUp(700);
  $('#divCon #a2').slideDown(400);

//reset seekbar container 
document.getElementById("seekbar-container").innerHTML=""; 
//initialize new seekbar
   seekbar   = new Seekbar.Seekbar({
        renderTo: "#seekbar-container",
        minValue: 0,
        maxValue: 100,
        valueListener: function(value) {
          this.setValue(Math.round(value));

        }
      });

 play(categoryId);

}

function celebration() {
  $('.winning').css('display','block');
    $('.winning').animate({
        opacity: 1,
        fontSize: '500%'
    }, 300);

    setTimeout(function(){
        $('.winning').animate({
            opacity: 0,
            fontSize: '200%'
        }, 500);
        
        $('.winning span').animate({
            top: '38%'
        });
    }, 1000);
    setTimeout(function(){
      $('.winning').css('display','none');
    },1600);
}


window.onload = function()
{
  $('#divCon #a2').hide();
  $('#divCon #a1').show();
}

$( window ).resize(
  function() {
    document.getElementById("seekbar-container").innerHTML=""; 
 seekbar = new Seekbar.Seekbar({
        renderTo: "#seekbar-container",
        minValue: 0,
        maxValue: 100,
        valueListener: function(value) {
          this.setValue(Math.round(value));

        }
      });
}
);