import "./Home.css";

export const Home = () => {
  return (
    <div className="d-flex col justify-content-center  align-items-center homeDesign">
      <div className="homeDesign"> BIENVENIDO </div>
      <div className="d-flex col justify-content-center  align-items-center"> <img className="logoDesign" src="src/img/marca_bruixesifades_-05.png" alt="logo" /> </div>
       
       <div className="d-flex col justify-content-center  align-items-center cartaDesign"> <img  className= "cartaDesign" src="src/img/Menu_bruixesifades.png" alt="logo" /> </div>
    </div>
  )
}