const player_list = [];

//Adding Players
const add_player_button = document.querySelector('.add_player');
add_player_button.addEventListener("click", addPlayer);

function addPlayer() {
  const leaderboard = document.querySelector('.leaderboard_container')
  
  const newPlayer = {name: 'Untitled', balance: 0}
  player_list.push(newPlayer);

  // Create player container
  const player_container = document.createElement('div');
  player_container.classList.add('player_container')
  
   //Creating Inside Player Container
  const player_name = document.createElement('p');
  player_name.classList.add('player_name')
  player_name.setAttribute('contenteditable', 'true')
  player_name.innerHTML = newPlayer.name;
  player_container.appendChild(player_name);
    
  //Creating sidebar in Player Container
  const sidebar = document.createElement('div');
  sidebar.classList.add('sidebar')
  const button = document.createElement('button');
  button.classList.add('update_balance');
  button.innerHTML = '+';
  
  const bal = document.createElement('Balance');
  bal.classList.add('player_balance');
  bal.innerHTML = newPlayer.balance;
  
  //Apending to sidebar
  sidebar.appendChild(button);
  sidebar.appendChild(bal);
    
  //Apending sidebar to Playercontainer
   player_container.appendChild(sidebar);
    
  //Appending elements to li, 
  let li = document.createElement('li');
  li.appendChild(player_container);
    
  //Appending to list 
  leaderboard.appendChild(li);

  // Handling Editable Changes
  player_name.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      player_name.blur(); // Exit editing on Enter
    }
  });
  player_name.addEventListener('blur', () => {
    newPlayer.name = player_name.textContent; // Update name in player_list
    console.log(newPlayer.name)
  });

  //Changing Balance 
  button.addEventListener('click', () => {
    if (button.style.display === "none") {
      button.style.display = "block";
    } else {
      button.style.display = "none";
    }

    sidebar.classList.remove('sidebar');
    sidebar.classList.add('sidebar_edit');

    const input = document.createElement('div');
    input.classList.add('input');
    sidebar.appendChild(input);
    
    //Enter and Updating balance
    const change_balance = document.createElement('input');
    change_balance.classList.add('change_balance');
    change_balance.setAttribute('contenteditable', 'true')
    change_balance.setAttribute('type', 'number');
    change_balance.placeholder = 'Enter';
    input.appendChild(change_balance);

      //Changing Balance
    change_balance.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        change_balance.blur(); // Exit editing on Enter
        closeinput(close, input, sidebar, button)
      }
    });
    change_balance.addEventListener('blur', () => {
      newPlayer.balance += parseFloat(change_balance.value); // Update Balance in player_list
      bal.innerHTML = newPlayer.balance;
      checkbalance(newPlayer, player_container)
      console.log(newPlayer.balance)
    }); 

    //Close button without entry
    const close = document.createElement('button');
    close.classList.add('close');
    close.innerHTML = '-';
    input.appendChild(close);
    
    close.addEventListener('click', () => {
      closeinput(close, input, sidebar, button);
    });
  })
}

//Closing input function
function closeinput(close, input, sidebar, button) {
  close.remove();
  input.remove();

  sidebar.classList.remove('sidebar_edit');
  sidebar.classList.add('sidebar');

  if (button.style.display === "none") {
    button.style.display = "block";
  } else {
    button.style.display = "none";
  }
  console.log(player_list)
}

//Checking whether player is network
function checkbalance(newPlayer, player_container){
  player_container.classList.remove(
    'player_container_positive',
    'player_container_negative'
  );

  if (newPlayer.balance >  0) {
    player_container.classList.add('player_container_positive')
  } else if (newPlayer.balance === 0) {
    player_container.classList.add('player_container')
  } else {
    player_container.classList.add('player_container_negative')
  }
}

//Sorting players based on balance 
const sort_button = document.querySelector('.sort_player');
sort_button.addEventListener("click", sortPlayer);

