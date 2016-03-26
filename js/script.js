window.onload = function () {

  var seekbar = new Seekbar.Seekbar({
                renderTo: "#seekbar-container",
                minValue: 0, maxValue: 100,
                valueListener: function (value) {
                    this.setValue(Math.round(value));

                }
            });

  var alphabet = [["&lt;Heading>","&lt;h1>","My First"," Heading 1","&lt;/Heading>","&lt;/h1>","&lt;b>","My first","&lt;p>","paragraph","&lt;/b>","&lt;/p>"],
                  ["src=IMAGE_URL","photo","&lt;","image","source","picture",">","img"],
                  ["&lt;h1>","This is heading 2","&lt;/h1>","&lt;h2>","&lt;Heading>", "&lt;/h2>","&lt;/Heading>"],
                  ["&lt; ","style='color:green;'","style='color:red;'",">","h1" ,"I am red", "&lt;/h1>", "style='color:blue;'", "I am blue","style='color:black;'","I am black","I am green","I am yellow"],
                  ["&lt;/p>","&lt;bold>","&lt;/b>","&lt;p>"," bold","&lt;/bold>","This text is", "normal","&lt;b>","&lt;italic>","This text is","&lt;/italic>","&lt;i>","&lt;/i>"],
                  [ " a link","&lt; ","&lt;link>", "&lt;/a>","a href='http://www.w3schools.com'",">","&lt;/link>","&lt;goto>","&lt;/goto>","This is","&lt;a src='Link_url'"],
                  ["&lt;title>","&lt;t>","&lt;/title>","&lt;/t>","&lt;head>", "My HTML", "page","&lt;/head>"],
                  ["&lt;bold>","&lt;p>","&lt;/p>","&lt;/bold>","&lt;i>","italic", "&lt;italic>","This text is","&lt;/i>","&lt;/italic>","&lt;b>","&lt;/b>"],
                  [" marked","&lt;select>","HTML","&lt;h2>", "&lt;/mark>","&lt;/select>","&lt;highlight>","&lt;mark>","&lt;/highlight>"," Formatting", "&lt;/h2>"],
                  ["&lt;/p>","My favorite color is "," red","blue","&lt;delete>","&lt;p>","&lt;del>","&lt;/delete>","&lt;/del>","&lt;remove>","&lt;/remove>"],
                  ["&lt;/ul>","Coffee" ,"&lt;ol>", "Tea","&lt;list>","&lt;li>","&lt;/li>","&lt;/list>","&lt;unorderd list>","&lt;/unorderd list>","Milk","&lt;Ordered list>", "&lt;ul>","&lt;/Ordered list>"],
                  ["&lt;ul>","ol type='I'","Tea", "&lt;ol>", "&lt;li>","&lt;list>","&lt;","Coffee","&lt;/list>","&lt;Ordered list>", "Milk", ">","&lt;/Ordered list>","&lt;unorderd list>","&lt;/li>","&lt;/unorderd list>", "&lt;/ol>"]
    ];
  
  var categories;         // Array of topics
  var chosenCategory;     // Selected catagory
  var getHint ;          // Word getHint
  var word ;              // Selected word
  var guess ;             // Geuss
  var geusses = [ ];      // Stored geusses
  var lives ;             // Lives
  var counter ;           // Count correct geusses
  var space;              // Number of spaces in word '-'

  // Get elements
  var showLives = document.getElementById("mylives");
  var showCatagory = document.getElementById("scatagory");
  var getHint = document.getElementById("hint");
  var showClue = document.getElementById("clue");



  // create alphabet ul
  var buttons = function () {
    myButtons = document.getElementById('buttons');
    letters = document.createElement('ul');
    var buttonsIndex = chosenCategory.indexOf(word);

    for (var i = 0; i < alphabet[buttonsIndex].length; i++) {
      letters.id = 'alphabet';
      list = document.createElement('li');
      list.id = 'letter';
      list.innerHTML = alphabet[buttonsIndex][i];
      check();
      myButtons.appendChild(letters);
      letters.appendChild(list);
    }
  }
    
  
  // Select Catagory
  var selectCat = function () {

  }

  // Create geusses ul
   result = function () {
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
   comments = function () {
    showLives.innerHTML = "You have " + lives + " lives";
    if (lives < 1) {
      showLives.innerHTML = "Game Over";
    }
    for (var i = 0; i < geusses.length; i++) {
      if (counter + space === geusses.length) {
        showLives.innerHTML = "You Win!";
      }
    }
  }


  // OnClick Function
   check = function () {
    list.onclick = function () {
      var geuss = (this.innerHTML);
      this.setAttribute("class", "active");
      this.onclick = null;
      for (var i = 0; i < word.length; i++) {
        if (word[i] === geuss) {
          geusses[i].innerHTML = geuss;
          counter += 1;
          
          seekbar.setValue(seekbar.value+(100 / geusses.length));
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
  play = function () {

    chosenCategory = [
    
        ["&lt;h1&gt;", "My First", " Heading 1", "&lt;/h1&gt;", "&lt;p&gt;", "My first","paragraph", "&lt;/p&gt;"],
        ["&lt;", "src=IMAGE_URL", "img", "&gt;"],
        ["&lt;h2&gt;", "This is heading 2", "&lt;/h2&gt;"],
        ["&lt; ","h1" ,"style='color:red;'","&gt;", "I am red", "&lt;/h1&gt;", "style='color:blue;'", "I am blue"],
        ["&lt;p&gt;", "This text is", "normal","&lt;b&gt;", "This text is", " bold", "&lt;/b&gt;", "&lt;/p&gt;"],
        ["&lt; ","a href='http://www.w3schools.com'","&gt;", "This is", " a link", "&lt;/a&gt;"],
        ["&lt;title&gt;", "My HTML", "page", "&lt;/title&gt;"],
        ["&lt;p&gt;", "This text is", " normal", "&lt;i&gt;", "This text is", "italic", "&lt;/i&gt;", "&lt;/p&gt;"],
        ["&lt;h2&gt;", "HTML", "&lt;mark&gt;", " marked", "&lt;/mark&gt;", " Formatting", "&lt;/h2&gt;"],
        ["&lt;p&gt;", "My favorite color is ", "&lt;del&gt;", "blue", "&lt;/del&gt;", " red", "&lt;/p&gt;"],
        [ "&lt;ul&gt;", "&lt;li&gt;", "Coffee" , "Tea", "Milk", "&lt;/li&gt;", "&lt;/ul&gt;"],
        ["&lt;","ol type='I'","&lt;", "Coffee",  "&lt;li&gt;", "Tea", "Milk", "&lt;/li&gt;", "&lt;/ol&gt;"]
    ];

    word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
    console.log(word);
    buttons();

    geusses = [ ];
    lives = 10;
    counter = 0;
    space = 0;
    result();
    comments();
    selectCat();
  }

  play();
  
  // Hint

    hint.onclick = function() {

      hints = [
        ["Based in Mersyside", "Based in Mersyside", "First Welsh team to reach the Premier Leauge", "Owned by A russian Billionaire", "Once managed by Phil Brown", "2013 FA Cup runners up", "Gazza's first club"],
        ["Science-Fiction horror film", "1971 American action film", "Historical drama", "Anamated Fish", "Giant great white shark"],
        ["Northern city in the UK", "Home of AC and Inter", "Spanish capital", "Netherlands capital", "Czech Republic capital"]
    ];

    var catagoryIndex = categories.indexOf(chosenCategory);
    var hintIndex = chosenCategory.indexOf(word);
    showClue.innerHTML = "Clue: - " +  hints [catagoryIndex][hintIndex];
  };

   // Reset

  document.getElementById('reset').onclick = function() {
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    showClue.innerHTML = "Clue: - ";
    play();
  }
}