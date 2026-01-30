Deno.serve(async (req) => {
    return new Response(
        JSON.stringify({ message: "Hello from Functions!" }),
        { headers: { "Content-Type": "application/json" } },
    )
})
