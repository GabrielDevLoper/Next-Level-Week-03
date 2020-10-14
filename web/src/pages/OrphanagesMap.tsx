import React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import '../styles/pages/orphanages-map.css';

import 'leaflet/dist/leaflet.css';

import mapMakerImg from '../images/map-marker.svg';

const OrphanagesMap: React.FC = () => {
  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMakerImg} alt="Happy"/>

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando sua visita :)</p>
        </header>

        <footer>
          <strong>Maceió</strong>
          <span>Alagoas</span>
        </footer>
      </aside>

      <Map 
        center={[-9.6115565,-35.7515962]}
        zoom={14}
        style={{ width: '100%', height: '100%' }}>
          {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/> */}
          <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
        </Map>

      <Link to="" className="create-orphanage">
        <FiPlus size={32} color="white"/>
      </Link>
    </div>
  );
}

export default OrphanagesMap;