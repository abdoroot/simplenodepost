import app from "./app";

const listenAddr = process.env.PORT || 3000;

app.listen(listenAddr, () => {
    console.log(`Server is running on port http://localhost:${listenAddr}`);
});