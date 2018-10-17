// Filter fish that are "on sale"

const discount = .12;

const applySale = () => {
    $(".on-sale").each((i, fish) => {
        const fullPrice = $(fish).find('.price')
        const newPrice = (parseInt(fullPrice.html()) * (1 - discount)).toFixed(2);
        fullPrice.html(newPrice);
    })

}

// Add fish to "Basket"
const writeFishes = (arrayOfFishes) => {
    let domString = '';
    arrayOfFishes.forEach((fish) => {
      domString += `
      <div class="${fish.onSale ? 'on-sale' : ''} fish card col-md-6 col-md-offset-3">
      <div class="thumbnail">
          <img src="${fish.imageSoure}"
              alt="" width="40%">
          <div class="caption">
              <h3 id="thumbnail-label">${fish.name}</h3>
              <p>$
                  <span class="price">${fish.basePrice}</span>
              </p>
          </div>
          <div class="caption card-footer">
              <button class="add btn btn-info">Do You Like Fishsticks??</button>
          </div>
      </div>
  </div>
      `
    })
    // Write to the available div
    $("#available").append(domString);
    // bindEvents();
  }
  
  // Dynamically listen for events that happen on buttons with a class of add
  $('body').on('click', 'button.add', (e) => {
    // what is the div that has the fish
    const fishToMove = $(e.target).closest('.fish');
    // move it to the 'snagged' div
    $("#snagged").append(fishToMove);
    // button text => Remove from Basket | change class - 'add' + 'remove'
    $(e.target).text('Sorry, Your Fish Is Dead :(').addClass('remove').removeClass('add');
  })
  
  $('body').on('click', 'button.remove', (e) => {
    const fishToMove = $(e.target).closest('.fish');
      $("#available").append(fishToMove);
      $(e.target).text('Add To Basket').addClass('add').removeClass('remove');
    })

    $("#show-sale").click(() => {
        // alert('Sale Fish Bish');
        // all divs with the class fish, give me just the ones WITHOUT the class 'on-sale' and HIDE
        $(".fish").not(".on-sale").toggle();
        $("#show-sale").text((i, text) => {
            return (text === "Show Sale Fish") ? 'Show All' : 'Show Sale Fish'
        });  
    });
  
  // Load Fish
  $.get('../db/fishes.json')
    .done((data) => {
      console.log(data);
      writeFishes(data.fishes);
      applySale();
    })
    .fail((error) => {
      console.error(error);
  });
