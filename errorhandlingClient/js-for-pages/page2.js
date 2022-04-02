
import { SERVER } from "../settings.js"
import { encode } from "../utils.js"

//async gør at vi kan bruge try/catch
async function handleHttpErrors(res) {
    if (!res.ok) {
        const errorResponse = await res.json();
        const error = new Error(errorResponse.message)
        error.apiError = errorResponse
        throw error
    }
    return res.json()
}

export async function loadAllQuotes() {
    try{
        const allQuotes = await fetch(SERVER + "/api/quotes")
            .then(res=>handleHttpErrors(res))

        const rows = allQuotes.map(q => `
  <tr>
    <td>${q.id}</td>
    <td>${encode(q.quote)}</td>
    <td>${encode(q.ref)}</td>
  </tr>
  `).join("")

        document.getElementById("table-body").innerHTML = rows
    } catch(err){
        document.getElementById("error").innerHTML = err.message
    }
}
