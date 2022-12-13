import { useEffect, useState } from "react";
import axios from "axios";
import Cart from "./components/Cart";
function App() {
  const [data, setData] = useState([]);
  const [countryes, setCountries] = useState([]);
  const [departures, setDepartures] = useState([]);
  const [countryId, setCountryId] = useState([]);
  const [requestId, setRequestId] = useState();
  const [hotel, setHotel] = useState([]);

  function getDataList() {
    axios
      .get(
        `http://tourvisor.ru/xml/list.php?format=json&type=departure,country&authlogin=ht_travel@mail.ru&authpass=kkRSTBnvmyIz`
      )
      .then((res) => {
        setDepartures(res.data.lists.departures.departure);
        setCountries(res.data.lists.countries.country);
      });
  }

  console.log(requestId);

  function getCurrort() {
    axios
      .get(
        `http://tourvisor.ru/xml/search.php?authlogin=ht_travel@mail.ru&authpass=kkRSTBnvmyIz&country=${Number(
          countryId
        )}&format=json`
      )
      .then((res) => setRequestId(res.data.result.requestid));
  }

  function getStatusResult() {
    axios
      .get(
        `http://tourvisor.ru/xml/result.php?authlogin=ht_travel@mail.ru&authpass=kkRSTBnvmyIz&requestid=${requestId}&format=json`,
        {}
      )
      .then((res) => setHotel(res.data.data.result.hotel));
  }

  console.log(hotel);
  useEffect(() => {
    getDataList();
    getCurrort();
  }, [countryId]);

  useEffect(() => {
    setTimeout(() => {
      getStatusResult();
    }, 4000);
  }, [requestId]);

  function changeCountryState(event) {
    const index = event.nativeEvent.target.selectedIndex;
    setCountryId(countryes[index].id);
  }
  console.log(hotel);

  return (
    <>
      <form>
        <select
          value={countryId.name}
          onChange={(event) => changeCountryState(event)}
        >
          {countryes.map((item, index) => (
            <option key={item.id}>{item.name}</option>
          ))}
        </select>
      </form>
      {hotel.length === 0 ? (
        "Загрузка..."
      ) : (
        <div className="wrapper">
          {hotel?.map((item, index) => (
            <Cart
              countryname={item.countryname}
              hoteldescription={item.hoteldescription}
              hotelname={item.hotelname}
              hotelstars={item.hotelstars}
              picturelink={item.picturelink}
              regionname={item.regionname}
              tours={item.tours}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default App;
