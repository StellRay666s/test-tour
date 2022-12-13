import React, { useState } from "react";
import PlateTours from "./PlateTours";

function Cart({
  countryname,
  hoteldescription,
  hotelname,
  hotelstars,
  picturelink,
  regionname,
  tours,
}) {
  const [tour, setTour] = useState();

  function changeCountryState(event) {
    const index = event.nativeEvent.target.selectedIndex;
    setTour(tours?.tour[index]);
  }

  console.log(tour);
  return (
    <>
      <div className="cart_wrapper">
        <img src={picturelink} />
        <div>
          <strong>Название</strong>:{hotelname}
        </div>
        <div>
          <strong>Описание</strong>:{hoteldescription}
        </div>
        <div>
          <strong>Кол-во звезд</strong>:{hotelstars}
        </div>
        <div>
          <strong>Город</strong>:{regionname}
        </div>
        <div>
          <strong>Страна</strong>:{countryname}
        </div>
      </div>

      <form>
        <select onChange={(event) => changeCountryState(event)}>
          {tours?.tour.map((item, index) => (
            <option key={item.id}>{item.tourname}</option>
          ))}
        </select>
      </form>

      <div>
        <strong>Дата вылета:</strong>
        <div>{tour?.flydate}</div>
        <strong>Тип питания:</strong>
        <div>{tour?.mealrussian}</div>
        <strong>ТурОператор:</strong>
        <div>{tour?.operatorname}</div>
        <strong>Название тура:</strong>
        <div>{tour?.tourname}</div>
        <strong>Цена:</strong>
        <div>
          {tour?.price},{tour?.currency}
        </div>
        <strong>Место размещения:</strong>
        <div>{tour?.placement}</div>
      </div>
    </>
  );
}

export default Cart;
