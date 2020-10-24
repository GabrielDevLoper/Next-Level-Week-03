import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo, FiArrowLeft } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useHistory, useParams } from 'react-router-dom';

import mapMarkerImg from '../../images/map-marker.svg';
import api from "../../services/api";
import happyMapIcon from '../../utils/mapIcon';
import './orphanage.css';

interface IOrphanage {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: string;
  images: Array<{
    url: string;
    id: number;
  }>
}

interface IOrphanageParams {
  id: string;
}

export default function Orphanage() {
  const { goBack } = useHistory();
  const params = useParams<IOrphanageParams>();

  const [orphanage, setOrphanage] = useState<IOrphanage>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    async function loadOrphanages() {
      const response = await api.get(`/orphanages/${Number(params.id)}`);
      setOrphanage(response.data)
    }

    loadOrphanages();
  }, [params.id]);

  if(!orphanage){
    return <span>Carregando...</span>
  }

  return (
    <div id="page-orphanage">
      <aside>
        <img src={mapMarkerImg} alt="Happy" />

        <footer>
          <button type="button" onClick={goBack}>
            <FiArrowLeft size={24} color="#FFF" />
          </button>
        </footer>
      </aside>

      <main>
        <div className="orphanage-details">
          <img src={orphanage.images[activeImageIndex].url} alt="Lar das meninas" />

          <div className="images">
           {orphanage.images.map((img, index) => (
              <button 
              key={img.id} 
              className={activeImageIndex === index ? "active": ""} 
              onClick={() => setActiveImageIndex(index)} 
              type="button"
              >
                <img src={img.url} alt={orphanage.name} />
              </button>
           ))}
          </div>
          
          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
              <Map 
                center={[Number(orphanage.latitude), Number(orphanage.longitude)]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                {/* <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                /> */}
              <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

                <Marker interactive={false} icon={happyMapIcon} position={[Number(orphanage.latitude), Number(orphanage.longitude)]} />
              </Map>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${Number(orphanage.latitude)},${Number(orphanage.longitude)}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visitas</h2>
              <p>{orphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanage.opening_hours}
              </div>
              {orphanage.open_on_weekends ? 
              
              (<div className="open-on-weekends">
                <FiInfo size={32} color="#39CC83" />
                Atendemos <br />
                  fim de semana
              </div>) : 
              
             (<div className="dont-open">
                <FiInfo size={32} color="#ff669d" />
                Não Atendemos <br />
                fim de semana
              </div>)
              
              }
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}