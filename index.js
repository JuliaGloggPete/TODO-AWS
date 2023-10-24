var chores = [
    {thing: "Look good",
    done: true},
    {thing: "Dust",
    done: false},
    {thing: "Cook",
    done: false},
    {thing: "work out",
    done: false},
    {thing: "gardening",
    done: false},


]
exports.handler = async (event, context) =>{
    const {method, path} = event.requestContext.http;

    if(method === 'GET' && path === '/chore'){
        return{
            statusCode: 200,
            headers:{
                "Content-type":"application/json",

            },
            body : JSON.stringify({chores})


        };
    }
    else if (method === 'POST' && path ==='/chore'){
        const body = JSON.parse(event.body);
        chores.push(body);
        return{
            statusCode: 200,
            headers:{
                "Content-type":"application/json",

            },
            body : JSON.stringify({sucess: true})


        };

        
    }    else if (method === 'DELETE' && path === '/chore') {
        const body = JSON.parse(event.body);
    
        // Find the index of the chore to delete
        const indexToDelete = chores.findIndex(chore => chore.thing === body.thing);
    
        if (indexToDelete !== -1) {
            // Use splice to remove the item from the array
            chores.splice(indexToDelete, 1);
    
            return {
                statusCode: 200,
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ success: true })
            };
        } else {
            // If the chore is not found, return an error response
            return {
                statusCode: 404,
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ error: "Chore not found" })
            };
        }
    }
    

    return 'Hej';


}