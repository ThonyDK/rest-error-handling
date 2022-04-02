import { SERVER } from "../settings.js"

const SERVER_URL = SERVER + "/api/quotes"

export function page4Handlers() {
  document.getElementById("btn-find").onclick = findQuote
  document.getElementById("btn-edit").onclick = editQuote
  document.getElementById("btn-delete").onclick = deleteQuote
}


async function findQuote() {
  const id = getIdFromInputField()
     try{
       const findQuote = await fetch(`${SERVER_URL}/${id}`)
           if(!findQuote.ok){
              throw new Error("Could not find quote")
           }
       const quote = await findQuote.json()
       document.getElementById("quote").value = quote.quote
       document.getElementById("author").value = quote.ref

     }catch(errorMessage){
      document.getElementById("error-message").innerText = errorMessage
     }
}
async function editQuote() {
  const id = getIdFromInputField()
  const editedQuote = {
    id: id
  }
  editedQuote.quote = document.getElementById("quote").value
  editedQuote.ref = document.getElementById("author").value
  try {
    const editQuote = await fetch(`${SERVER_URL}/${id}`,{
        method: "PUT",
        headers: {
      "Accept": "application/json",
          "Content-type": "application/json"
    },
    body: JSON.stringify(editedQuote)})
    const editAQuote = await editQuote.json()
      if (!editAQuote.ok) {
        throw new Error("Could not edit quote")
      }

  }catch (errorEditMessage){
    document.getElementById("error-edit-message").innerText = errorEditMessage
  }
}

function midlertidigEditQuote() {
  const id = getIdFromInputField()
  const editedQuote = {
    id: id
  }
  editedQuote.quote = document.getElementById("quote").value
  editedQuote.ref = document.getElementById("author").value

  fetch(SERVER_URL + "/" + id, {
    method: "PUT",
    headers: {
      "Accept": "application/json",
      "Content-type": "application/json"
    },
    body: JSON.stringify(editedQuote)
  })
    .then(res => {
      if (!res.ok) {
        throw new Error("Error while editing the quote")
      }
      return res.json()
    })
    .then(result => clearFields())
    .catch(err => alert(err.message + " (NEVER USE ALERT FOR REAL)"))


}
async function deleteQuote() {
  const id = getIdFromInputField()
  await fetch(SERVER_URL + "/" + id, {
    method: "DELETE"
  }).then(res => {
    res.text()
  })
  clearFields()
}

function clearFields() {
  document.getElementById("quote-id").value = ""
  document.getElementById("quote").value = ""
  document.getElementById("author").value = ""
}

function getIdFromInputField() {
  const id = document.getElementById("quote-id").value
  if (id === "") {
    throw new Error("No ID Provided")
  }
  return id
}
