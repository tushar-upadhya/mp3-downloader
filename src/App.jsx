import { useRef, useState } from "react";
import axios from "axios";
import { youtube_parser } from "./utils";

function App() {
    const inputURL = useRef();

    const [result, setResult] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputURL.current.value);

        const youtubeID = youtube_parser(inputURL.current.value);
        // console.log("youtubeID:", youtubeID);

        const options = {
            method: "get",
            url: "https://youtube-mp36.p.rapidapi.com/dl",
            headers: {
                "X-RapidAPI-Key": import.meta.env.VITE_RAPID_KEY,
                "X-RapidAPI-Host": "youtube-mp36.p.rapidapi.com",
            },
            params: {
                id: youtubeID,
            },
        };

        axios(options)
            .then((response) => setResult(response.data.link))
            .catch((error) => console.log("error:", error));

        inputURL.current.value = "";
    };

    return (
        <>
            <div className="app">
                <span className="logo">youtube2mp3</span>

                <section className="content">
                    <h1 className="contentTitle">YouTube to MP3 Convert </h1>

                    <p className="contentDescription">
                        Transform YouTube videos into MP3s in just a few clicks!
                    </p>

                    <form className="form" onSubmit={handleSubmit}>
                        <input
                            ref={inputURL}
                            placeholder="Paste a Youtube Video URL link"
                            className="formInput"
                            type="text"
                        />

                        <button type="submit" className="formButton">
                            Search
                        </button>
                    </form>

                    {result ? (
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href={result}
                            className="downloadButton"
                        >
                            Download Mp3
                        </a>
                    ) : (
                        ""
                    )}
                </section>
            </div>

            <footer className="footer">
                <a href="">Tushar Upadhay</a>
            </footer>
        </>
    );
}

export default App;
