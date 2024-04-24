let button = document.getElementById("button");
let buttonTestRequest = document.getElementById("buttonTestRequest");
let array = document.getElementById("array");

const postToAPI = async (url) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    return { data: await response.json(), status: response.status };
  } catch (error) {
    console.error("Une erreur est survenue", error);
    return null;
  }
};
// function addEvent pour stocker le token auth
// button.addEventListener("click", async function(event){
//     const apiJson = await postToAPI(`https://id.twitch.tv/oauth2/token?${id}&${secret}&${credit}`)
//     localStorage.setItem("token", apiJson.data.access_token);
// })

buttonTestRequest.addEventListener("click", function (event) {
  // edges utiles pour inbriquer des rubriques dans la recherche
  var query = `
query ($page: Int, $perPage: Int, $search: String) {
  Page (page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media (search: $search) {
      id
      title {
        romaji
      }
      characters (sort: ROLE){
        edges {
          node {
            id
            name {
              first
              last
            }
          }
          role
          voiceActors (sort: LANGUAGE){ # Array of voice actors of this character for the anime
            id
            languageV2
            name {
              first
              last
            }
          }
        }
      }
    }
  }
}
`;

  var variables = {
    search: "Shingeki no kyojin",
    page: 1,
    perPage: 6,
  };
  // var query = `
  // query ($id: Int) {
  //     Media (id: $id) {
  //       characters {
  //         edges {
  //           node {
  //             id
  //             name {
  //               first
  //               last
  //             }
  //           }
  //         }
  //       }
  //     }
  // }
  // `;

  // var variables = {
  //     id: 51479
  // };

  // Define the config we'll need for our Api request
  var url = "https://graphql.anilist.co",
    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    };

  // Make the HTTP Api request
  fetch(url, options).then(handleResponse).then(handleData).catch(handleError);

  function handleResponse(response) {
    return response.json().then(function (json) {
      return response.ok ? json : Promise.reject(json);
    });
  }

  function handleData(data) {
    console.log(data.data.Page.media);
    data.data.Page.media.forEach((item) => {
      oneAnime(item);
    })
  }

  function handleError(error) {
    alert("Error, check console");
    console.error(error);
  }
});

function oneAnime(media){
  let div = array.appendChild(document.createElement("div"));
  let divChars = array.appendChild(document.createElement("div"));
  div.textContent = media.title.romaji
  media.characters.edges.forEach((item) => {
    let divChar = divChars.appendChild(document.createElement("div"));
    divChar.classList.add("border")
    divChar.textContent = item.node.name.first + " ";
    divChar.textContent += item.node.name.last === null ? "" : item.node.name.last;
    item.voiceActors.forEach((item) =>{
      if(item.languageV2 == "French"){
        let divVoice = divChar.appendChild(document.createElement("div"));
        divVoice.textContent = "(Voice actor : " + item.name.first + " " + item.name.last + ")";
      }
    })
    // if(item.voiceActors[6]){
    //   let divVoice = divChar.appendChild(document.createElement("div"));
    //   divVoice.textContent = "(Voice actor : " + item.voiceActors[6].name.first + " " + item.voiceActors[6].name.last + ")";
    // }
  })
  // divChar.textContent = media.characters.edges[0].node.name.first
}
