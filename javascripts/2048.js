$(document).ready(function() {
  console.log('ready!');
  generateRandomBoard();


  $('body').keydown(function(event){
    var arrow_keys = [37, 38, 39, 40];
    if(arrow_keys.indexOf(event.which) > -1) {
      var tile = $('.tile');
      moveTile(tile, event.which);
      event.preventDefault();
    }
  })
})

function generateRandomTile() {
  // Generate random tile position and value
  // For test purposes!
  // var randomRow = Math.floor(Math.random() * 2 - 0);
  // var randomCol = Math.floor(Math.random() * 2 - 0);
  // var newValArray = [2,2,2,2,2,2,2,2];

  var randomRow = Math.floor(Math.random() * 4 - 0);
  var randomCol = Math.floor(Math.random() * 4 - 0);
  var newValArray = [2,2,2,2,2,2,2,2,4,4];
  var randomValue = newValArray[Math.floor(Math.random() * newValArray.length)];
  var newTileTemplate = $("<div class='tile' data-row='', data-col='' data-val=''></div>");

  // Build new tile
  newTileTemplate.attr("data-row", 'r'+ randomRow);
  newTileTemplate.attr("data-col", 'c'+ randomCol);
  newTileTemplate.attr("data-val", randomValue);
  newTileTemplate.text(randomValue);
  return newTileTemplate;
}

function tilesInSameLocation(existingTile, newTile){
  return existingTile.attr("data-row") === newTile.attr("data-row") && existingTile.attr("data-col") === newTile.attr("data-col");
  // removed last comparison because technically a 2 and 4 would return
  // false even if location was the same because they have two diff values.
}

function generateRandomBoard(){
  var tilesAdded = 0;
  var tilesNum = 2;

  while (tilesAdded < tilesNum){

    var newTile = generateRandomTile();
    // if on the sencond iteration of loops
    // needs to check for an existing placement of 1st tile
    // if tilesAdded===1 then check for existing
    // if no then add
    // if yes then choose new spot
    // save 1st tile to variable
    // do not allow append until new value is different than 1st

    var badTile = false;

    // If there's already a tile
    if (tilesAdded === 1){
      // Grab existing tile
      var existingTile = $(".tile").first();
      // Check if new tile and existing tile are the same
      badTile = tilesInSameLocation(existingTile, newTile);
      // console.log(tilesInSameLocation(existingTile, newTile));
    }

    // Insert new tile
    if (!badTile)
    {
      $("#gameboard").append(newTile);
      tilesAdded++;
    }
  }
}

function moveTile(tile, direction) {
  var new_tile_value = tile.attr("data-val");
  tile.attr("data-val", new_tile_value);
  // tile.text(new_tile_value);

  // checkForVacancies -- if this returns false, move to the next column
  function checkForVacancies(columnNum) {
    var occupants = $("[data-col='c" + columnNum + "']").size();
    var vacancies = (4 - occupants);
    return vacancies > 0;
  }

  function checkNeighbor(tile){
    var occupantRow = tile.getAttribute("data-row");
    var neighborRow = (occupantRow.replace("r","") - 1);
    var neighborCount = $("[data-row='r" + neighborRow + "'][data-col='c0']").size();
    return neighborCount > 0;
}

  function checkWall(tile){
    var topWall = "r0";
    return tile.getAttribute("data-row") === topWall;
  }

  switch(direction) {
    case 38: //up

      // for each column
      for (i = 0; i < 4; i++){

        checkForVacancies(i);

        // collectOccupants -- Array of tiles
        var occupants = $("[data-col='c" + i + "']");
         console.log(occupants.length);
          //for each tile

        // checkNeighbor
          for (j = 0; j < occupants.length; j++){
            var tile = occupants[j];
            console.log(" Neighbor: " + checkNeighbor(tile));
            console.log(" Wall: " + checkWall(tile));
          }

                // OR
            // checkWall

            // while checks return false
            // moveTile


      }
  // --- old code----------

      //   if (neighborCount === 0 && tile.attr("data-row") != "topWall"){
      //     var currentPosition = tile.attr("data-row"); // r3
      //     var positionNum = currentPosition.replace("r","");
      //     // movement (go up one cell)
      //     tile.attr("data-row", "r" + (positionNum - 1) );
      //     // move forward one
      //   }
      // }



      // look for occupants that have a row value of neighborRow

      // shift "occupant(s)" in direction pressed if next tile is empty else


      // check next cell
      // move or stop

      // stop moving in that direction.


      // check for movement path for stacking, merging possibility

      // generate new tile after move completion

      break;
    case 40: //down
      tile.attr("data-row","r3");
      break;
    case 37: //left
      tile.attr("data-col","c0");
      break;
    case 39: //right
      tile.attr("data-col","c3");
      break;
  }
}
