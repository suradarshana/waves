import React, { useState } from "react";
import ReactDOM from "react-dom";
import ReactGlobe from "react-globe";

import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

import defaultMarkers from "./markers";



function markerTooltipRenderer(marker) {
  return `Position: ${marker.city} 
         (Value: ${marker.coordinates})`;
}

const options = {
  markerTooltipRenderer
};

function App() {
  const randomMarkers = defaultMarkers.map((marker) => ({
    ...marker,
    value: Math.floor(Math.random() * 100)
  }));
  const [markers, setMarkers] = useState([]);
  const [event, setEvent] = useState(null);
  const [details, setDetails] = useState(null);
  function onClickMarker(marker, markerObject, event) {
    setEvent({
      type:'Click',
      bl: marker.bl,
      swh: marker.swh,
      ep: marker.ep,
      wp: marker.wp,
      marker,
      markerObjectID: markerObject.uuid,
      pointerEventPosition: { x: event.clientX, y: event.clientY }
    });
    setDetails(markerTooltipRenderer(marker));
  }
  function onDefocus(previousFocus) {
    setEvent({
      type: "DEFOCUS",
      previousFocus
    });
    setDetails(null);
  }

  return (
    <div>
      {details && (
        <div
          style={{
            background: "white",
            position: "absolute",
            fontSize: 16,
            bottom: 0,
            left: 0,
            padding: 12
          }}
        >
          <p>{details}</p>
          <p>Bottom level={event.bl}</p>
          <p>Significant wave Height={event.swh}</p>
          <p>Energy period={event.ep}</p>
      {/*     <p>Wave power={event.wp}</p>
          <p>
            position=
            {JSON.stringify(event.pointerEventPosition)})
          </p> */}
        </div>
      )}
      <div style={{ padding: 5, color: 'gray', position: 'absolute', top: '0', left: '0' }}>
{/*         <button onClick={() => setMarkers(randomMarkers)}>
          Randomize markers
        </button>
        <button disabled={markers.length === 0} onClick={() => setMarkers([])}>
          Clear markers
        </button> */}
        <button
          disabled={markers.length === randomMarkers.length}
          onClick={() =>
            setMarkers([...markers, randomMarkers[markers.length]])
          }
        >
          Add marker
        </button>
     {/*    <button
          disabled={markers.length === 0}
          onClick={() => setMarkers(markers.slice(0, markers.length - 1))}
        >
          Remove marker
        </button> */}
      </div>
      <ReactGlobe
        height="100vh"
        markers={markers}
        options={options}
        width="100vw"
        onClickMarker={onClickMarker}
        onDefocus={onDefocus}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
