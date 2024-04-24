
let button = document.getElementById("button");
let buttonTestRequest = document.getElementById("buttonTestRequest");

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

buttonTestRequest.addEventListener('click', function(event){

    // Here we define our query as a multi-line string
// Storing it in a separate .graphql/.gql file is also possible
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
      characters {
        edges {
          node {
            id
            name {
              first
              last
            }
          }
          role
          voiceActors { # Array of voice actors of this character for the anime
            id
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
    search: "Sword Art Online",
    page: 1,
    perPage: 6
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
var url = 'https://graphql.anilist.co',
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    };

// Make the HTTP Api request
fetch(url, options).then(handleResponse)
                   .then(handleData)
                   .catch(handleError);

function handleResponse(response) {
    return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
    });
}

function handleData(data) {
    console.log(data);
}

function handleError(error) {
    alert('Error, check console');
    console.error(error);
}
})


  