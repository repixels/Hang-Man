play = function(catIndex) {


  var seekbar = new Seekbar.Seekbar({
    renderTo: "#seekbar-container",
    minValue: 0,
    maxValue: 100,
    valueListener: function(value) {
      this.setValue(Math.round(value));

    }
  });

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

  var sqlWords = [new element(['select', 'item', 'from', 'room', 'where', 'itemName', '=', 'sofa'], "room.jpg"),
    new element(['select', 'bird', 'from', 'birds', 'where', 'color', '=', 'blue'], "bird.jpg"),
    new element(['select', '*', 'from', 'SolarSystem', 'where', 'id', '<', '4'], "solarSystem.jpg"),
    new element(['select', '*', 'from', 'pencilCase'], "pencilCase.jpg"),
    new element(['insert', 'into', 'room', 'values', '(', 'lamp', ')'], "room.jpg"),
    new element(['update', 'birds', 'set', 'birdColor', '=', 'red', 'where', 'id', '=', '1'], "bird.jpg"),
    new element(['insert', 'into', 'SolarSystem', 'values', '(', '6', ',', 'Saturn', ')'], "solarSystem.jpg"),
    new element(['update', 'pencilCase', 'set', 'pencolor', '=', 'pink', 'where', 'Id', '=', '1'], "pencilCase.jpg"),
    new element(['insert', 'into', 'Zoo', 'values', '(', 'kangaroo', ')'], "zoo.jpg"),
    new element(['select', 'count', '(', 'animal', ')', 'from', 'Zoo', 'having', 'level', '=', '1'], "zoo.jpg")
  ];

  sqlAlphabet = ['select', 'from', 'having', 'Zoo', 'insert', 'into', 'values', 'itemName', 'room', 'update', 'set', 'lamp',
    'where', '=', 'bird', 'item', 'sofa', 'level', '1', '4', 'purple', 'count', '(', ')', 'animal', 'birds', 'bird', 'color', 'blue', 'red', 'door', 'SolarSystem', '*', 'pencilCase'
  ];

  var htmlWords = [
    new element(["&lt;h1&gt;", "My First", " Heading 1", "&lt;/h1&gt;", "&lt;p&gt;", "My first", "paragraph", "&lt;/p&gt;"], "<h1>My First Heading</h1><p>This is a paragraph.</p>"),
    new element(["&lt;", "src=IMAGE_URL", "img", "&gt;"], "<img src='img/2.png' width='100px' height='100%' >"),
    new element(["&lt;h2&gt;", "This is heading 2", "&lt;/h2&gt;"], "<h2>This is heading 2</h2>"),
    new element(["&lt; ", "h1", "style='color:red;'", "&gt;", "I am red", "&lt;/h1&gt;", "style='color:blue;'", "I am blue"], "<h1 style='color:red;'>I am red</h1><h1 style='color:blue;'>I am blue</h1>"),
    new element(["&lt;p&gt;", "This text is", "normal", "&lt;b&gt;", "This text is", " bold", "&lt;/b&gt;", "&lt;/p&gt;"], "<p>This text is normal</p><p><b>This text is bold</b></p>"),
    new element(["&lt; ", "a href='http://www.w3schools.com'", "&gt;", "This is", " a link", "&lt;/a&gt;"], "<p><a href='http://www.w3schools.com'>this is a link</a></p>"),
    new element(["&lt;p&gt;", "This text is", " normal", "&lt;i&gt;", "This text is", "italic", "&lt;/i&gt;", "&lt;/p&gt;"], "<p>This text is normal</p><p><i>This text is italic</i></p>"),
    new element(["&lt;h2&gt;", "HTML", "&lt;mark&gt;", " marked", "&lt;/mark&gt;", " Formatting", "&lt;/h2&gt;"], "<h2>HTML <mark>Marked</mark> Formatting</h2>"),
    new element(["&lt;p&gt;", "My favorite color is ", "&lt;del&gt;", "blue", "&lt;/del&gt;", " red", "&lt;/p&gt;"], "<p>My favorite color is <del>blue</del> red</p>"),
    new element(["&lt;ul&gt;", "&lt;li&gt;", "Coffee", "Tea", "Milk", "&lt;/li&gt;", "&lt;/ul&gt;"], "<ul><li>Coffee</li><li>Tea</li><li>Milk</li></ul>  "),
    new element(["&lt;", "ol type='I'", "&lt;", "Coffee", "&lt;li&gt;", "Tea", "Milk", "&lt;/li&gt;", "&lt;/ol&gt;"], "<ol type='I'><li>Coffee</li><li>Tea</li><li>Milk</li></ol>  ")
  ];

  var htmlAlphapet = [
    ["&lt;Heading>", "&lt;h1>", "My First", " Heading 1", "&lt;/Heading>", "&lt;/h1>", "&lt;b>", "My first", "&lt;p>", "paragraph", "&lt;/b>", "&lt;/p>"],
    ["src=IMAGE_URL", "photo", "&lt;", "image", "source=IMAGE_URL", "picture", ">", "img"],
    ["&lt;h1>", "This is heading 2", "&lt;/h1>", "&lt;h2>", "&lt;Heading>", "&lt;/h2>", "&lt;/Heading>"],
    ["&lt; ", "style='color:green;'", "style='color:red;'", ">", "h1", "I am red", "&lt;/h1>", "style='color:blue;'", "I am blue", "style='color:black;'", "I am black", "I am green", "I am yellow"],
    ["&lt;/p>", "&lt;bold>", "&lt;/b>", "&lt;p>", " bold", "&lt;/bold>", "This text is", "normal", "&lt;b>", "&lt;italic>", "This text is", "&lt;/italic>", "&lt;i>", "&lt;/i>"],
    [" a link", "&lt; ", "&lt;link>", "&lt;/a>", "a href='http://www.w3schools.com'", ">", "&lt;/link>", "&lt;goto>", "&lt;/goto>", "This is", "&lt;a src='Link_url'"],
    ["&lt;bold>", "&lt;p>", "&lt;/p>", "&lt;/bold>", "&lt;i>", "italic", "&lt;italic>", "This text is", "&lt;/i>", "&lt;/italic>", "&lt;b>", "&lt;/b>", "&lt;/p>"],
    [" marked", "&lt;select>", "HTML", "&lt;h2>", "&lt;/mark>", "&lt;/select>", "&lt;highlight>", "&lt;mark>", "&lt;/highlight>", " Formatting", "&lt;/h2>"],
    ["&lt;/p>", "My favorite color is ", " red", "blue", "&lt;delete>", "&lt;p>", "&lt;del>", "&lt;/delete>", "&lt;/del>", "&lt;remove>", "&lt;/remove>"],
    ["&lt;/ul>", "Coffee", "&lt;ol>", "Tea", "&lt;list>", "&lt;li>", "&lt;/li>", "&lt;/list>", "&lt;unorderd list>", "&lt;/unorderd list>", "Milk", "&lt;Ordered list>", "&lt;ul>", "&lt;/Ordered list>"],
    ["&lt;ul>", "ol type='I'", "Tea", "&lt;ol>", "&lt;li>", "&lt;list>", "&lt;", "Coffee", "&lt;/list>", "&lt;Ordered list>", "Milk", ">", "&lt;/Ordered list>", "&lt;unorderd list>", "&lt;/li>", "&lt;/unorderd list>", "&lt;/ol>"]
  ];

  categories = new Array();



  var categories; // Array of topics
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



  // create alphabet ul
  var buttons = function() {
    myButtons = document.getElementById('buttons');
    letters = document.createElement('ul');

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

    for (var i = 0; i < word.length; i++) {
      correct.setAttribute('id', 'my-word');
      guess = document.createElement('li');
      guess.setAttribute('class', 'guess');
      if (word[i] === "-") {
        guess.innerHTML = "-";
        space = 1;
      } else {
        guess.innerHTML = "_";
      }

      geusses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  }

  // Show lives
  comments = function() {
    showLives.innerHTML = "You have " + lives + " lives";
    if (lives < 1) {
      showLives.innerHTML = "Game Over";
      //  alert("game over action");
      $('#divCon #a2').hide();
      $('#divCon #a1').show();
      //
    }
    for (var i = 0; i < geusses.length; i++) {
      if (counter + space === geusses.length) {
        showLives.innerHTML = "You Win!";
        if (chosenCategory.length <= 0) {
          $('#divCon #a2').hide();
          $('#divCon #a1').show();

          alert("you have finished this category (back to categories selection page)");
        } else {
          correct.parentNode.removeChild(correct);
          letters.parentNode.removeChild(letters);
          showClue.innerHTML = "";
          play(catIndex);
        }
      }
    }
  }


  // OnClick Function
  check = function() {
    list.onclick = function() {
      var geuss = (this.innerHTML);
      this.setAttribute("class", "active");
      this.onclick = null;
      for (var i = 0; i < word.length; i++) {
        if (word[i].toUpperCase() === geuss.toUpperCase()) {
          geusses[i].innerHTML = geuss;
          counter += 1;

          seekbar.setValue(seekbar.value + (100 / geusses.length));
        }
      }
      var j = (word.indexOf(geuss));
      if (j === -1) {
        lives -= 1;
        comments();
      } else {
        comments();
      }
    }
  }


  // Play
  play = function(categoryIndex) {

    seekbar.setValue(0);
    // alphabet = sqlAlphabet;
    categories.push(javaWords);
    categories.push(sqlWords);
    categories.push(htmlWords);


    chosenCategory = categories[categoryIndex]; //Math.floor(Math.random() * categories.length)];


    if (chosenCategory.length > 0) {
      var size = (chosenCategory.length > 10) ? 10 : chosenCategory.length;

      var index = Math.floor(Math.random() * size); ///test
      alert(chosenCategory.length);


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
      buttons();

      geusses = [];
      lives = 10;
      counter = 0;
      space = 0;
      result();
      comments();
      selectCat();
    } else {
      $('#divCon #a2').hide();
      $('#divCon #a1').show();

    }
  }

  play(catIndex);

  // Hint

  hint.onclick = function() {


    switch (catIndex) {
      case 0:
        showClue.innerHTML = "Clue: - " + selectedElement.getHint();
        break;
      case 1:

        break;
      case 2:
        var divHtml = document.getElementById('hintDiv');

        divHtml.innerHTML = selectedElement.getHint(); //"<h1 style='color:red;'>"+ "This is heading 2"+ "</h1>";

        break;
    }

  };

  // Reset

  // document.getElementById('reset').onclick = function() {
  //   correct.parentNode.removeChild(correct);
  //   letters.parentNode.removeChild(letters);
  //   showClue.innerHTML = "Clue: - ";
  //   play(catIndex);
  // }
}


function showData(categoryId) {
<<<<<<< HEAD
  $('#divCon #a1').slideUp(700);
  $('#divCon #a2').slideDown(400);

  //              alert("show" + categoryId);
                play(categoryId);
=======
  $('#divCon #a1').hide();
  $('#divCon #a2').show();
  // alert("show" + categoryId);
  play(categoryId);
>>>>>>> refs/remotes/origin/master

}
window.onload = function() {
  $('#divCon #a2').hide();
  $('#divCon #a1').show();


}