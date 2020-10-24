import React, {useEffect, useState} from 'react';
import { Map, TileLayer,  Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import './orphanages-map.css';

import 'leaflet/dist/leaflet.css';
import happyMapIcon from '../../utils/mapIcon';
import mapMakerImg from '../../images/map-marker.svg';
import api from '../../services/api';

interface IOrphanage {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
}

const OrphanagesMap: React.FC = () => {
  const [orphanages, setOrphanages] = useState<IOrphanage[]>([]);

  useEffect(() => {
    async function loadOrphanages() {
      const response = await api.get('/orphanages');
      setOrphanages(response.data)
    }

    loadOrphanages();
  }, []);

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
           <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
          {/* <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} /> */}
         
          {
            orphanages.map((orphanage) => (
              <Marker 
                icon={happyMapIcon}
                position={[Number(orphanage.latitude),Number(orphanage.longitude)]}
                key={orphanage.id}
              >
              <Popup  closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                <span>{orphanage.name}</span>
                <Link to={`/orfanato/${orphanage.id}`}>
                  <FiArrowRight size={20} color="#fff"/>
                </Link>
              </Popup>
            </Marker>
            ))
          }
        </Map>

      <Link to="/create-orphanage" className="create-orphanage">
        <FiPlus size={32} color="white"/>
      </Link>
    </div>
  );
}

export default OrphanagesMap;