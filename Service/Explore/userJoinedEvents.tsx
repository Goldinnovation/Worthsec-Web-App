export async function userJoinEvent(joinEventId: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/JoinEvent`, {
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
  } catch (error) {
    console.log("Request Error: userJoinEvent Fetch, unexpected Error:", error);
  }
}
