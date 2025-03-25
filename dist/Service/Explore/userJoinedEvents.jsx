export async function userJoinEvent(joinEventId) {
    try {
        const res = await fetch(`http://localhost:3000/api/JoinEvent`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ joinEventId }),
        });
        if (!res.ok) {
            console.log("Response Error: UserJoinEvent fetch");
        }
        const data = await res.json();
        return data;
    }
    catch (error) {
        console.log("Request Error: userJoinEvent Fetch, unexpected Error:", error);
    }
}
