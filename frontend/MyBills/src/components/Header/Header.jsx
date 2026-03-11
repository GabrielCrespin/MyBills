import { useState, useEffect } from "react";
import "./Header.css";

function Header(){

  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {

    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);

  }, []);

  return (

    <div className="header">

      <div className="header-left">
        <h1>MY BILLS</h1>
      </div>

      <div className="header-center">
        <h1>PERSONAL FINANCE</h1>
      </div>

      <div className="header-right">
        {dateTime.toLocaleDateString()} - {dateTime.toLocaleTimeString()}
      </div>

    </div>

  );

}

export default Header;