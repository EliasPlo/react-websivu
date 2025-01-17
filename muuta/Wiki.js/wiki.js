import { useState, useEffect } from "react";
import axios from "axios";

function Wiki() {
    const [data, setData] = useState();
    const [haku, setHaku] = useState('');
    const [hakuTemp, setHakuTemp] = useState();
    useEffect(() => {
        if (haku.length === 0) { 
            return; 
        }
        axios.get(`http://localhost:4000/wiki?haku=${haku}`)
            .then(function(response) {
                setData(response.data);
            })
            .catch(function(error) {
                console.log(error);
            });
        }, [haku]);
    return (
    <div>
      <h2>Wiki</h2>
      <input 
      type="text" 
      placeholder="Hae..."
      onChange={(event) => setHakuTemp(event.target.value)} />
      <button onClick={() => setHaku(hakuTemp)}>Hae</button>
      {data?.[0]?.title && <h1>{data[0].title}</h1>}
      {/*{data?.[0]?.thumbnail && (
      <img src={data[0].thumbnail.source} />)}*/}
      {data?.[0]?.extract && <p>{data[0].extract}</p>}
    </div>
  );
}

export default Wiki;