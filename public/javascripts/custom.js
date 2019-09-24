window.onload = function() {
  const container = document.getElementById("container");

  document.getElementById("btn").onclick = function() {
    axios
      .get("/users/all")
      .then(response => {
        debugger;
        response.data.forEach(user => {
          const list = document.createElement("ul");
          list.innerHTML = `<li>${user.name}</li> `;
          container.append(list);
        });
      })
      .catch(err => {
        debugger;
        console.log(err);
      });
  };
};
