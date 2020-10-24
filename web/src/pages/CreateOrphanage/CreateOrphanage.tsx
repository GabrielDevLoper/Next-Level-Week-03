import React, { FormEvent, useState, ChangeEvent } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet'
import { LeafletMouseEvent } from 'leaflet'
import { useHistory } from "react-router-dom";
import { FiArrowLeft, FiPlus } from "react-icons/fi";


import mapMarkerImg from '../../images/map-marker.svg';
import happyMapIcon from '../../utils/mapIcon';
import './create-orphanage.css';
import api from "../../services/api";


export default function CreateOrphanage() {
  const { goBack, push } = useHistory();

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [instructions, setInstructions] = useState("");
  const [opening_hours, setOpeningHours] = useState("");
  const [open_on_weekends, setOpenOnWeekends] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([])

  function handleMapClick(e: LeafletMouseEvent) {
    const { lat, lng } = e.latlng;

    setLatitude(String(lat));
    setLongitude(String(lng));
  }

  function handleSelectImages(e: ChangeEvent<HTMLInputElement>) {
    if(!e.target.files) {
      return;
    }

    const selectedImages = Array.from(e.target.files)

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image)
    });

    setPreviewImages(selectedImagesPreview);
   
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const data = new FormData();
   
   

    data.append('name', name);
    data.append('about', about);
    data.append('latitude', latitude);
    data.append('longitude', longitude);
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));

    images.forEach(image => {
      data.append('images', image);
    });

    const response = await api.post('/orphanages', data);

    console.log(response);
    push('/orfanatos');
  }

  return (
    <div id="page-create-orphanage">
      <aside>
        <img src={mapMarkerImg} alt="Happy" />

        <footer>
          <button type="button" onClick={goBack}>
            <FiArrowLeft size={24} color="#FFF" />
          </button>
        </footer>
      </aside>

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-9.6041091,-35.7537942]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              {/* <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              /> */}
            <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
              { latitude !== "" && (
                <Marker interactive={false} icon={happyMapIcon} position={[Number(latitude),Number(longitude)]} />
              )}

              
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input 
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea 
                id="about" 
                maxLength={300}
                value={about}
                onChange={(e) => setAbout(e.target.value)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map(image => (
                  <img key={image} src={image} alt={name}/>
                ))}
                <label htmlFor="image[]"  className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>

              <input multiple onChange={handleSelectImages} type="file" id="image[]"/>

            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea 
                id="instructions" 
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horario de abertura</label>
              <input 
                id="opening_hours" 
                value={opening_hours}
                onChange={(e) => setOpeningHours(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                  type="button" 
                  className={open_on_weekends ? "active": ""}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button 
                  type="button"
                  className={!open_on_weekends ? "not-active": ""}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
