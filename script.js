const apiEp = "https://randomuser.me/api/?results=6";

let userList = [];

const displayElm = document.getElementById("list");

// 1.create a function to call the api form random user server
const fetchUsers = (url) => {
  try {
    //promise using fetch to get data from the server
    fetch(url)
      .then((dt) => {
        return dt.json();
      })
      .then((data) => {
        console.log(data);
        //2.put the user array in the golbal variable
        userList = data.results;
        display(userList);
      })
      .catch((error) => {
        console.log(error);
      });

    // async/wait to fetch data from the server
  } catch (error) {
    console.log(error);
  }
};

fetchUsers(apiEp);

//3. create function that will loop through the arry that will display content in the dom
const display = (users) => {
  console.log(users);

  let str = "";

  users.map((user, i) => {
    console.log(user, i);

    str += `
    <div class="card flex-grow-1" style="width: 18rem">
                <img src=${user.picture.large} class="card-img-top" alt="..." />
                <div class="card-body">
  <h5 class="card-title">${
    user.name.title + " " + user.name.first + " " + user.name.last
  }</h5>
  <div class="card-text">
    <ul class="list-unstyled">
      <li><i class="fa-solid fa-phone"></i>${"  " + user.phone}</li>
      <li><i class="fa-regular fa-envelope"></i>${"  " + user.email}</li>
      <li><i class="fa-solid fa-map-pin"></i>${
        " " +
        user.location.street.number +
        " " +
        user.location.street.name +
        " " +
        user.location.country
      }</li>
    </ul>
  </div>
</div>
              </div>`;
  });

  displayElm.innerHTML = str;
  document.querySelector("#counter").innerText = users.length;
};

const handleOnGenderSelect = (e) => {
  const g = e.value;
  const url = apiEp + "&gender=" + g;
  fetchUsers(url);
  console.log(g);
};

//handaling the search function
document.getElementById("search").addEventListener("keyup", (e) => {
  //   console.log(e.target.value);
  const value = e.target.value.toLowerCase();

  const filteredArg = userList.filter((user) => {
    const fullName = (user.name.first + "" + user.name.last).toLowerCase();
    return fullName.includes(value); //true and false
  });
  display(filteredArg);
});
