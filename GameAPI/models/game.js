exports.gameStructure = { 
    type: 'object',
    required: ["title", "producer", "description", "details"],
    properties: {
        title: {
            type: "string"
        },
        producer: {
            type: "array",
            items: { type: "string" }
        },
        description: {
            type: "string"
        },
        details: {
            type: "object",
            required: ["country", "language"],
            properties:{
                country: {
                    type: "string",
                },
                language: {
                    type: "array",
                    items:{ type:"string"}
                }
            }
        }
    }
}

