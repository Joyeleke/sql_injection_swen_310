const unsafeButton = document.getElementById("unsafe");
const safeButton = document.getElementById("safe");
const resultDiv = document.getElementById("result");

unsafeButton.addEventListener("click", async () => handleLogin(false));
safeButton.addEventListener("click", async () => handleLogin(true));

async function handleLogin(isSafe) {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!username || !password) {
        resultDiv.innerHTML = `<div class="error">Both username and password are required!</div>`;
        return;
    }

    const endpoint = isSafe ? "/safe-login" : "/unsafe-login";

    try {
        const response = await fetch(`http://localhost:3001${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            resultDiv.innerHTML = `
              <div class="query-container">
                  <div class="query-label"><strong>Query:</strong></div>
                  <div class="query">${data.query}</div>
              </div>
              <div class="output">
                  <strong>Result:</strong>
                  <pre>${JSON.stringify(data.result, null, 2)}</pre>
              </div>
            `;
        } else if (response.status === 404) {
            resultDiv.innerHTML = `
                <div class="query-container">
                    <div class="query-label"><strong>Query:</strong></div>
                    <div class="query">${data.query}</div>
                </div>
                <div class="error">Error: The requested resource was not found (404).</div>
            `;
        } else {
            resultDiv.innerHTML = `<div class="error">Error: ${data.result || "An unexpected error occurred."}</div>`;
        }

    } catch (error) {
        resultDiv.innerHTML = `<div class="error">Failed to connect to the server. Try again later.</div>`;
    }
}
