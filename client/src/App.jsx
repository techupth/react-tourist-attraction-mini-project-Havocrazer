import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [trips, setTrips] = useState([]);
  const [inputTrips, setInputTrips] = useState("");
  const getTrips = async () => {
    const result = await axios.get("http://localhost:4001/trips/?keywords=");
    setTrips(result.data.data);
  };
  const searchTrips = async () => {
    const result = await axios.get(
      `http://localhost:4001/trips/?keywords=${inputTrips}`
    );
    setTrips(result.data.data);
  };

  useEffect(() => {
    getTrips();
  }, []);
  useEffect(() => {
    searchTrips();
  }, [inputTrips]);

  return (
    <div className="App">
      <div className="app-container">
        <p className="app-title">เที่ยวไหนดี</p>
        <div className="finding-section">
          <label htmlFor="search-input">ค้นหาที่เที่ยว</label>
          <br />
          <input
            type="text"
            onChange={(event) => {
              setInputTrips(event.target.value);
            }}
            value={inputTrips}
            id="search-input"
            placeholder="หาที่เที่ยวแล้วไปกัน"
            className="input-box"
          />
          <hr />
        </div>
        <div className="content-section">
          {trips.map((item) => {
            const tagList = item.tags.map((tagItem, index) => {
              return (
                <p
                  key={index}
                  className="content-tag-style"
                  onClick={() => {
                    setInputTrips((prevInputTrips) => {
                      if (prevInputTrips) {
                        return prevInputTrips + " " + tagItem;
                      } else {
                        return tagItem;
                      }
                    });
                  }}
                >
                  {tagItem}
                </p>
              );
            });
            tagList.splice(tagList.length - 1, 0, "และ");
            return (
              <div className="content-card" key={item.eid}>
                <img
                  src={item.photos.slice(0, 1)}
                  alt=""
                  className="content-card-image-style"
                />
                <div className="content-preview">
                  <a
                    href={item.url}
                    target="_blank"
                    className="content-preview-text-header"
                  >
                    {item.title}
                  </a>

                  <p className="content-preview-text">
                    {item.description.slice(0, 100)}
                  </p>
                  <a
                    href={item.url}
                    className="content-continue-text"
                    target="_blank"
                  >
                    อ่านต่อ
                  </a>
                  <p className="content-tag-content">
                    หมวด
                    {tagList}
                  </p>
                  <div className="content-preview-image">
                    {item.photos.slice(1).map((photoItem, index) => {
                      return (
                        <img
                          key={index}
                          src={photoItem}
                          alt=""
                          className="content-preview-image-style"
                        />
                      );
                    })}
                    <button
                      onClick={() =>
                        navigator.clipboard.writeText(`${item.url}`)
                      }
                      key={item.eid}
                      className="clipboard-button"
                    >
                      <img src="../src/image/link.png" alt="" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
