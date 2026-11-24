export function validateMessage(message){
    if (message === null || message === undefined) { 
        return {valid: false, error: "message is missing"}; 
    }

    if (typeof message !== "string") {
        return {valid: false, error: "message must be a string"};
    }

    if (message.trim() === "") { 
        return {valid: false, error: "message is empty"};
    }

    if (message.length >= 2001) { 
        return {valid: false, error: "message is too long"};    
    }

    return {valid: true};
}

export default async function handler(req) {
    const body = await req.json();
    const result = validateMessage(body.message);
    if (result["valid"] === false) {
        return new Response(JSON.stringify({error: result["error"]}), {status: 400, headers: {"Content-Type": "application/json"}})
    }

    return new Response(JSON.stringify({reply: "validator passed"}), {status: 200, headers: {"Content-Type": "application/json"}})


}