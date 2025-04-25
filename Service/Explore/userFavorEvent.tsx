


export async function userFavorEvent(favoreventId: string){
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/favorEvent`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ favoreventId }),
        });
        if (!res.ok) {
          console.log("response Error on userFavorEvent");
        }
    
        const data = await res.json();
        return data
      } catch (error) {
        console.log("userFavorEvent request failed, fetch Error:", error);
      }

}